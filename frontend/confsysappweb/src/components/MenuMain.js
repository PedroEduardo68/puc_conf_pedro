import Link from "next/link";


const MenuMain = (props) =>{
    const { item } = props;
    return(
        <>
        <div className="flex justify-between flex-row p-2 mr-2 max-w-6xl ">
            <div className="w-1/3">
                <h1 className="font-mono text-base">Confsys</h1>
            </div>
            <div className="w-2/3">
                <ul className="flex ">
                    <li className="mr-6 ">
                        <Link href='/' className="text-orange-400 hover:text-orange-800 cursor-pointer">Home </Link>
                    </li>
                    <li className="mr-6">
                        <Link href='/register' className="text-orange-400 hover:text-orange-800 cursor-pointer">Register </Link>
                    </li>
                    <li className="mr-6">
                        <Link href='/' className="text-orange-400 hover:text-orange-800 cursor-pointer" >Procurar Configurações</Link>
                    </li>
                </ul>
                
            </div>

        </div>
    
        <hr className="border-orange-400"/>
        </>
    )
}



export default MenuMain;