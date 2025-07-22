import { Request, Response } from "express";
import Appointment, { IAppointment } from "../models/appointment";
import BaseCtrl from "./base";
import moment from 'moment'

class AppointmentCtrl extends BaseCtrl<IAppointment> {
  model = Appointment;

  //Override insert to add code and appointment date
  override async insert(req:Request,res:Response) {
    //Add new date
    if (!req.body.appointmentDate) {
        req.body.appointmentDate = Date();
    }
    //Add auto-generated code
    const lastAppointmnent:any = await this.model.find({priority:req.body.priority, appointmentDate:{$lt:moment().endOf('day')}}).sort({createdAt:-1});
    //Get next number
    let nextNum:string;
    if (lastAppointmnent.length === 0) {
      nextNum = '001'
    } else {
      const lastNum = Number(lastAppointmnent[0].code.slice(1));
      nextNum = (lastNum + 1).toString().padStart(3, '0');
    }
    
    //Define code based on priority
    switch (req.body.priority) {
        case 'Low':
          req.body.code = `C${nextNum}`
          break;
        
        case 'Medium':
          req.body.code = `B${nextNum}`
          break;
        
        case 'High':
          req.body.code = `A${nextNum}`
          break;
    
        default:
          //Unknown
          req.body.code = 'UNK';
          break;
    }

    // Base ctrl
    const result = await super.insert(req, res);

    return result;
    
  }

  //New function getActive to filter by status
  async getActive(req:Request, res:Response) {
    try {
        const docs = await this.model.find({status:{$in:['Pending', 'Arrived']}});
        return res.status(200).json(docs);
    } catch (error) {
        return res.status(400).json({error:(error as Error).message});        
    }
  }
}

export default AppointmentCtrl;