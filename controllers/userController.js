const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // não enviar senha
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', user: { username, email, role } });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao remover usuário', error });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
