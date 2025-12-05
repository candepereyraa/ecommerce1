import UserRepository from '../repositories/UserRepository.js';
import UserDAO from '../daos/UserDAO.js';
import AuthService from '../services/AuthService.js';

const userRepo = new UserRepository(new UserDAO());
const authService = new AuthService(userRepo);

class AuthController {
  async register(req, res) {
    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({ status: 'success', payload: newUser });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await authService.login(req.body.email, req.body.password);
      res.json({ status: 'success', token, user });
    } catch (error) {
      res.status(401).json({ status: 'error', error: error.message });
    }
  }

  async current(req, res) {
    try {
      const userDTO = await authService.current(req.user);
      res.json({ status: 'success', payload: userDTO });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  }
}

export default new AuthController();
