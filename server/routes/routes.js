const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const validateDrug = require('../middleware/validateDrug'); // import middleware

// Page routes
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API routes
route.post('/api/drugs', validateDrug, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validateDrug, controller.update);
route.delete('/api/drugs/:id', controller.delete);
route.get('/api/purchase', controller.purchase);

module.exports = route;