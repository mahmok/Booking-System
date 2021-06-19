import APIClient from "../services/APIClient";
import User from "./User";

export interface IAppointment {
    id: number;
    start_timestamp: string;
    end_timestamp: string;
    user: User;
}


export default class Appointment implements IAppointment {
    public id: number;
    public start_timestamp: string;
    public end_timestamp: string;
    public user: User;


    constructor(id: number, start_timestamp: string, end_timestamp: string, user: User)
    {
        this.id = id;
        this.end_timestamp = end_timestamp;
        this.start_timestamp = start_timestamp;
        this.user = user;
    }

    public static fromJson(json: IAppointment): Appointment {
        return new Appointment(json.id, json.start_timestamp, json.end_timestamp, User.fromJson(json.user));
    }

    public static empty(): Appointment {
        return {start_timestamp: new Date().toISOString()} as Appointment;
    }

    public async delete(): Promise<boolean>
    {
        try
        {
            await APIClient.getInstance().getAppointmentsService().delete(this.id);
            return true;
        }
        catch(err)
        {
            console.log(err);
        }
        return false;
    }


    public async create(): Promise<boolean>
    {
        try
        {
            await APIClient.getInstance().getAppointmentsService().create(this);
            return true;
        }
        catch(err)
        {
            
        }
        return false;
    }
}

export {};