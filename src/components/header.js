import React from "react";
import { useMoralis } from "react-moralis";
import { Button, Link } from "@mui/material";


export default function Header() {
  const { isAuthenticated, isAuthenticating, user, authenticate, logout, isLoggingOut } = useMoralis();

  const logOut = async () => {
    await logout();
    console.log("logged out--DB");
  }

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
        <div >
          <div className="address">
            <div><p>{user.get("ethAddress")}</p> </div>
          
        <Button variant="contained" onClick={logOut} disabled={isLoggingOut} >Logout</Button>
          </div>
        
        </div>
             
      </div>
      </>
    </header>
  );
}
