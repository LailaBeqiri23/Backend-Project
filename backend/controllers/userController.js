import User from '../models/User.js';
import { cloudinary } from '../utils/cloudinary.js';

const getUser = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ username, email, password, avatar: result.secure_url, cloudinary_id: result.public_id });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;
    if (password) userToUpdate.password = password;

    await userToUpdate.save();

    res.json(userToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    await cloudinary.uploader.destroy(deletedUser.cloudinary_id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUser, register, editUser, userDelete };
