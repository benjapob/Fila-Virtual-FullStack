import { Router, Application } from "express";
import AppointmentCtrl from "./controllers/appointment";

const setRoutes = (app: Application) => {
    const router = Router();
    const appointmentCtrl = new AppointmentCtrl();

    //Appointment
    router.route('/appointments').get(appointmentCtrl.getAll);
    router.route('/appointments/count').get(appointmentCtrl.count);
    router.route('/appointment').post(appointmentCtrl.insert);
    router.route('/appointment/:id').get(appointmentCtrl.get);
    router.route('/appointment/:id').put(appointmentCtrl.update);
    router.route('/appointment/:id').delete(appointmentCtrl.delete);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}

export default setRoutes;
