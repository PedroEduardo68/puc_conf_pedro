'use client'


import axios from "axios";
import { useEffect,useState } from "react";
import AutoSerchFile from "@/components/autosearch_file.js";

export default function page() {
    const [fileContent, setfileContent] = useState(`

    VirtualHost *:80>
    DocumentRoot /var/www/example
    <Directory /var/www/example>
            DirectoryIndex index.html
            #Options Indexes FollowSymLinks
            #AllowOverride None
            #Require all granted
    </Directory>
    # Static files in the examples webapp are served by Apache
    # Alias /examples /opt/tomcat/webapps/example
    # All requests go to ajp13_worker by default
    JkMount /* ajp13_worker
    # Serve this files using Apache
    JkUnMount /*.html ajp13_worker
    JkUnMount /*.jpg ajp13_worker
    JkUnMount /*.gif ajp13_worker
    JkUnMount /*.png ajp13_worker
    JkUnMount /*.svg ajp13_worker
    JkUnMount /*.js ajp13_worker
    JkUnMount /*.css ajp13_worker

    ServerAdmin info@example

    ErrorLog /error.log
    CustomLog /access.log combined

</VirtualHost>`
)
    const [dataSource, setDataSource] = useState([])
    const [selectedOption, setSelectedOption] = useState('')

/* The `useEffect` hook is used in React to perform side effects in functional components. In this
case, the `useEffect` hook is used to call the `getInformationHistoryFile` function when the
component is first rendered. */
    useEffect(()=>{
        getInformationHistoryFile()
    },[])

/**
 * The function `getInformationHistoryFile` makes an asynchronous request to retrieve information from
 * a history file and sets the retrieved data as the data source.
 */
    const getInformationHistoryFile = async () => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/history/`);
            setDataSource(response.data)
        }catch {
            alert("Arquivo não encontrado")
        }
    }



/**
 * The function `getContentFile` is an asynchronous function that makes a GET request to retrieve the
 * content of a file and sets the file content in the state variable `fileContent`.
 * @param e - The parameter `e` is an event object that is passed to the function when it is triggered
 * by an event, such as a button click or form submission. It is commonly used to prevent the default
 * behavior of the event, such as preventing a form from being submitted or a link from being followed.
 */
    const getContentFile = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/Files/viewfile/${selectedOption.id}`);
            const fileContent = response.data.data;
            setfileContent(fileContent)
        }catch {
            alert("Arquivo não encontrado")
        }
    }



/**
 * The function `backupAllFiles` is an asynchronous function that sends a GET request to a specified
 * API endpoint and displays a success message if the response status is 200, otherwise it displays an
 * error message.
 * @param e - The parameter `e` is an event object that is passed to the function when it is triggered
 * by an event, such as a button click. It is commonly used to prevent the default behavior of the
 * event, in this case, preventing the form from being submitted and the page from refreshing.
 */

    const backupAllFiles = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/actions/`);
            if(response.status === 200){
                alert("Backup realizado com sucesso!\nSucesso: " + response.data.success + "\nFalhou : " + response.data.faleid)
                getInformationHistoryFile()
            }
        }catch {
            alert("Arquivo não encontrado")
        }
    }


    const GetFileNow = async (e) => {
        e.preventDefault();



        if(selectedOption === ''){
            alert("Selecione Servidor")
            return ;
        }


        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/actions/${selectedOption.fileId}`);
            if(response.status === 200){
                alert("Backup realizado com sucesso!\nSucesso: " + response.data.success + "\nFalhou : " + response.data.faleid)
                getInformationHistoryFile()
            }
        }catch {
            alert("Arquivo Servidor Falhou")
        }

        
    }




    const downloadFileSearched = async (e) => {
        e.preventDefault();

        if(selectedOption === ''){
            alert("Selecione um arquivo")
            return ;
        }

        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/Files/download/${selectedOption.backupname}`, {
                responseType: 'blob',
            });
            
            
            // Create a temporary URL and trigger a download
           /* The code block you provided is responsible for downloading a file. */
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
           /* The code block you provided is responsible for downloading a file. */
            link.setAttribute('download', `${selectedOption.backupname}`); // Change the file name 
            document.body.appendChild(link);
            link.click();
    
            /* The `window.URL.revokeObjectURL(url)` function is used to release the resources associated
            with a temporary URL created using the `window.URL.createObjectURL()` method. */
            window.URL.revokeObjectURL(url);

        }catch(e) {
            alert("Arquivo não encontrado")
        }

    
    }


  return (<>
      <main className="flex flex-wrap justify-between text-center align-middle pt-5 w-full mb-2 ">
        <div className="w-1/2 sm:w-full">
        <h1 className="text-orange-500 font-bold text-xl text-center ">Arquivos para Visualizar </h1>  
            <form onSubmit={(e) => getContentFile(e)} >

                {dataSource.length > 0 && 
                <AutoSerchFile options={dataSource} 
                           value={selectedOption}
                           onChange={setSelectedOption}
                />
                } 

                <button onSubmit className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Buscar </button>
                <button onClick={(e) => downloadFileSearched(e)} className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Download </button>
                <button onClick={(e) => GetFileNow(e)} className="bottom-2 text-white p-2 bg-green-800 m-3 rounded-md"> Buscar Agora </button>
            </form>
        </div>

        <div className="w-1/2 sm:w-full">
            <h1 className="text-orange-500 font-bold text-xl text-center ">Controle </h1>  
            <button  className="bg-orange-400 rounded-sm p-2 m-1" onClick={(e) => backupAllFiles(e)}> Buscar todos os Arquivos </button><br/>
            <hr className="w-10/12 mx-auto" />
            <button onAbort className="bg-orange-400 rounded-sm p-2 m-1"> Limpar </button>
            <button onAbort className="bg-orange-400 rounded-sm p-2 m-1"> Error Semana </button>
        </div>


        <div className="w-full">
            <h1 className="text-orange-500 font-bold text-xl  ">Conteudo do Arquivos </h1>  
            <pre className=" text-left border-2 bg-gray-800 rounded-md overflow-auto scroll-mx-20"><br />{fileContent}<br /></pre>

            
        </div>
         
      </main>
    </>
  )
}
