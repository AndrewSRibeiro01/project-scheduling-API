import { Application, Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment
} from "../../controllers/appointmentController";
 
const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default (app: Application) => {
  app.use('/appointments', router);
};
