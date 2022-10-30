import React from "react";
import { useMoralis } from "react-moralis";
import { Button, Link } from "@mui/material";

export default function Header() {
  const { isAuthenticated, isAuthenticating, user, authenticate, logout, isLoggingOut } = useMoralis();


  if (!isAuthenticated) {
    return (
      <header>

      <div className='header-inner'>
        <div className='logo'>METARENT</div>
            <Button variant="contained" onClick={() => authenticate()}>Login MetaMask</Button>
      </div>
    </header>
    );
  }

  return (
    <header>
      <>
      <div className='header-inner'>
        <div className='logo'>METARENT</div>
        <div>
        <text>{user.get("ethAddress")}</text> 
        </div>
        <div>
        <Button variant="contained" onClick={logout} disabled={isLoggingOut} >Logout</Button>
        </div>
             
      </div>
      </>
    </header>
  );
}
