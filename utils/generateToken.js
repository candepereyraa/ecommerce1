import jwt from 'jsonwebtoken';

export const generateToken = (usuario) => {
    return jwt.sign(
        { id: usuario._id, email: usuario.email, nombre: usuario.nombre },
        process.env.JWT_SECRET || 'secret', 
        { expiresIn: '1h' }
    );
};