import { useEffect, useState } from "react";


const ModalEdit = (props) =>{

    return (
    <>
        <div id="edit-modal" tabindex="-1" aria-hidden="true" class={`fixed flex justify-center align-middle mt-20 ${props.hiddenModal} w-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden inset-0 `}>
            <div class="relative w-full max-w-md sm:max-w-sm max-h-full m-auto sm:ml-0">
                <div class="relative rounded-lg shadow border-orange-400 border-2 bg-black ">
                    <button onClick={(e) => props.editDevice(e)}type="button" class="absolute top-3 right-2.5 text-black bg-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="edit-modal">
                        X
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Editando Sevidor</h3>
                        <form class="space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço:
                                <input type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" placeholder="127.0.0.1" required />
                                </label>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario:
                                <input type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" placeholder="User" required />
                                </label>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:
                                <input type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black" placeholder="password" required />
                                </label>
                            </div>


                            <button type="submit" class="w-full text-white bg-orange-400 focus:ring-4  focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Salvar</button>

                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
    );
}


export default ModalEdit;