import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";
import Appointment from "../models/Appointment";
import APIClient from "../services/APIClient";
import { LoadingActionTypes } from '../store/loading/Actions';
import * as LoadingActionsCreators from '../store/loading/Creators';

interface AppointmentsProps extends RouteComponentProps {
    toggleLoading: (value: boolean) => void;
}

interface AppointmentsState {
   appointments: Appointment[];
}

export class Appointments extends React.Component<AppointmentsProps, AppointmentsState>{

    constructor(props: AppointmentsProps) {
        super(props);
        this.state = {
            appointments: []
        }
    }

    async componentDidMount() {
        try
        {
            this.props.toggleLoading(true);
            this.setState({appointments: await APIClient.getInstance().getAppointmentsService().get()})

        }
        catch(err)
        {
            alert("Error while getting appointments, or you do not have permissions");
        }
        this.props.toggleLoading(false);
    } 


    private renderAppointments(): React.ReactNode
    {
        
        const elements: JSX.Element[] = [];
        for(let i = 0; i < this.state.appointments.length; i++)
        {
            elements.push(
                <AppointmentCard onDelete={() => {
                    const appointments: Appointment[] = this.state.appointments;
                    appointments.splice(i, 1);
                    this.setState({appointments});
                }} className="mb-4 col-12" key={`appointment-${i}`} appointment={this.state.appointments[i]} showUser={true}></AppointmentCard>
            );
        }
        return elements;
    }






    
    public render(): React.ReactNode {
        return (
            <div className="container pt-3">
               <div className="row justify-content-center">
                <div className="col-6">
                    {this.renderAppointments()}
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

export default connect(() => { return {} }, mapDispatchToProps)(Appointments);