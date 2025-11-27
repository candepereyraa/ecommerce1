import { Router } from 'express';
import { usuariosModelo } from '../models/usuario.model.js';
import { generaHash, validaPass } from '../utils.js';
import passport from 'passport';
export const router = Router()

// router.post('/register',async(req,res)=>{

//     let {nombre, email, apellido, password}=req.body
//     if(!nombre || !email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`nombre | email | password son requeridos`})
//     }

//     // validaciones varias... 

//     password=generaHash(password)

//     try {
//         let existe=await usuariosModelo.findOne({email})
//         if(existe){
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`El email ${email} ya esta en uso, para ${existe.nombre}`})
//         }

//         let nuevoUsuario=await usuariosModelo.create({nombre, apellido, email, password})
//         nuevoUsuario=nuevoUsuario.toJSON()
//         console.log(Object.keys(nuevoUsuario))

//         delete nuevoUsuario.password  // eliminar datos sensibles

//         res.setHeader('Content-Type','application/json')
//         res.status(200).json({message: `Registro exitoso`, nuevoUsuario})
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }

// })

router.get("/github", passport.authenticate("github", {}))
router.get("/callbackGithub", passport.authenticate("github", {failureRedirect: "/api/sessions/error"}), (req, res)=>{

    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso!!!`, usuario: req.user});
})
router.get("/view/login", (req, res) => {
    res.render("login");
});

router.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

router.post(
    '/register',
    // paso 3
    passport.authenticate("registro", {failureRedirect: "/api/sessions/error"}),
    async (req, res) => {

        // si authenticate sale OK agrega en la req
        // una preperty user
        // req.user
        delete req.user.password

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Registro exitoso`, nuevoUsuario:req.user })
    }
)


// router.post("/login", async (req, res) => {
//     let { email, password } = req.body
//     if (!email || !password) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `email | password son requeridos` })
//     }

//     try {
//         let usuario = await usuariosModelo.findOne({ email }).lean()
//         if (!usuario) {
//             res.setHeader('Content-Type', 'application/json');
//             return res.status(401).json({ error: `Credenciales invalidas` })
//         }

//         if (!validaPass(password, usuario.password)) {
//             res.setHeader('Content-Type', 'application/json');
//             return res.status(401).json({ error: `Credenciales invalidas` })
//         }

//         delete usuario.password   // eliminar datos sensibles
//         req.session.usuario = usuario    // solo en logins... 

//         res.setHeader('Content-Type', 'application/json');
//         return res.status(200).json({ payload: `Login exitoso para ${usuario.nombre}` });
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(500).json({ error: `internal server error` })
//     }
// })

router.post(
    "/login",
    passport.authenticate("login", {failureRedirect:"/api/sessions/error", }), 
    (req, res)=>{

        // si authenticate sale OK agrega en la req
        // una preperty user
        // req.user

        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso para ${req.user.nombre}`});
    }
)

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error al realizar logout` })
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "Logout exitoso...!!!" });
    })
})