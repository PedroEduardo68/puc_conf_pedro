import axios from "axios";

const ModalEdit = (props) =>{

    const updateInformations = async (e,id) =>{
        e.preventDefault();



/* This code block is responsible for updating the information of a device in the database. */
        let informationUpdate = {
            ipaddress: e.target.ipaddress.value,
            user: e.target.user.value,
            password: e.target.password.value,
            nameserver:e.target.nameserver.value,
          }



/* `props.updateTableDevices()` is a function that is being called to update the table of devices. It
is likely that this function is defined in the parent component and is responsible for fetching the
updated data from the server and re-rendering the table. */
        props.updateTableDevices()
        props.editDevice(e)
    }


    return (
    <>

        <div id="edit-modal" tabindex="-1" aria-hidden="true" class={`fixed flex justify-center align-middle mt-20 ${props.hiddenModal} w-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden inset-0 `}>
            <div class="relative w-full max-w-md sm:max-w-sm max-h-full m-auto sm:ml-0">
                <div class="relative rounded-lg shadow border-orange-400 border-2 bg-black ">
                    <button onClick={(e) => props.editDevice(e)}type="button" class="absolute top-3 right-2.5 text-black bg-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="edit-modal">
                        X
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Editando {props.informationObj.nameserver}</h3>
                        <form class="space-y-6" onSubmit={(e)=>updateInformations(e,props.informationObj._id )}>
                            <div>
                                <label for="nameserver" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Servidor:
                                <input type="nameserver" name="nameserver" id="nameserver" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" defaultValue={props.informationObj.nameserver ? props.informationObj.nameserver : ''} placeholder="Nome do Servidor" required />
                                </label>
                            </div>
                            <div>
                                <label for="ipaddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço:
                                <input type="ipaddress" name="ipaddress" id="ipaddress" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" defaultValue={props.informationObj.ipaddress} placeholder="127.0.0.1" required />
                                </label>
                            </div>
                            <div>
                                <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario:
                                <input type="user" name="user" id="user" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" placeholder="User" defaultValue={props.informationObj.user} required />
                                </label>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:
                                <input type="password" name="password" id="password" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" placeholder="password" required />
                                </label>
                            </div>


                            <button onSubmit class="w-full text-white bg-orange-400 focus:ring-4  focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Salvar</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}


export default ModalEdit;