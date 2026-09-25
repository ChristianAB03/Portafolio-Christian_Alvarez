"""Retrazado suave del monograma CA a partir del SVG del autor.

1. Lee los contornos (polilíneas de coordenadas enteras, escalonadas).
2. Remuestrea a espaciado uniforme y detecta esquinas reales por ángulo de giro.
3. Suaviza cada tramo entre esquinas con un gaussiano (extremos fijos).
4. Ajusta curvas Bézier cúbicas (algoritmo de Schneider) con tolerancia pequeña.
5. Mide la desviación respecto al contorno original.
"""
import math, re, sys

# Ejecutar desde la raíz del proyecto: python brand-source/retrace-monogram.py --write
SRC = "brand-source/ca-monogram-traced-original.svg"
OUT = "public/brand/ca-monogram.svg"

SPACING = 0.5        # remuestreo (unidades del viewBox)
CORNER_WIN = 3.0     # ventana para medir el giro
CORNER_DEG = 70.0    # giro mínimo para considerar esquina
SIGMA = 2.6          # suavizado gaussiano (unidades)
FIT_TOL = 0.3        # error máximo del ajuste Bézier (unidades)
# Esquinas netas del diseño que el calco reparte en varios escalones y el
# detector no ve: pie interior de la A (nítido en el PNG de referencia).
FORCED = [(347, 353)]

def parse(svg):
    paths = re.findall(r'<path d="M ([^"]+?) Z"', svg)
    out = []
    for d in paths:
        pts = [tuple(map(float, p.split(","))) for p in d.split()]
        # quita duplicados consecutivos
        clean = [pts[0]]
        for p in pts[1:]:
            if p != clean[-1]:
                clean.append(p)
        if clean[0] == clean[-1]:
            clean.pop()
        out.append(clean)
    return out

def resample(poly, step):
    n = len(poly)
    segs = []
    total = 0.0
    for i in range(n):
        a, b = poly[i], poly[(i + 1) % n]
        L = math.dist(a, b)
        segs.append((a, b, L))
        total += L
    count = max(8, int(round(total / step)))
    step = total / count
    res, t, i, acc = [], 0.0, 0, 0.0
    for k in range(count):
        target = k * step
        while acc + segs[i][2] < target:
            acc += segs[i][2]
            i += 1
        a, b, L = segs[i]
        u = (target - acc) / L if L else 0
        res.append((a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u))
    return res, step

def turn_angle(pts, i, k):
    n = len(pts)
    p0, p1, p2 = pts[(i - k) % n], pts[i], pts[(i + k) % n]
    v1 = (p1[0] - p0[0], p1[1] - p0[1])
    v2 = (p2[0] - p1[0], p2[1] - p1[1])
    a = math.atan2(v1[0] * v2[1] - v1[1] * v2[0], v1[0] * v2[0] + v1[1] * v2[1])
    return abs(math.degrees(a))

def corners(pts, step):
    n = len(pts)
    k = max(1, int(round(CORNER_WIN / step)))
    ang = [turn_angle(pts, i, k) for i in range(n)]
    sup = int(round(8 / step))
    found = []
    for i in range(n):
        if ang[i] < CORNER_DEG:
            continue
        if all(ang[i] >= ang[(i + j) % n] for j in range(-sup, sup + 1)):
            if not found or (i - found[-1]) > sup:
                found.append(i)
    return found, ang

SIGMA_STRAIGHT = 6.0  # suavizado en tramos casi rectos (patas de la A, brazos de la C)

def radius_at(pts, i, m):
    n = len(pts)
    a, b, c = pts[max(0, i - m)], pts[i], pts[min(n - 1, i + m)]
    ab, bc, ca = math.dist(a, b), math.dist(b, c), math.dist(c, a)
    area2 = abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]))
    return float("inf") if area2 < 1e-9 else (ab * bc * ca) / (2 * area2)

def smooth_segment(seg, step):
    """Suavizado adaptativo: primero una pasada suave para medir curvatura,
    luego un gaussiano cuyo ancho crece donde el trazo es casi recto."""
    first = gauss(seg, step, lambda i: SIGMA)
    m = max(1, int(round(5 / step)))
    def sig(i):
        R = radius_at(first, i, m)
        t = min(1.0, max(0.0, (R - 25) / 55))
        return SIGMA + t * (SIGMA_STRAIGHT - SIGMA)
    sigmas = [sig(i) for i in range(len(seg))]
    return gauss(seg, step, lambda i: sigmas[i])

