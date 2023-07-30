
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import { UserSchema_Model } from '../model/User.model.js';
import config from '../../config.js';

export const RegisterUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new UserSchema_Model({ username, passwordHash });
      await user.save();
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
}



export const LoginUser = async (req, res)   =>{
    const { username, password } = req.body;

    // try {
      const user = await UserSchema_Model.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ userId: user._id }, config.jwt_secret, {
        expiresIn: '1h', // Token expira em 1 hora
      });
  
      res.status(200).json({ token });
    // } catch (err) {
    //   res.status(500).json({ error: 'Erro ao fazer login' });
    // }
}






/**
 * The function `verifyToken` checks if a token is provided in the request headers, verifies its
 * validity using a secret key, and sets the `userId` property in the request object if the token is
 * valid.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information about the request, such as the request headers, request body, request
 * method, and request URL.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the
 * response back to the client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically called at the end of the current
 * middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns a response with a status code of 401 and a JSON object containing an error message.
 */

export const verifyToken= (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      req.userId = decoded.userId;
      next();
    });
  }
  



// Rota protegida (exemplo)
export const RouterProtectUser = (req, res) =>{
    res.status(200).json({ auth: true, message: 'Rota protegida acessada com sucesso!' });
}
