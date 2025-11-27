import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { usuariosModelo } from "../models/usuario.model.js"
import { generaHash, validaPass } from "../utils.js"
import passportJWT from "passport-jwt"

export const initPassport=()=>{

    // paso 1
   passport.use("registro", new local.Strategy(
    {
        usernameField: "email",
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        console.log("BODY:", req.body);
        console.log("USERNAME:", username);
        console.log("PASSWORD:", password);

        try {
            const { nombre, apellido } = req.body;

            if (!nombre) {
                console.log("Falta nombre");
                return done(null, false);
            }

            // Verifica si existe usuario
            const existe = await usuariosModelo.findOne({ email: username });
            if (existe) {
                console.log("El email ya está registrado");
                return done(null, false);
            }

            // Hash de contraseña
            const passwordHash = generaHash(password);

            // Crear usuario
            const nuevoUsuario = await usuariosModelo.create({
                nombre,
                apellido,
                email: username,
                password: passwordHash
            });

            return done(null, nuevoUsuario.toJSON());

        } catch (error) {
            return done(error);
        }
    }
));

    passport.use("login", new local.Strategy(
        {usernameField: "email"}, 
        async(username, password, done)=>{
            try {
                let usuario=await usuariosModelo.findOne({email: username})
                console.log("Intento de login:", { username, password, usuario });
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

    //callback endpoint: http://localhost:3000/api/sessions/callbackGithub
    //Client ID: Iv23li5KUOU7Az9oGoqF
    //password: 38b742e5c43099678dfff2b3b1fd04ce861d4e74

    passport.use("github", new github.Strategy(
        {
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub",
            clientSecret: "38b742e5c43099678dfff2b3b1fd04ce861d4e74",
            clientID: "Iv23li5KUOU7Az9oGoqF"
        }, 
        async(t1, t2, profile, done)=>{
            try {
                // console.log(profile)
                let {email, name} = profile._json
                if(!email){
                    return done(null, false)
                }

                let usuario=await usuariosModelo.findOne({email}).lean()
                if(!usuario){
                    usuario=await usuariosModelo.create({nombre: name, email, profile })
                    usuario=usuario.toJSON()
                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))
    const buscarToken = req => {
    return req.cookies.tokenCookie || null;
};
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            // secretOrKey: process.env.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(usuario, done)=>{
            try {
                if(usuario.nombre=="Martin"){
                    return done(null, false, {message:`El usuario Martin, tiene temporalmente el acceso inhabilitado. Contacte a rrhh`})
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