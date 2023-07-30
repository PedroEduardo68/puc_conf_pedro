import { HistoryFiles_Model } from "../../model/HistoryFiles.model.js"
import { findandreturnfile } from "./ReadFile.js";

/**
 * The function `getViewFilesById` retrieves a file by its ID from a database and returns it as a
 * response.
 * @param id - The `id` parameter is the unique identifier of the history file that you want to
 * retrieve. It is used to find the history file in the database.
 * @param res - The "res" parameter is the response object that is used to send the file back to the
 * client. It is typically an instance of the Express response object.
 */
export const getViewFilesById = async (id, res) => {
    const findbyId =  await HistoryFiles_Model.findById(id)
    await findandreturnfile(findbyId.destinatefileRemote, res)
}