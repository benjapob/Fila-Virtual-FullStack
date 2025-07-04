import { Router, Application } from "express";
import AppointmentCtrl from "./controllers/appointment";

const setRoutes = (app: Application) => {
    const router = Router();
    const appointmentCtrl = new AppointmentCtrl();

    //Appointment
    router.route('/appointments').get(appointmentCtrl.getAll);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}

export default setRoutes;
