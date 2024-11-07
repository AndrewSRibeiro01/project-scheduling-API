import { Schema, model, Document } from 'mongoose';

interface IAppointment extends Document {
  name: string;
  date: Date;
  location: string;
}

const appointmentSchema = new Schema<IAppointment>({
  name: {
    type: String,
    required: [true, 'O nome da pessoa é obrigatório.'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'A data do agendamento é obrigatória.']
  },
  location: {
    type: String,
    required: [true, 'O local do agendamento é obrigatório.'],
    trim: true
  }
}, { timestamps: true });

// Validação para evitar conflitos de horário e local
appointmentSchema.index({ date: 1, location: 1 }, { unique: true });

export const Appointment = model<IAppointment>('Appointment', appointmentSchema);