def gauss(seg, step, sigma_at):
    """Gaussiano con extensión impar en los extremos: fija extremos y su tangente."""
    n = len(seg)
    if n < 5:
        return seg[:]
    def at(j):
        if j < 0:
            a, b = seg[0], seg[-j]
            return (2 * a[0] - b[0], 2 * a[1] - b[1])
        if j >= n:
            a, b = seg[-1], seg[2 * (n - 1) - j]
            return (2 * a[0] - b[0], 2 * a[1] - b[1])
        return seg[j]
    out = [seg[0]]
    for i in range(1, n - 1):
        s = sigma_at(i) / step
        r = int(math.ceil(3 * s))
        sx = sy = sw = 0.0
        for jj in range(-r, r + 1):
            wt = math.exp(-(jj * jj) / (2 * s * s))
            p = at(i + jj)
            sx += p[0] * wt; sy += p[1] * wt; sw += wt
        out.append((sx / sw, sy / sw))
    out.append(seg[-1])
    return out

# ---------------- ajuste Bézier (Schneider, "Graphics Gems") ----------------
def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def mul(a, s): return (a[0] * s, a[1] * s)
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def norm(a):
    L = math.hypot(*a)
    return (a[0] / L, a[1] / L) if L else (0.0, 0.0)

def bez(c, t):
    mt = 1 - t
    return add(add(mul(c[0], mt**3), mul(c[1], 3 * mt * mt * t)), add(mul(c[2], 3 * mt * t * t), mul(c[3], t**3)))
def bez1(c, t):
    mt = 1 - t
    return add(add(mul(sub(c[1], c[0]), 3 * mt * mt), mul(sub(c[2], c[1]), 6 * mt * t)), mul(sub(c[3], c[2]), 3 * t * t))
def bez2(c, t):
    return add(mul(add(sub(c[2], mul(c[1], 2)), c[0]), 6 * (1 - t)), mul(add(sub(c[3], mul(c[2], 2)), c[1]), 6 * t))

def chord_params(pts):
    u = [0.0]
    for i in range(1, len(pts)):
        u.append(u[-1] + math.dist(pts[i], pts[i - 1]))
    return [x / u[-1] for x in u]

def generate(pts, u, t1, t2):
    p0, p3 = pts[0], pts[-1]
    C = [[0, 0], [0, 0]]; X = [0, 0]
    for p, t in zip(pts, u):
        mt = 1 - t
        a1 = mul(t1, 3 * mt * mt * t)
        a2 = mul(t2, 3 * mt * t * t)
        C[0][0] += dot(a1, a1); C[0][1] += dot(a1, a2); C[1][1] += dot(a2, a2)
        tmp = sub(p, add(mul(p0, mt**3 + 3 * mt * mt * t), mul(p3, 3 * mt * t * t + t**3)))
        X[0] += dot(a1, tmp); X[1] += dot(a2, tmp)
    C[1][0] = C[0][1]
    det = C[0][0] * C[1][1] - C[1][0] * C[0][1]
    seg = math.dist(p0, p3)
    if abs(det) > 1e-12:
        al = (X[0] * C[1][1] - X[1] * C[0][1]) / det
        ar = (C[0][0] * X[1] - C[1][0] * X[0]) / det
    else:
        al = ar = seg / 3
    eps = 1e-6 * seg
    if al < eps or ar < eps:
        al = ar = seg / 3
    return [p0, add(p0, mul(t1, al)), add(p3, mul(t2, ar)), p3]

def max_err(pts, c, u):
    worst, idx = 0.0, len(pts) // 2
    for i, (p, t) in enumerate(zip(pts, u)):
        d = math.dist(bez(c, t), p)
        if d > worst:
            worst, idx = d, i
    return worst, idx

def reparam(pts, c, u):
    out = []
    for p, t in zip(pts, u):
        d = sub(bez(c, t), p)
        q1, q2 = bez1(c, t), bez2(c, t)
        num = dot(d, q1); den = dot(q1, q1) + dot(d, q2)
        out.append(min(1.0, max(0.0, t - num / den)) if den else t)
    return out

