import  fs from "fs";

/**
 * The function `findandreturnfile` reads a local file and sends its contents as a response.
 * @param localFile - The `localFile` parameter is the path to the file that you want to read and
 * return its contents. It should be a string representing the file's location on your local file
 * system.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically provided by the web framework or server that you are using.
 */
export const findandreturnfile = async (localFile, res) =>{
    try{   
/* The code `await fs.readFile(localFile, 'utf8', (err, data) => {...})` is reading the contents of a
local file specified by the `localFile` parameter. */
      await fs.readFile(localFile, 'utf8', (err, data) => {
          if (err) {
            res.status(200).send({sucess: false, data: err.message});
          }
          res.status(200).send({sucess: true, data: data})
      });
    }catch{
      res.status(503).send({"ERROR":"contact the administrator"})
    }  
}