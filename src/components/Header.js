// Header2.js
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./login";
import LogoutButton from "./logout";

export default function Header2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Verifica si estamos en la página de gráfico
  const isOnGraficoPage = location.pathname === "/grafico";

  return (
    <Header style={{ backgroundColor: "#001529", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {isAuthenticated ? (
        <>
          <Button
            type="text"
            style={{ color: "white", marginLeft: "10px" }}
            onClick={() => navigate(isOnGraficoPage ? "/" : "/grafico")}
          >
            {isOnGraficoPage ? "Volver" : "Gráfico"}
          </Button>
          <div style={{ flex: 12, textAlign: "center", fontSize: "24px", color: "#f5e7a2" }}>
            Mascota
          </div>
          <div style={{ flex: 1, textAlign: "right", fontSize: "24px" }}>
            <LogoutButton />
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: "right", fontSize: "24px" }}>
            <LoginButton />
          </div>
        </>
      )}
    </Header>
  );
}
