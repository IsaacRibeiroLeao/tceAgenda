const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Todas as rotas de compromissos requerem autenticação
router.use(isAuthenticated);

// Dashboard e visualização de calendário (acessível para todos os usuários autenticados)
router.get('/dashboard', appointmentController.getDashboard);
router.get('/api/appointments', appointmentController.getAppointments);
router.get('/appointments/day/:date', appointmentController.getDayAppointments);

// Gerenciamento de compromissos (apenas para administradores)
router.get('/appointments/add', isAdmin, appointmentController.getAddAppointmentPage);
router.post('/appointments/add', isAdmin, appointmentController.addAppointment);
router.get('/appointments/edit/:id', isAdmin, appointmentController.getEditAppointmentPage);
router.post('/appointments/edit/:id', isAdmin, appointmentController.updateAppointment);
router.delete('/appointments/:id', isAdmin, appointmentController.deleteAppointment);

// Relatórios (acessível para todos os usuários autenticados)
router.get('/reports/day/:date', appointmentController.generateDayReport);

module.exports = router;
