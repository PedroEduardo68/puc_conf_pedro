import React from "react"

import styled from 'styled-components'

const Menu = styled.div`
  background-color: #000000;
  border-radius: 2rem;
  padding: 0.8rem;


  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Li = styled.li`
  color: #ffff;
  background-color: #1e8c93;
  margin: 0.5rem;
  border-radius: 2rem;
  display: inline;
  padding: 0.25rem;
  text-align:center;


  &:hover {
    background-color: #155e63;
    color: #ffff;
    cursor: pointer;
  }
  
`;



const Ul = styled.ul`
  justify-content: center;
  align-items: center;

`;

const DivLeft = styled.div`
   align-self: flex-start;
   width: 40%;
`;

const DivCenter = styled.div`
   align-self: center;
   width: 10%;
`;


const Divright = styled.div`
   align-self: flex-end;
   width: 45%;

`;


const Logo = styled.ul`
  color: #d74f33;
  font-family: 'Tektur', cursive;
  font-weight: 800;
  font-style: italic;
  font-size: 1rem;
`;
  


const MenuBar = () =>{
  return(
    <Menu>
      <DivLeft>
        <Logo>ConfSys</Logo>
      </DivLeft>
      <DivCenter>
        
      </DivCenter>
      <Ul>
        <Li>Home</Li>
        <Li>Registro</Li>
        <Li>Arquivos</Li>
      </Ul>
      <Divright>
      </Divright>
    </Menu>
);
}

export default MenuBar;