import { Request, Response } from "express";
import { Model } from "mongoose";

abstract class BaseCtrl<T> {
    abstract model:Model<T>

    //Get all
    getAll = async (req:Request, res: Response) => {
        try {
            const docs = await this.model.find({});
            return res.status(200).json(docs);
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})           
        }
    }
}

export default BaseCtrl;