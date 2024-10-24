import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "antd";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button 
      type="primary" 
      danger 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{ marginTop: "20px" }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
