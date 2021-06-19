import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import Appointment from "../models/Appointment";

interface AppointmentCardProps extends RouteComponentProps
{
    appointment: Appointment;
    showUser: boolean;
    className: string;
    onDelete?: () => void;
}

export class AppointmentCard extends React.Component<AppointmentCardProps> {
    

    public render(): React.ReactNode
    {
        return (
            <div className={"shadow-lg p-3 bg-body rounded " + this.props.className}>
                <div className="row m-0 p-0 justify-content-between col-12">
                    <div className="text-left m-0 p-0 fw-1 fs-3 col-5">
                        {this.props.appointment.id}
                    </div>
                    <button onClick={async () => {this.props.history.push("/create/" + this.props.appointment.id)}} className="btn btn-primary col-3">Edit</button>
                    <button onClick={async () => {
                        if(await this.props.appointment.delete())
                        {
                            if(this.props.onDelete) {this.props.onDelete()};
                            return;
                        }
                        alert("Error while deleting appointment");
                    }} className="btn btn-danger col-3">Delete</button>
                    
                </div>
                <div><strong>From:</strong> {new Date(this.props.appointment.start_timestamp).toUTCString()}</div>
                <div><strong>To:</strong> {new Date(this.props.appointment.end_timestamp).toUTCString()}</div>
                {this.props.showUser? <div><strong>User:</strong> {this.props.appointment.user.name}</div>: <></>}
            </div>
        );
    }
}

export default withRouter(AppointmentCard);