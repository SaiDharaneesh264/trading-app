import { useState } from "react";
import { Box, List, ListItem, styled } from "@mui/material";
import { NavList } from "../../../constants";
import IconAtom from "../../atoms/Icon";
import { useNavigate } from "react-router";
import { useAuth } from "../../../store/auth";


export const NavBar = () => {
  const navigate = useNavigate();
  const {logout} = useAuth()
  const [activeIcons, setActiveIcons] = useState<boolean[]>(
    NavList.map((menu) => menu.active)
  );

  const handleIconClick = (index: number) => {
     const newActiveIcons = [...activeIcons];
     newActiveIcons[index] = !newActiveIcons[index];
     setActiveIcons(newActiveIcons);
    if(index === 1){
      navigate("/dashboard")
    }
    if(index === NavList.length-1){
      sessionStorage.setItem("email", "");
      logout();
    }
  };

  return (
    <Wrapper>
      <List>
        {NavList.map((menu, index) => (
          <ListItem
            key={menu.icon}
            onClick={() => handleIconClick(index)}
            className="iconStyle"
          >
            <IconAtom
              src={activeIcons[index] ? menu.altIcon : menu.icon}
              width="32px"
              height="32px"
              data-testid="icon"
            />
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(`
min-width:40px;
display: inline-flex;
height: 728px;
flex-direction: column;
align-items: flex-start;
.iconStyle{
 flex-shrink:0;
 cursor:pointer;
 padding-bottom:32px;
}
`);
