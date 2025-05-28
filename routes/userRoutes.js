const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // ✅ Importado


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas para gerenciar usuários
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', isAuthenticated, getUsers); // ✅ Protegido

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Deve ter entre 3 e 30 caracteres
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Deve ser um email válido
 *               password:
 *                 type: string
 *                 description: Deve ter pelo menos 6 caracteres
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Opcional. Pode ser "user" ou "admin"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação dos dados
 */

router.post('/', isAuthenticated, createUser); // ✅ Protegido

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Deve ter entre 3 e 30 caracteres
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Deve ser um email válido
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Pode ser "user" ou "admin"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro de validação dos dados
 *       404:
 *         description: Usuário não encontrado
 */

router.put('/:id', isAuthenticated, updateUser); // ✅ Protegido

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remover um usuário
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 */
router.delete('/:id', isAuthenticated, deleteUser); // ✅ Protegido

module.exports = router;
