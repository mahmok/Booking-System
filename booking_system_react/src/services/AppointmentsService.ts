import Appointment, { IAppointment } from '../models/Appointment';
import APIClient, { BaseResponse, RequestOptions } from './APIClient';

export default class AppointmentsService {
    private static instance: AppointmentsService;

    private constructor() { }

    public static getInstance(): AppointmentsService {
        if (!AppointmentsService.instance) {
            AppointmentsService.instance = new AppointmentsService();
        }

        return AppointmentsService.instance;
    }

    public async get(): Promise<Appointment[]> {

        const request: RequestOptions = {
            method: "GET",
            url: `${APIClient.baseUrl}v1/appointments`,
        };
        const appointments: Appointment[] = (await APIClient.makeRequest<BaseResponse<Appointment[]>>(request)).data.map((a: Appointment) => {
            return Appointment.fromJson(a);
        });

        return appointments;
    }

    public async getById(id: number): Promise<Appointment> {

        const request: RequestOptions = {
            method: "GET",
            url: `${APIClient.baseUrl}v1/appointments/${id}`,
        };
        return Appointment.fromJson((await APIClient.makeRequest<BaseResponse<Appointment>>(request)).data)
    }

    public async delete(id: number): Promise<void> {

        const request: RequestOptions = {
            method: "DELETE",
            url: `${APIClient.baseUrl}v1/appointments/${id}`,
        };
        await APIClient.makeRequest<void>(request)
    }

    public async create(appointment: IAppointment): Promise<void> {
        console.log(appointment);
        const request: RequestOptions = {
            method: "POST",
            url: `${APIClient.baseUrl}v1/appointments`,
            body: appointment
        };

        await APIClient.makeRequest<void>(request)
    }

    public async update(appointment: IAppointment): Promise<Appointment> {
        const request: RequestOptions = {
            method: "PATCH",
            url: `${APIClient.baseUrl}v1/appointments/${appointment.id}`,
            body: appointment
        };

        return Appointment.fromJson((await APIClient.makeRequest<BaseResponse<Appointment>>(request)).data)
    }


}