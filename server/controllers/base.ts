import { Request, Response } from "express";
import { Model} from "mongoose";
import { io } from "../app";

abstract class BaseCtrl<T> {
    abstract model:Model<T>

    //Get all
    async getAll (req:Request, res: Response) {
        try {
            const docs = await this.model.find({});
            return res.status(200).json(docs);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});        
        }
    }

    //Count
    async count (req:Request, res:Response){
        try {
            const count = await this.model.countDocuments();
            return res.status(200).json(count);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});
        }
    }

    //Get by Id
    async get (req:Request, res: Response) {
        try {
            const doc = await this.model.findOne({_id: req.params['id']});
            return res.status(200).json(doc);
        } catch (error) {            
            return res.status(400).json({error:(error as Error).message});        
        }
    }

    //Insert
    async insert (req:Request, res: Response) {
        try {
            const obj = await new this.model(req.body).save();
            io.emit('newAppointment', obj); // Emit the new appointment to the socket
            return res.status(201).json(obj);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});      
        }
    }

    //Update by Id
    async update (req:Request, res: Response) {
        try {
            const obj = await this.model.findOneAndUpdate({_id: req.params['id']}, req.body, {new:true});
            if (!obj) {
                return res.status(404).json({error: "Appointment not found"});
            }
            // Emit the updated appointment to the socket
            io.emit('updatedAppointment', obj);            
            return res.status(200).json(obj);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});      
        }
    }

    //Delete for testing purposes
    async delete (req:Request, res: Response) {
        try {
            await this.model.findOneAndDelete({_id: req.params['id']});
            return res.sendStatus(200);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});      
        }
    }
}

export default BaseCtrl;