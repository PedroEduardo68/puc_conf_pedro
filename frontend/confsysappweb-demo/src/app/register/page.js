'use client'
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import { convertTimestampTostringBr } from "../helper/convertTime";
import ModalEdit from "@/components/Modal";
import ModalFiles from "@/components/ModalFiles";
import AutoSerch from "@/components/autosearch";
import devicesData from "../../data-fixed/server.js"


export default function page() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dataSource,setDataSource] = useState([]);
  const [hiddenModal,sethiddenModal] = useState('hidden');
  const [objServerEdit,setobjServerEdit] = useState({});
  const [objServerFiles,setobjServerFiles] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  const [hiddenModalfiles, sethiddenModalfiles] = useState('hidden');



  useEffect(() => {
/**
 * The function `handleResize` checks if the window width is less than or equal to 768 pixels and sets
 * the value of `isMobile` accordingly.
 */
    const handleResize = () => {
      
      const isMobileScreen = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(isMobileScreen);
    };

    
    /* The code `window.addEventListener('resize', handleResize);` is adding an event listener to the
    window object for the 'resize' event. When the window is resized, the `handleResize` function
    will be called. This allows the code to respond to changes in the window size and perform any
    necessary actions. In this case, the `handleResize` function checks if the window width is less
    than or equal to 768 pixels and sets the value of the `isMobile` state variable accordingly. */
    window.addEventListener('resize', handleResize);

   
    handleResize();

    
    /* The code `return () => window.removeEventListener('resize', handleResize);` is a cleanup
    function that is returned by the `useEffect` hook. */
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const updateTableDevices = async () => {
    console.log(devicesData);
    setDataSource(devicesData)
  }


  console.log('funciona porrta');
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
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/devices/${id}`)
    
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
      nameserver:e.target.nameserver.value,
    }


    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/devices/`, informationSubmit)

/* The code block is checking the status of the HTTP response received from the server after making a
POST request to create a new device. If the status code is 200 (indicating a successful request), it
displays an alert message saying "Cadastrado com Sucesso!" (which means "Registered Successfully" in
Portuguese) and calls the `updateTableDevices()` function to update the table of devices. If the
status code is not 200, it displays an alert message saying "Erro ao cadastrar!" (which means "Error
while registering" in Portuguese). */

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
    e.target.nameserver.value = "";
    


  }



/**
 * The function `editDevice` toggles the visibility of a modal element when called.
 * @param e - The parameter "e" is an event object that is passed to the function when it is triggered
 * by an event. It contains information about the event that occurred, such as the target element, the
 * type of event, and any additional data associated with the event. In this case, it is used to
 */
  const editDevice = (e,_id,nameserver,ipaddress,user)=>{
    e.preventDefault();


    setobjServerEdit({
      _id: _id,
      nameserver: nameserver,
      ipaddress: ipaddress,
      user: user,
    })

  
    
    if (hiddenModal === 'hidden'){
        sethiddenModal('');
    }else{
        sethiddenModal('hidden');
    }
      

  }




/**
 * The function `modalFile` is used to handle the opening and closing of a modal file.
 * @param e - The parameter "e" is an event object that is passed to the function. It is typically used
 * to access information about the event that triggered the function, such as the target element or the
 * event type.
 * @param id - The `id` parameter is the unique identifier of the file that is being passed to the
 * `modalFile` function.
 */
  const modalFile = (e,id)=>{
    e.preventDefault();

    setobjServerFiles({
      id: id,
    })


    if (hiddenModalfiles === 'hidden'){
        sethiddenModalfiles('');
    }else{
        sethiddenModalfiles('hidden');
    }
      
  }