def fit(pts, t1, t2, tol, out):
    if len(pts) == 2:
        L = math.dist(*pts) / 3
        out.append([pts[0], add(pts[0], mul(t1, L)), add(pts[1], mul(t2, L)), pts[1]])
        return
    u = chord_params(pts)
    c = generate(pts, u, t1, t2)
    err, split = max_err(pts, c, u)
    if err < tol:
        out.append(c); return
    if err < tol * 4:
        for _ in range(6):
            u = reparam(pts, c, u)
            c = generate(pts, u, t1, t2)
            err, split = max_err(pts, c, u)
            if err < tol:
                out.append(c); return
    split = min(max(split, 1), len(pts) - 2)
    tc = norm(sub(pts[split - 1], pts[split + 1]))
    fit(pts[:split + 1], t1, tc, tol, out)
    fit(pts[split:], mul(tc, -1), t2, tol, out)

def end_tangent(pts, forward=True, span=4):
    if forward:
        return norm(sub(pts[min(span, len(pts) - 1)], pts[0]))
    return norm(sub(pts[max(-span - 1, -len(pts))], pts[-1]))

# ---------------- ejecución ----------------
def process(poly, report):
    pts, step = resample(poly, SPACING)
    cs, ang = corners(pts, step)
    for fx, fy in FORCED:
        i = min(range(len(pts)), key=lambda j: math.dist(pts[j], (fx, fy)))
        if math.dist(pts[i], (fx, fy)) < 3 and all(abs(i - c) > 4 for c in cs):
            cs = sorted(cs + [i])
    report.append(f"  esquinas ({len(cs)}): " + ", ".join(f"({pts[i][0]:.0f},{pts[i][1]:.0f}) {ang[i]:.0f}°" for i in cs))
    n = len(pts)
    curves = []
    if not cs:
        raise SystemExit("contorno sin esquinas: no previsto")
    for a, b in zip(cs, cs[1:] + [cs[0] + n]):
        seg = [pts[i % n] for i in range(a, b + 1)]
        sm = smooth_segment(seg, step)
        # reduce a ~1 unidad de espaciado para el ajuste
        stride = max(1, int(round(1.0 / step)))
        dec = sm[::stride]
        if dec[-1] != sm[-1]:
            dec.append(sm[-1])
        fit(dec, end_tangent(dec, True), end_tangent(dec, False), FIT_TOL, curves)
    return curves, pts

def seg_dist(p, a, b):
    ab = sub(b, a); L2 = dot(ab, ab)
    t = 0 if not L2 else max(0, min(1, dot(sub(p, a), ab) / L2))
    return math.dist(p, add(a, mul(ab, t)))

def poly_dist(p, poly):
    n = len(poly)
    return min(seg_dist(p, poly[i], poly[(i + 1) % n]) for i in range(n))

def main(write):
    svg = open(SRC, encoding="utf-8").read()
    polys = parse(svg)
    report, ds = [], []
    for k, poly in enumerate(polys):
        report.append(f"contorno {k + 1}: {len(poly)} vértices originales")
        curves, _ = process(poly, report)
        # desviación: muestras del nuevo contorno contra el polígono original
        samples = [bez(c, t / 12) for c in curves for t in range(12)]
        dev = [poly_dist(p, poly) for p in samples]
        report.append(f"  curvas Bézier: {len(curves)} | desviación media {sum(dev)/len(dev):.2f} u, máxima {max(dev):.2f} u")
        d = f"M {curves[0][0][0]:.2f} {curves[0][0][1]:.2f} " + " ".join(
            f"C {c[1][0]:.2f} {c[1][1]:.2f} {c[2][0]:.2f} {c[2][1]:.2f} {c[3][0]:.2f} {c[3][1]:.2f}" for c in curves) + " Z"
        ds.append(d)
    print("\n".join(report))
    if write:
        paths = "\n".join(f'    <path d="{d}"/>' for d in ds)
        new = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427 363" role="img" aria-labelledby="title desc">
  <title id="title">CA monogram, Christian Álvarez</title>
  <desc id="desc">CA monogram. Smooth Bézier retrace of the author's traced SVG (approved by the author); corners preserved.</desc>
  <g id="ca">
{paths}
  </g>
</svg>
'''
        open(OUT, "w", encoding="utf-8").write(new)
        print("escrito:", OUT)

if __name__ == "__main__":
    main("--write" in sys.argv)
