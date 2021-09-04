const router = require('express').Router();
const Deployment = require("../../Models/deployments");

module.exports = () => {
  // POST /deployments/add
  router.post('/add', async (req, res) => {
    try {
      const { templateName, url, version } = req.body;
      const currentTime = new Date().toUTCString();
      const deployment = new Deployment({
        templateName,
        url,
        version: [version],
        date: currentTime
      });
      await deployment.save();
      res.status(200).json({message: "Deployment Added Successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  });

  // GET /deployments/get
  router.get('/get', async (req, res) => {
    try {
      const deployments = await Deployment.find();
      res.status(200).json({deployments: deployments});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  });

  // POST /deployments/delete
  router.post('/delete', async (req, res) => {
    try {
      const { id } = req.body;
      await Deployment.deleteOne({ "_id": id });
      res.status(200).json({message: "Deployment Deleted Successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  });
  return router;
};