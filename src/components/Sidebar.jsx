import  { Auth, Hub } from "aws-amplify";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";


const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

const UserName = styled.div`
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
`;

const SignoutButton = styled.span`
margin-right: 20px;
justify-content: center;
font-size: 2rem;
`
const handleSignOutButtonClick = async () => {
  try {
    await Auth.signOut();
    Hub.dispatch("UI Auth", {
      // channel must be 'UI Auth'
      event: "AuthStateChange", // event must be 'AuthStateChange'
      message: "signedout", // message must be 'signedout'
    });
  } catch (error) {
    console.log("error signing out: ", error);
  }
};  

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const closeSidebar = () => setSidebar(false)

  const [ user, setUser] = useState("")

  Auth.currentAuthenticatedUser().then((user) => {
    
    setUser(user.username)
  });


  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <SignoutButton>
            <FaIcons.FaSignOutAlt
              onClick={handleSignOutButtonClick}
              className="signout-button"
            />
          </SignoutButton>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <UserName>
              <FaIcons.FaUserCircle />

              <SidebarLabel>{user}</SidebarLabel>
              
            </UserName>

            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} onClick={closeSidebar} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
