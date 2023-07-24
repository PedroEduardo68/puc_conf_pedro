import { styled } from "styled-components";
import MenuBar from "../Base/Menu";



const ContainerBk = styled.div`
    height: 100vh;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
`

const FullScreen = styled.div`
    background-color: #d0ecea;
    min-height: 100vh;
    min-width: 100vw;
`



const Structure = () =>{
    return(
        <FullScreen>
            <ContainerBk> 
            <MenuBar/>

            </ContainerBk>
        </FullScreen>
        
    );
}

export default Structure;