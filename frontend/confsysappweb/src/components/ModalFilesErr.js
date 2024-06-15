import { convertTimestampTostringBr } from "@/app/helper/convertTime";
import axios from "axios";
import { useEffect, useState } from "react";

const ModalFilesErr = (props) =>{
    const [dataSourceFaliedList, setDataSourceFaliedList] = useState([])


    const getInformationHistoryFilefalied = async () => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/history/falied`);
            setDataSourceFaliedList(response.data)
        }catch {
            alert("Arquivo não encontrado")
        }
    }




    const handlecCleanErr = async () => {
        try{
            await axios.get(`${process.env.NEXT_PUBLIC_URL_DEFAULT}/api/history/falied/clean`);
            getInformationHistoryFilefalied()
        }catch {
            alert("Arquivo não encontrado")
        }
    }



    useEffect(() => {
            getInformationHistoryFilefalied()
    },[])



    return (
    <>

        <div id="edit-modal" tabindex="-1" aria-hidden="true" class={`fixed flex justify-center align-middle mt-20 ${props.hiddenModalErro} w-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden inset-0 `}>
            <div class="relative w-full max-w-md sm:max-w-sm max-h-full m-auto sm:ml-0">
                <div class="relative rounded-lg shadow border-orange-400 border-2 bg-black ">
                    <button onClick={(e) => props.handlecCloseErr(e)}type="button" class="absolute top-3 right-2.5 text-black bg-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="edit-modal">
                        X
                    </button>
                    <button onClick={(e) => handlecCleanErr(e)}type="button" class=" mt-10 right-2.5 p-3 text-black bg-red-300 rounded-lg text-sm ml-auto inline-flex justify-center items-center " data-modal-hide="edit-modal">
                       Limpar
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Arquivos Com Erros</h3>
                        {
                            dataSourceFaliedList.length !== 0 ?
                            dataSourceFaliedList.map((row)=>{
                                return(
                                <>
                                <hr />
                                <p class="text-white ">
                                    Horario do Erro: <span> {row.datetime != undefined ? convertTimestampTostringBr(row.datetime) : "Ainda Não Realizado" } </span> <br />
                                    Nome da maquina: {row.name}
                                    Motivo: {row.err}
                                </p><br />
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


export default ModalFilesErr;