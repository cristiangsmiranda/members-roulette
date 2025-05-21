// controllers/memberController.js
const Member = require('../models/member');

// GET: Buscar todos os membros
const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar membros', error });
  }
};

// POST: Criar um novo membro
const createMember = async (req, res) => {
  try {
    const { Nome, Sexo, Idade, Endereco, Email, Telefone } = req.body;

    if (!Nome || !Sexo || !Idade) {
      return res.status(400).json({ message: 'Nome, Sexo e Idade são obrigatórios.' });
    }

    const newMember = new Member({
      Nome,
      Sexo,
      Idade,
      Endereco,
      Email,
      Telefone
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Erro ao criar membro:', error); // 👈 Adicione isto
    res.status(500).json({ message: 'Erro ao criar membro', error });
  }
};

// Atualizar membro pelo ID
const updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updates = req.body;

    // Validação simples: pelo menos um campo para atualizar
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Nenhum dado para atualizar foi fornecido.' });
    }

    const updatedMember = await Member.findByIdAndUpdate(memberId, updates, { new: true, runValidators: true });

    if (!updatedMember) {
      return res.status(404).json({ message: 'Membro não encontrado.' });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar membro.', error });
  }
};


// Deletar membro pelo ID
const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    const deletedMember = await Member.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Membro não encontrado.' });
    }

    res.status(200).json({ message: 'Membro deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar membro.', error });
  }
};


module.exports = {
  getMembers,
  createMember,
  updateMember,
  deleteMember
};
