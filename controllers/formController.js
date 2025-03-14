const express = require('express');
const router = express.Router();
const formService = require('../services/formService');

// Utility function to extract relevant fields based on form type
const extractFormData = (formType, data) => {
    switch (formType) {
        case 'ACT_CON':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_CONTACTUS_ACTIVE: data.MSG_CONTACTUS_ACTIVE };
        case 'VIS_CON':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_CONTACTUS_VISITOR: data.MSG_CONTACTUS_VISITOR };
        case 'CONSULT':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_CONSULT: data.MSG_CONSULT };
        case 'LICENSE':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_LICENSE: data.MSG_LICENSE };
        case 'SUBSCRIBE':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_SUBSCRIBE: data.MSG_SUBSCRIBE };
        case 'VIS_ENT':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_ENTERPRISE_VISITOR: data.MSG_ENTERPRISE_VISITOR };
        case 'ACT_ENT':
            return { last_name: data.last_name, email: data.email, phone_number: data.phone_number, MSG_ENTERPRISE_ACTIVE: data.MSG_ENTERPRISE_ACTIVE };
        default:
            throw new Error('Invalid form type');
    }
};

// Generic handler function
const handleFormSubmission = async (req, res, formType) => {
    try {
        const formData = extractFormData(formType, req.body);
        formData.formType = formType;
        const result = await formService.submitForm(formData);
        res.status(201).json({ message: `${formType} form submitted successfully`, data: result });
    } catch (error) {
        res.status(400).json({ message: `Error submitting ${formType} form: ${error.message}` });
    }
};

// Define routes for each form type
router.post('/contactus/active', async (req, res) => await handleFormSubmission(req, res, 'ACT_CON'));
router.post('/contactus/visitor', async (req, res) => await handleFormSubmission(req, res, 'VIS_CON'));
router.post('/consult', async (req, res) => await handleFormSubmission(req, res, 'CONSULT'));
router.post('/license', async (req, res) => await handleFormSubmission(req, res, 'LICENSE'));
router.post('/subscribe', async (req, res) => await handleFormSubmission(req, res, 'SUBSCRIBE'));
router.post('/enterprise/active', async (req, res) => await handleFormSubmission(req, res, 'ACT_ENT'));
router.post('/enterprise/visitor', async (req, res) => await handleFormSubmission(req, res, 'VIS_ENT'));


module.exports = router;
