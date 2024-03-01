const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  try {
    const { userId, title, description, budget, location } = req.body;

    const newJob = new Job({
      userId,
      title,
      description,
      budget,
      location,
    });

    console.log('Received a request to create a job.');

    await newJob.save();

    res.status(201).json({ success: true, message: 'Job created successfully' });
  } catch (error) {
    console.error('Error during job creation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userJobs = await Job.find({ userId });

    res.status(200).json({ success: true, jobs: userJobs });
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
