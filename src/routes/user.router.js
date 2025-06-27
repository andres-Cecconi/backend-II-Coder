import { Router } from 'express';
import UserModel from '../models/User.js';
import { createHash } from '../utils/helpers.js';

const router = Router();

// Leer todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
});

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const hash = createHash(password);
        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hash,
            role: role || 'user'
        });
        res.status(201).json({ message: 'Usuario creado', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Leer usuario por ID
router.get('/:uid', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.uid).select('-password');
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar usuario
router.put('/:uid', async (req, res) => {
    try {
        const { first_name, last_name, age, password, role } = req.body;
        const update = {};
        if (first_name) update.first_name = first_name;
        if (last_name) update.last_name = last_name;
        if (age) update.age = age;
        if (password) update.password = createHash(password);
        if (role) update.role = role;

        const user = await UserModel.findByIdAndUpdate(req.params.uid, update, { new: true }).select('-password');
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar usuario
router.delete('/:uid', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.uid);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
