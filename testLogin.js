import mongoose from 'mongoose';
import config from './src/config/index.js';
import AuthService from './src/services/AuthService.js';

const authService = new AuthService();

const testLogin = async () => {
    try {
        await mongoose.connect(config.mongoURL);
        console.log("Mongo conectado");

        const email = "admin@ecommerce.com";
        const password = "admin123";

        const { token, user } = await authService.login(email, password);
        console.log("Login exitoso:", user.email);
        console.log("Token:", token);

        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

testLogin();
