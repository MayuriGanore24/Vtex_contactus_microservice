const registrationService = require('../services/registrationService');

class RegistrationController {
    async registerUser(req, res) {
        try {
            const result = await registrationService.registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully', data: result });
        } catch (error) {
            res.status(400).json({ message: `Error registering user: ${error.message}` });
        }
    }

    async getAllRegistrations(req, res) {
        try {
            const result = await registrationService.getAllRegistrations();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: `Error fetching registrations: ${error.message}` });
        }
    }

    async getRegistrationById(req, res) {
        try {
            const result = await registrationService.getRegistrationById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Registration not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: `Error fetching registration: ${error.message}` });
        }
    }

    async updateRegistration(req, res) {
        try {
            const result = await registrationService.updateRegistration(req.params.id, req.body);
            res.status(200).json({ message: 'Registration updated successfully', data: result });
        } catch (error) {
            res.status(400).json({ message: `Error updating registration: ${error.message}` });
        }
    }

    async deleteRegistration(req, res) {
        try {
            await registrationService.deleteRegistration(req.params.id);
            res.status(200).json({ message: 'Registration deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: `Error deleting registration: ${error.message}` });
        }
    }
}

module.exports = new RegistrationController();
