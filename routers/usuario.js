import { Router} from 'express';
import mysql from 'mysql2';
const appUsuario = Router();
let con = undefined;

appUsuario.use((req,res,next)=>{
        con = mysql.createPool({
            host: "172.16.49.20",
            user: "sputnik",
            password: "Sp3tn1kC@",
            database: "db_M3_prueba_MYSQL2_node_DiegoManga",
            port: 3306
        });
        next();
    });
/**
 * ! METODO GET DEL CRUD.
 */
appUsuario.get("/", (req, res)=>{
    con.query(
        `SELECT * FROM tb_usuario_M3`,
        (err, data, fils)=>{
            res.send(data);
        }
    )
});
/**
 * ! METODO POST DEL CRUD.
 */
appUsuario.post("/", (req, res)=>{
    con.query(
        /*sql*/`INSERT INTO tb_usuario_M3 SET ?`,
        req.body,
        (err, data, fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            data.affectedRows +=200;
            let resultado = req.body;
            resultado.id=data.insertId;
            res.status(data.affectedRows).send(resultado);
        }
    )
});
/**
 * ! METODO PUT DEL CRUD.
 */
appUsuario.put("/:id", (req, res)=>{
    con.query(
        /*sql*/`UPDATE tb_usuario_M3 SET ? WHERE id =?`,
        [req.body, req.params.id],
        (err, data, fils)=>{
            res.send(data);
        }
    )
});
/**
 * ! METODO DELETE DEL CRUD.
 */
appUsuario.delete("/:id", (req, res)=>{
    con.query(
        /*sql*/`DELETE FROM tb_usuario_M3 WHERE ?`,
        req.params,
        (err, data, fils)=>{
            res.send(data);
        }
    )
});

export default appUsuario;