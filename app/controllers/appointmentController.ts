import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import dayjs from 'dayjs';

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
    const { name, date, time, location } = req.body;
    const existingAppointment = await Appointment.findOne({ time, location });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Conflito: Já existe um agendamento para o mesmo horário e local.' });
    }
    const formattedDate = dayjs(date, "MM/DD/YYYY").toDate();
    const appointment = new Appointment({ name, date: formattedDate, time, location });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, date, location } = req.body;
    const formattedDate = dayjs(date, "MM/DD/YYYY").toDate();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { name, date: formattedDate, location },
      { new: true, runValidators: true }
    );

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
