import { Router, Application } from "express";
import AppointmentCtrl from "./controllers/appointment";

const setRoutes = (app: Application) => {
    const router = Router();
    const appointmentCtrl = new AppointmentCtrl();

    //Appointment
    router.route('/appointments').get(appointmentCtrl.getAll.bind(appointmentCtrl));
    router.route('/appointments/status/active').get(appointmentCtrl.getActive.bind(appointmentCtrl));
    router.route('/appointments/count').get(appointmentCtrl.count.bind(appointmentCtrl));
    router.route('/appointment').post(appointmentCtrl.insert.bind(appointmentCtrl));
    router.route('/appointment/:id').get(appointmentCtrl.get.bind(appointmentCtrl));
    router.route('/appointment/:id').put(appointmentCtrl.update.bind(appointmentCtrl));
    router.route('/appointment/:id').delete(appointmentCtrl.delete.bind(appointmentCtrl));

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}

export default setRoutes;
