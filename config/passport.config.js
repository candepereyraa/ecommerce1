import passport from "passport"
import local from "passport-local"
import { usuariosModelo } from "../models/usuario.model.js"
import { generaHash, validaPass } from "../utils.js"

export const initPassport=()=>{

    // paso 1
    passport.use("registro", new local.Strategy(
        {
            usernameField: "email", 
            passReqToCallback: true
        }, 
        async(req, username, password, done)=>{
            try {
                let {nombre, apellido}=req.body
                if(!nombre){
                    console.log(`salio por nomber`)
                    return done(null, false)
                }

                // validaciones
                let existe=await usuariosModelo.findOne({email: username})
                if(existe){
                    console.log("sale por existe")
                    return done(null, false)
                }

                password=generaHash(password)

                let nuevoUsuario=await usuariosModelo.create({nombre, apellido, email: username, password})
                
                return done(null, nuevoUsuario.toJSON())

            } catch (error) {
                done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {usernameField: "email"}, 
        async(username, password, done)=>{
            try {
                let usuario=await usuariosModelo.findOne({email: username})
                if(!usuario){
                    return done(null, false)
                }

                if(!validaPass(password, usuario.password)){
                    return done(null, false)
                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1'   // solo si estamos usando sessions
    passport.serializeUser((usuario, done)=>{
        done(null, usuario._id)
    })
    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosModelo.findOne({_id:id}).lean()
        done(null, usuario)
    })

}