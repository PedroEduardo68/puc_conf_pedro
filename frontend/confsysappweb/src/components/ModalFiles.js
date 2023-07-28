import axios from "axios";
import { useEffect, useState } from "react";

const ModalFiles = (props) =>{

    const [dataSource, setDataSource] = useState([])

    const getInformationsFiles = async (id) =>{
        const response = await axios.get(`http://192.168.18.145:5000/api/Files/device/${id}`)
        setDataSource(response.data)
    }


    useEffect(() => {
        if(props.objServerFiles.id !== undefined){
            getInformationsFiles(props.objServerFiles.id)
        }
    },[props.objServerFiles.id])
    
    
    const removeFile = async (e, _id) =>{
        e.preventDefault();
        const response = await axios.delete(`http://192.168.18.145:5000/api/Files/${_id}`)

        if(response.status === 200) {
            // updateTableDevices()
        }else {
        alert("Error ao Deletar")
        }
        getInformationsFiles(props.objServerFiles.id)

    }


    return (
    <>

        <div id="edit-modal" tabindex="-1" aria-hidden="true" class={`fixed flex justify-center align-middle mt-20 ${props.hiddenModalfiles} w-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden inset-0 `}>
            <div class="relative w-full max-w-md sm:max-w-sm max-h-full m-auto sm:ml-0">
                <div class="relative rounded-lg shadow border-orange-400 border-2 bg-black ">
                    <button onClick={(e) => props.modalFile(e)}type="button" class="absolute top-3 right-2.5 text-black bg-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="edit-modal">
                        X
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Arquivos</h3>

                        {
                            dataSource.length !== 0 ?
                            dataSource.map((row)=>{
                                return(
                                <>
                                <hr />
                                <p class="text-white ">
                                    Caminho: <span> {row.sourcefileRemote} </span> <br />
                                    Ultimo Backup: <span> {row.lastdatatimebackup != undefined ? row.lastdatatimebackup : "Ainda Não Realizado" } </span> <br />
                                </p><br />
                                <button className="bg-red-800 rounded-sm p-2 m-1" onClick={(e) => removeFile(e,row._id)}>Remover</button> 
                                </>
                                )
                            })
                            : <>Sem dados!  Constate o Administrador</>
                        }

                    </div>
                </div>
            </div>
        </div> 
    </>
    );
}


export default ModalFiles;