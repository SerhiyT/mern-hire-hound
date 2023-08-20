import mongoose from 'mongoose';
import day from 'dayjs';
import { StatusCodes } from 'http-status-codes';

import Job from '../models/JobModel.js';

/* 
- Errors logged by Error Middleware 
- For that we need to import 'express-async-errors' package
- So we no needed  try/catch block here for example
*/
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};
  
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

/*
------------------------stats----------------------------------------
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
------------------------stats----------------------------------------
let stats = await Job.aggregate([ ... ]);
This line says we're going to perform an aggregation operation on the Job collection in MongoDB
and save the result in a variable called stats. The await keyword is used to wait for the operation to finish before continuing,
as the operation is asynchronous (i.e., it runs in the background).

{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } } 
This is the first stage of the pipeline. 
It filters the jobs so that only the ones created by the user specified by req.user.userId are passed to the next stage. 
The new mongoose.Types.ObjectId(req.user.userId) part converts req.user.userId into an ObjectId 
(which is the format MongoDB uses for ids).

{ $group: { _id: '$jobStatus', count: { $sum: 1 } } } 
This is the second stage of the pipeline. It groups the remaining jobs by their status (the jobStatus field). 
For each group, it calculates the count of jobs by adding 1 for each job ({ $sum: 1 }), 
and stores this in a field called count.


--------------------------monthlyApplications--------------------------------------
let monthlyApplications = await Job.aggregate([
  { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  {
    $group: {
      _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
      count: { $sum: 1 },
    },
  },
  { $sort: { '_id.year': -1, '_id.month': -1 } },
  { $limit: 6 },
]);
--------------------------monthlyApplications--------------------------------------
let monthlyApplications = await Job.aggregate([ ... ]); 
This line indicates that an aggregation operation will be performed on the Job collection in MongoDB. 
The result will be stored in the variable monthlyApplications. 
The await keyword ensures that the code waits for this operation to complete before proceeding, 
as it is an asynchronous operation.

{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } } 
This is the first stage of the pipeline. It filters the jobs to only those created by the user identified by req.user.userId.

{ $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } } 
This is the second stage of the pipeline. It groups the remaining jobs based on the year and month when they were created. 
For each group, it calculates the count of jobs by adding 1 for each job in the group.

{ $sort: { '_id.year': -1, '_id.month': -1 } } 
This is the third stage of the pipeline. 
It sorts the groups by year and month in descending order. 
The -1 indicates descending order. So it starts with the most recent year and month.

{ $limit: 6 } This is the fourth and last stage of the pipeline. 
It limits the output to the top 6 groups, after sorting. This is effectively getting the job count for the last 6 months.

So, monthlyApplications will be an array with up to 6 elements, 
each representing the number of jobs created by the user in a specific month and year. 
The array will be sorted by year and month, starting with the most recent.
*/