import { TypeProcessGETAllFiles, TypeProcessGETByIDFiles } from "../services/Process/TypeProcess.js"


/**
 * The function `backupnowalldevices` is an asynchronous function that handles a request to backup all
 * devices and sends a response with the result.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param res - The "res" parameter is the response object that is used to send the response back to
 * the client. It is an object that contains methods and properties for handling the response, such as
 * setting the status code and sending the response body. In this code snippet, it is used to send the
 * response with
 */
export const backupnowalldevices = async (req,res) => {
    try{
        const response = await TypeProcessGETAllFiles();
        res.status(200).send(response)
    }catch{
        res.status(500).send({message: "Internal server error"})
    }
}



/**
 * The function `backupnowfilesByID` is an asynchronous function that handles a GET request to retrieve
 * files by ID and sends a response with the retrieved files or an error message.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, and request body. In this case,
 * `req.params.id` is accessing the `id` parameter from the request URL.
 * @param res - The "res" parameter is the response object that is used to send the response back to
 * the client. It is an object that contains methods and properties related to the HTTP response, such
 * as status(), send(), and json(). In this code snippet, it is used to send the response with the
 * status
 */
export const backupnowfilesByID = async (req,res) => {
    try{
        const response = await TypeProcessGETByIDFiles(req.params.id);
    }catch{
        res.status(500).send({message: "Internal server error"})
    }
}













