// Capas de fondo permanentes: retícula vertical del grid y grano muy tenue.
// Ambas son decorativas y no interceptan el puntero.
export default function Chrome() {
  return (
    <>
      <div className="vgrid" aria-hidden="true">
        <div className="vgrid-in">
          <i /><i /><i /><i />
        </div>
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
