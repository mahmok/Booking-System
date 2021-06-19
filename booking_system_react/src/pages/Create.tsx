import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";
import Appointment from "../models/Appointment";
import APIClient from "../services/APIClient";
import { LoadingActionTypes } from '../store/loading/Actions';
import * as LoadingActionsCreators from '../store/loading/Creators';
import { parseISO, format } from 'date-fns';

interface CreateParams {
    id: string;
}

interface CreateProps extends RouteComponentProps<CreateParams> {
    toggleLoading: (value: boolean) => void;
}

interface CreateState {
   appointment: Appointment;
}

export class Create extends React.Component<CreateProps, CreateState>{


    private isEdit(): boolean {
        return this.props.match.params.id !== null && this.props.match.params.id !== undefined;
    }

    constructor(props: CreateProps)
    {
        super(props);
        this.state = {
            appointment: Appointment.empty()
        }
    }

    async componentDidMount()
    {
        try
        {
            if(this.isEdit())
            {
                this.props.toggleLoading(true);
                const appointment: Appointment = (await APIClient.getInstance().getAppointmentsService().getById(parseInt(this.props.match.params.id)))
                this.setState({appointment});
                
            }
        }
        catch(err)
        {

        }
        this.props.toggleLoading(false);
    }

    private async edit(): Promise<void>
    {
        try
        {
            this.props.toggleLoading(true);

            await APIClient.getInstance().getAppointmentsService().update(this.state.appointment);
            alert("Appointment updated.")

        }
        catch(err)
        {
            alert("Invalid start time or timeslot is already taken");
        }
        this.props.toggleLoading(false);
    }

    private async create(): Promise<void>
    {
        try
        {
            this.props.toggleLoading(true);
            if(!this.state.appointment.start_timestamp)
            {
                alert("Start time is empty");
                return;
            }
            await APIClient.getInstance().getAppointmentsService().create(this.state.appointment);
            alert("Appointment created.")
        }
        catch(err)
        {
            alert("Invalid start time or timeslot is already taken");
        }
        this.props.toggleLoading(false);
    }

    private renderTitle(): string 
    {
        if(this.isEdit())
        {
            return `Edit Appointment: ${this.props.match.params.id}`;
        }
        return "Create Appointment";
    }
    
    public render(): React.ReactNode {
        return (
            <div className="container pt-3">
               <div className="row justify-content-center">
                <div className="col-6 shadow-lg p-3 bg-body rounded">
                    <div className="fw-1 fs-2 text-center mb-4">{this.renderTitle()}</div>

                    <div className="mb-3">
                        <label htmlFor="start"  className="form-label">Start Time</label>
                        <input value={this.state.appointment.start_timestamp} className="form-control" type="datetime-local" id="start" name="start" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const appointment: Appointment = this.state.appointment;
                            appointment.start_timestamp = format(parseISO(event.target.value), "yyyy-MM-dd'T'hh:mm:ss");
                            this.setState({appointment});
                        }} ></input>
                    </div>

                    <div className="row m-0 p-0 justify-content-center">
                        <button className="btn btn-primary col-6" onClick={() => {
                            if(this.isEdit())
                            {
                                this.edit()
                                return;
                            }
                            this.create();
                        }}>{this.isEdit()? "Save": "Create"}</button>
                    </div>

                </div>
               </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: Dispatch<LoadingActionTypes>) => {
    return {
        toggleLoading: (isLoading: boolean) => dispatch(LoadingActionsCreators.toggleLoading(isLoading))
    }
}

export default connect(() => { return {} }, mapDispatchToProps)(Create);