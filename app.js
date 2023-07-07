import express from 'express';
import appUsuario from "./routers/usuario.js";
const appExpress = express();
import dotenv from 'dotenv';
dotenv.config();

appExpress.use(express.json());
appExpress.use("/cliente", appUsuario);



let config = JSON.parse(process.env.myConfig);
appExpress.listen(config, ()=>{
    console.log(`Servidor http://${config.hostname}:${config.port}`);
})