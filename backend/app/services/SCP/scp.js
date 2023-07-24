
// with ES Module
import { Client } from 'node-scp'


/**
 * The `downloadFile` function is a JavaScript function that uses the SSH protocol to connect to a
 * remote server and download a file to a local directory.
 * @param ipaddress - The IP address of the remote server you want to connect to.
 * @param user - The `user` parameter is the username used to authenticate with the remote server.
 * @param password - The `password` parameter is the password for the user account on the remote
 * server. It is used to authenticate and establish a connection with the server.
 * @param remotefile - The `remotefile` parameter is the path to the file on the remote server that you
 * want to download. It should be a string representing the file's location on the remote server.
 * @param localfile - The `localfile` parameter is the path and filename of the file on the local
 * machine where you want to save the downloaded file.
 */
export const downloadFile = async (ipaddress,user,password,remotefile, localfile) => {
  try {
    const client = await Client({
      host: ipaddress ,
      port: 22,
      username: user,
      password: password,
    })
    await client.downloadFile(remotefile, localfile);
    client.close() 
  } catch (e) {
    console.log(`<>ERRO </> ${e}`)
  }
}









