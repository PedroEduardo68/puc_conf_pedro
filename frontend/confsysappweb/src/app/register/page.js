'use client'
import { useState } from "react"

export default function page() {
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
      <main className="flex flex-wrap justify-between  p-10 flex-col ">
        <div className="">
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

          <div>
          <h1 className="text-orange-500 font-bold text-sm text-center">Filtro de Pesquisa Servidor </h1>
          </div>

          <div className="flex w-screen align-middle items-center">
            <table className="stable-auto  center bg-red-600">
              <thead className="border-2">
                <tr className="border-2 ">
                  <td className="border-2">Endereço</td>
                  <td className="border-2">User</td>
                  <td className="border-2">Caminho</td>
                  <td className="border-2">Ações</td>
                </tr>


                
                <tr className="border-2 ">
                  <td className="border-2">10.1.1.1</td>
                  <td className="border-2">casa</td>
                  <td className="border-2">/etc/apache/conf</td>
                  <td className="border-2">Alterar Senha Remover</td>
                </tr>


              </thead>
            </table>
          </div>

        
      </main>
    </>
  )
}
