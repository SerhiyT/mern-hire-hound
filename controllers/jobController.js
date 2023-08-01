import Job from '../models/JobModel.js';

/* 
- Errors Logged by Error Middleware 
- For that we need to import 'express-async-errors' package
- So we no needed  try/catch block here for example
*/
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job });
};
  
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  res.status(200).json({ msg: 'Job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  };

  res.status(200).json({ msg: 'Job deleted', job: removedJob });
};