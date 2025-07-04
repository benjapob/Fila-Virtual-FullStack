import Appointment, { IAppointment } from "../models/appointment";
import BaseCtrl from "./base";

class AppointmentCtrl extends BaseCtrl<IAppointment> {
  model = Appointment;
}

export default AppointmentCtrl;