'use client'
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import { convertTimestampTostringBr } from "../helper/convertTime";


export default function page() {
  const [dataSource,setDataSource] = useState([]);

  useEffect(async () => {
    const response = await axios.get('http://192.168.18.145:5000/api/devices/')
      console.log(response.data)
      setDataSource(response.data)
  },[]);



  const [submitInformationAcess, setSubmitInformationAcess] = useState({
    IPAddress: "",
    Username: "",
    password: "",
  });



  const SumbitServer = (e) => {
    e.preventDefault();

/* The code `setSubmitInformationAcess({...})` is updating the state variable `submitInformationAcess`
with the values entered in the input fields. */
    setSubmitInformationAcess({
      IPAddress: e.target.IPAddress.value,
      Username: e.target.Username.value,
      password: e.target.password.value,
    })

    /* The `alert()` function is used to display a pop-up message box with the specified message. In this
    case, the message is "Cadastrado com Sucesso!" (which means "Registered Successfully!" in
    Portuguese) followed by the values entered in the "Endereço do Servidor" (Server Address) and
    "Usuario do Servidor" (Server Username) input fields. The values are accessed using
    `e.target.IPAddress.value` and `e.target.Username.value` respectively. The `\n` is used to create a
    new line in the message. */
    alert(`Cadastrado com Sucesso! \n
      Endereço IPs: ${e.target.IPAddress.value} 
      Usuário: ${e.target.Username.value} `)






    /* The code `e.target.IPAddress.value = ""; e.target.Username.value = ""; e.target.password.value = "";
    setSubmitInformationAcess({ IPAddress: "", Username: "", password: "", })` is resetting the values
    of the input fields and the state variables to empty strings. This is done after the form is
    submitted to clear the input fields and reset the state for the next submission. */
    e.target.IPAddress.value = "";
    e.target.Username.value = "";
    e.target.password.value = "";
    setSubmitInformationAcess({
      IPAddress: "",
      Username: "",
      password: "",
    })

  }


  return (<>
    <h1 className="text-orange-500 font-bold text-xl text-center">Registro de Servidor </h1>
      <main className="flex flex-wrap justify-between  p-5 flex-row ">
        <div className="w-1/2 p-1">
          <form onSubmit={(e) => SumbitServer(e)} >
              <label name="IPAddress"  > Endereço do Servidor:
                <input required id="IPAddress" type="text" name="IPAddress" maxLength={15} className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="127.0.0.1" />
              </label><br/>


              <label name="Username"> Usuario do Servidor: 
                <input  required id="Username" type="text" name="Username" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"  placeholder="Usuario" />
              </label><br/>


              <label name="password"> Senha Servidor: 
                <input required id="password" type="password" name="password" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="Senha" />
              </label><br/>

              <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Submeter </button>
              <button onAbort className="bottom-2 text-white p-2 bg-red-800 m-3 rounded-md"> Limpar </button>

            </form>
          </div>

          <div className="w-1/2">
          <form onSubmit={(e) => SumbitServer(e)} >
              <label name="Username"> Caminho 
                <input  required id="Username" type="text" name="Username" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"  placeholder="Usuario" />
              </label><br/>

              <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Submeter </button>
              <button onAbort className="bottom-2 text-white p-2 bg-red-800 m-3 rounded-md"> Limpar </button>
            </form>
          </div>


          <div>
          <h1 className="text-orange-500 font-bold text-sm text-center">Filtro de Pesquisa Servidor </h1>
          </div>

          
          <div className="flex w-screen align-middle items-center ">
            <table className="stable-auto  center sm:invisible">
              <thead className="bg-slate-500">
                <tr className="">
                  <td className="border-4 border-orange-500">Endereço</td>
                  <td className="border-4 border-orange-500">Usuario</td>
                  <td className="border-4 border-orange-500">Caminho</td>
                  <td className="border-4 border-orange-500">Data De Criação</td>
                  <td className="border-4 border-orange-500">Ações</td>
                </tr>
                </thead>

                <tbody>
                {dataSource.length !== 0 ?
                  dataSource.map((row)=>{
                    return (
                      <tr className="" id={row._id}>
                        <td className="border-r-2 border-b-2 p-2">{row.ipaddress}</td>
                        <td className="border-r-2 border-b-2 p-2">{row.user}</td>
                        <td className="border-r-2 border-b-2 p-2">{convertTimestampTostringBr(row.createdDate)}</td>
                        <td className="border-r-2 border-b-2 p-2">/etc/apache/conf</td>
                        <td className="border-b-2">
                          <button className="bg-orange-400 rounded-sm p-2 m-1">Editar</button>
                          <button className="bg-orange-400 rounded-sm p-2 m-1">Senha</button>
                          <button className="bg-red-800 rounded-sm p-2 m-1">Remover</button>
                        </td>
                      </tr>
                  ) 
              }):  <tr><td> Sem dados!  Constate o Administrador</td></tr>}

              </tbody>         
            </table>
          </div>


      </main>
    </>
  )
}
