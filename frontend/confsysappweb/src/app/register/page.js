'use client'
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import { convertTimestampTostringBr } from "../helper/convertTime";
import ModalEdit from "@/components/Modal";


export default function page() {
  const [dataSource,setDataSource] = useState([]);
  const [hiddenModal,sethiddenModal] = useState('hidden');


  const updateTableDevices = async () => {
    const response = await axios.get('http://192.168.18.145:5000/api/devices/')
    setDataSource(response.data)
  }


/* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is making an asynchronous HTTP GET request to the specified URL
(`http://192.168.18.145:5000/api/devices/`) using the `axios` library. */
  useEffect( () => {
    updateTableDevices()
  },[]);





/**
 * The function `removeDevices` is an asynchronous function that sends a DELETE request to a specified
 * API endpoint to delete a device with a given ID, and logs a success message if the request is
 * successful or an error message if it fails.
 * @param e - The parameter `e` is an event object that is passed to the function when it is triggered
 * by an event. It is commonly used in event handlers to access information about the event that
 * occurred.
 * @param id - The `id` parameter is the identifier of the device that you want to remove/delete.
 */
  const removeDevices = async (e,id) => {
    e.preventDefault();
    const response = await axios.delete(`http://192.168.18.145:5000/api/devices/${id}`)
    
    if(response.status === 200) {
      updateTableDevices()
    }else {
      alert("Error ao Deletar")
    }
  }




  const SumbitServer = async (e) => {
    e.preventDefault();

    let informationSubmit = {
      ipaddress: e.target.IPAddress.value,
      user: e.target.Username.value,
      password: e.target.password.value,
    }


    const response = await axios.post(`http://192.168.18.145:5000/api/devices/`, informationSubmit)


    if(response.status === 200) {
      alert(`Cadastrado com Sucesso!`)
      updateTableDevices()
    }else {
      alert(`Erro ao cadastrar!`)
    }


    /* The code `e.target.IPAddress.value = ""; e.target.Username.value = ""; e.target.password.value = "";
    setSubmitInformationAcess({ IPAddress: "", Username: "", password: "", })` is resetting the values
    of the input fields and the state variables to empty strings. This is done after the form is
    submitted to clear the input fields and reset the state for the next submission. */
    e.target.IPAddress.value = "";
    e.target.Username.value = "";
    e.target.password.value = "";


  }



  const editDevice = (e)=>{
    e.preventDefault();
    
    if (hiddenModal === 'hidden'){
        sethiddenModal('');
    }else{
        sethiddenModal('hidden');
    }
      

  }


  return (<>
    <h1 className="text-orange-500 font-bold text-xl text-center">Registro de Servidor </h1>
      <main className="flex flex-wrap justify-between text-center align-middle p-5 flex-row w-full">
          <div className="w-1/2 sm:w-full p-1">
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

          <div className="w-1/2 sm:w-full">
            <form onSubmit={(e) => SumbitServer(e)} >
                <label name="Username"> Caminho 
                  <input  required id="Username" type="text" name="Username" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"  placeholder="Usuario" />
                </label><br/>

                <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Submeter </button>
                <button onAbort className="bottom-2 text-white p-2 bg-red-800 m-3 rounded-md"> Limpar </button>
              </form>
          </div>


          <div className="w-full align-middle items-center justify-between">
            <h1 className="text-orange-500 font-bold text-sm text-center">Filtro de Pesquisa Servidor </h1>
          </div>

          
          <div className="w-full align-middle items-center justify-between">
            <table className=" m-auto sm:invisible">
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
                          <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => editDevice(e,row._id)}>Editar</button>
                          <button className="bg-orange-400 rounded-sm p-2 m-1"> Caminho </button>
                          <button className="bg-red-800 rounded-sm p-2 m-1" onClick={(e) => removeDevices(e,row._id)}>Remover</button>
                        </td>
                      </tr>
                  ) 
              }):  <tr><td> Sem dados!  Constate o Administrador</td></tr>}
              
              </tbody>         
            </table>
          </div>

          {dataSource.length !== 0 ?
                  dataSource.map((row)=>{
                    return (


                    <div class="max-w-sm rounded-md  border-orange-400 border-2 overflow-hidden shadow-lg md:invisible lg:invisible xl:invisible 2xl:invisible">
                    <div class="px-6 py-4">
                    
                      
                      <p class="text-white ">
                      Endereço IP: <span> {row.ipaddress} </span> <br />
                      Usuario: <span> {row.user} </span> <br />
                      Data de Criação: <span>{convertTimestampTostringBr(row.createdDate)}</span> <br /> 
                      Caminho: <span>/etc/apache/conf </span><br /> 
                      </p><br /> 
                      <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => editDevice(e,row._id)}>Editar</button>
                      <button className="bg-orange-400 rounded-sm p-2 m-1"> Caminho </button>
                      <button className="bg-red-800 rounded-sm p-2 m-1" onClick={(e) => removeDevices(e,row._id)}>Remover</button>
                    </div>
                  </div>
                  ) 
              }):  <>Sem dados!  Constate o Administrador</>}
          





          
          
          <ModalEdit hiddenModal={hiddenModal} editDevice={editDevice}/>

      </main>
    </>
  )
}