/**
 * The function `SumbitServerpath` is used to submit a server path along with a device ID to a server
 * using an HTTP POST request.
 * @param e - The parameter `e` is an event object that is passed to the function when it is triggered
 * by an event, such as a form submission. It contains information about the event, such as the target
 * element and the values entered in the form fields.
 * @returns In the code provided, nothing is being explicitly returned. However, the function
 * `SumbitServerpath` does have a conditional return statement `return` if `selectedOption._id` is
 * undefined.
 */
  const SumbitServerpath = async (e) =>{
    e.preventDefault();


    if(selectedOption._id !== undefined || e.target.path.value !== undefined){
      let SumbitServerpath = {
        deviceid: selectedOption._id,
        sourcefileRemote: e.target.path.value,
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/Files/`,SumbitServerpath)

      if(response.status === 200) {
        alert(`Cadastrado com Sucesso!`)
      }else {
        alert(`Erro ao cadastrar!`)
      }

      e.target.path.value = "";
  
    }else {
      return
    }

    e.target.path.value = "";
  }



  return (<>
      
      <main className="flex flex-wrap justify-between text-center align-middle pt-5 w-full mb-2">
          <div className="w-1/2 sm:w-full pr-1">
          <h1 className="text-orange-500 font-bold text-xl text-center ">Registro de Servidor  porra</h1>  
            <form onSubmit={(e) => SumbitServer(e)} >
              <label name="nameserver"  > Name Servidor:
                <input required id="nameserver" type="text" name="nameserver" maxLength={45} className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="Nome do servidor" />
              </label><br/>

              <label name="IPAddress"  > Endereço do Servidor:
                <input required id="IPAddress" type="text" name="IPAddress" maxLength={15} className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="127.0.0.1" />
              </label><br/>


              <label name="Username"> Usuario do Servidor: 
                <input  required id="Username" type="text" name="Username" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"  placeholder="Usuario" />
              </label><br/>


              <label name="password"> Senha Servidor: 
                <input required id="password" type="password" name="password" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="Senha" />
              </label><br/>

              <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Salvar </button>
              <button onAbort className="bottom-2 text-white p-2 bg-red-800 m-3 rounded-md"> Limpar </button>

            </form>
          </div>

          <div className="w-1/2 sm:w-full">
          <h1 className="text-orange-500 font-bold text-xl text-center ">Registro de Caminho </h1>  
            <form onSubmit={(e) => SumbitServerpath(e)} >

                {dataSource.length > 0 && 
                  <AutoSerch options={dataSource} 
                            value={selectedOption}
                            onChange={setSelectedOption}
                  />
                }
                <label name="path"> Caminho 
                  <input  required id="path" type="text" name="path" maxLength={40} className="w-full  px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"  placeholder="/etc/etc/etc.conf" />
                </label><br/>

                <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Salvar </button>
                <button onAbort className="bottom-2 text-white p-2 bg-red-800 m-3 rounded-md"> Limpar </button>
              </form>
          </div>


          <div className="w-full align-middle items-center justify-between">
            <h1 className="text-orange-500 font-bold text-sm text-center">Filtro de Pesquisa Servidor </h1>
          </div>

          


          {isMobile ? (
            <>
            {dataSource.length !== 0 ?
                  dataSource.map((row)=>{
                    return (
                    <div class=" rounded-md m-auto border-orange-400 border-2 shadow-lg md:invisible md:block  lg:block lg:invisible xl:block xl:invisible  2xl:block 2xl:invisible">
                    <div class="px-6 py-4">
                    
                      
                      <p class="text-white ">
                      Nome do servidor: <span> {row.nameserver} </span> <br />
                      Endereço IP: <span> {row.ipaddress} </span> <br />
                      Usuario: <span> {row.user} </span> <br />
                      Data de Criação: <span>{convertTimestampTostringBr(row.createdDate)}</span> <br /> 
                      </p><br /> 
                      <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => editDevice(e,row._id,row.nameserver,row.ipaddress,row.user)}>Editar</button>
                      <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => modalFile(e,row._id)}> Caminho </button>
                      <button className="bg-red-800 rounded-sm p-2 m-1" onClick={(e) => removeDevices(e,row._id)}>Remover</button>
                    </div>
                  </div>
                  ) 
              }):  <>Sem dados!  Constate o Administrador</>}
            </>
          ) : (
            <div className="w-full align-middle items-center justify-between sm:invisible sm:block">
            <table className=" m-auto">
              <thead className="bg-slate-500">
                <tr className="">
                  <td className="border-4 border-orange-500">Nome</td>
                  <td className="border-4 border-orange-500">Endereço</td>
                  <td className="border-4 border-orange-500">Usuario</td>
                  <td className="border-4 border-orange-500">Data De Criação</td>
                  <td className="border-4 border-orange-500">Ações</td>
                </tr>
                </thead>

                <tbody>
                {dataSource.length !== 0 ?
                  dataSource.map((row)=>{
                    return (
                      <tr className="" id={row._id}>
                        <td className="border-r-2 border-b-2 p-2">{row.nameserver}</td>
                        <td className="border-r-2 border-b-2 p-2">{row.ipaddress}</td>
                        <td className="border-r-2 border-b-2 p-2">{row.user}</td>
                        <td className="border-r-2 border-b-2 p-2">{convertTimestampTostringBr(row.createdDate)}</td>
                        <td className="border-b-2">
                          <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => editDevice(e,row._id,row.nameserver,row.ipaddress,row.user)}>Editar</button>
                          <button className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => modalFile(e,row._id)}> Caminho </button>
                          <button className="bg-red-800 rounded-sm p-2 m-1" onClick={(e) => removeDevices(e,row._id)}>Remover</button>
                        </td>
                      </tr>
                  ) 
              }):  <tr><td> Sem dados!  Constate o Administrador</td></tr>}
              
              </tbody>         
            </table>
          </div>
            
          )}
          

          

          
          <ModalEdit hiddenModal={hiddenModal} editDevice={editDevice} updateTableDevices={updateTableDevices} informationObj={objServerEdit}/>
          <ModalFiles hiddenModalfiles={hiddenModalfiles} objServerFiles={objServerFiles} modalFile={modalFile} />
      </main>
    </>
  )
}
