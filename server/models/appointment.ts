import { Schema, model, Types } from 'mongoose';

interface IAppointment {
    code: string,
    reason: string,
    priority: string,
    appointmentDate: Date,
    status: string,
    medicalCenter:string,
    doctor:string,
    patient:string
}

// Define el schema para el modelo Turno
const appointmentSchema = new Schema<IAppointment>({
    code: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true,
    },
    appointmentDate: {
        type: Date,
        required:true
    },
    status: {
        type: String,
        enum: ['Pending', 'Arrived', 'Completed', 'Cancelled'],
        required: true,
        default: 'Pending'
    },
    medicalCenter: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
    patient: {
        type: String,
        required: true,
    },
});

const Appointment = model<IAppointment>('Appointment', appointmentSchema);

export type { IAppointment };
export default Appointment;