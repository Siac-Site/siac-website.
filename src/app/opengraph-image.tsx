import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SIAC — Tecnologia crítica sob controle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#EFEEEF",
          padding: "72px 84px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "#9F211C",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: 54, fontWeight: 700 }}>SIAC</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05 }}>
            Tecnologia crítica sob controle.
          </div>
          <div style={{ fontSize: 29, color: "#BEBEBE" }}>
            Engenharia e operação para ambientes que não podem parar.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#BEBEBE",
          }}
        >
          <span>ERP crítico</span>
          <span>Resiliência cibernética</span>
          <span>Operação de TI</span>
        </div>
      </div>
    ),
    size
  );
}
