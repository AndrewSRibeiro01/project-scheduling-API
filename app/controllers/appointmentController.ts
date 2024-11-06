import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';

export const getAppointments = async (req: any, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos', error });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, date, location } = req.body;

    const newDate = new Date()

    const appointment = new Appointment({ name, date:newDate, location });
    await appointment.save();
    
    res.status(201).json(appointment);
  } catch (error :any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Conflito: Já existe um agendamento para o mesmo horário e local.' });
    } else {
      res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, date, location } = req.body;
    const newDate = new Date()
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { name, date:newDate, location },
      { new: true, runValidators: true }
    );
    // if (!appointment) {
    //   return res.status(404).json({ message: 'Agendamento não encontrado' });
    // }else{
      res.status(200).json(appointment);
  
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);


      res.status(200).json({ message: 'Agendamento deletado com sucesso' });
  

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error });
  }
};
