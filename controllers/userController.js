import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
// import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  // Delete a password from the user object
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);

  res.status(StatusCodes.OK).json({ msg: 'User updated' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Application stats' });
};
