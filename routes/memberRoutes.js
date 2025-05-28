/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API para membros
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retorna a lista de membros
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Lista de membros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *   post:
 *     summary: Cria um novo membro
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Membro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Atualiza um membro existente pelo ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do membro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Membro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Membro não encontrado
 *   delete:
 *     summary: Remove um membro pelo ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do membro a ser removido
 *     responses:
 *       200:
 *         description: Membro removido com sucesso
 *       404:
 *         description: Membro não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - Nome
 *         - Sexo
 *         - Idade
 *       properties:
 *         Nome:
 *           type: string
 *           description: Nome do membro
 *         Sexo:
 *           type: string
 *           description: Sexo do membro
 *         Idade:
 *           type: integer
 *           description: Idade do membro
 *         Endereco:
 *           type: string
 *           description: Endereço do membro
 *         Email:
 *           type: string
 *           description: Email do membro
 *         Telefone:
 *           type: string
 *           description: Telefone do membro
 *         DataCadastro:
 *           type: string
 *           format: date-time
 *           description: Data de cadastro (gerada automaticamente)
 */



const express = require('express');
const router = express.Router();
const {
  getMembers,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // ✅ Importado

// ✅ Rotas protegidas
router.get('/', isAuthenticated, getMembers);
router.post('/', isAuthenticated, createMember);
router.put('/:id', isAuthenticated, updateMember);
router.delete('/:id', isAuthenticated, deleteMember);

module.exports = router;