import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";
import UserCard from "../components/UserCard";
import Appointment from "../models/Appointment";
import User from "../models/User";
import APIClient from "../services/APIClient";
import { LoadingActionTypes } from '../store/loading/Actions';
import * as LoadingActionsCreators from '../store/loading/Creators';

interface UsersProps extends RouteComponentProps {
    toggleLoading: (value: boolean) => void;
}

interface UsersState {
   users: User[];
}

export class Users extends React.Component<UsersProps, UsersState>{

    constructor(props: UsersProps) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try
        {
            this.props.toggleLoading(true);
            this.setState({users: await APIClient.getInstance().getUsersService().get()})

        }
        catch(err)
        {
            alert("Error while getting Users, or you do not have permissions");
        }
        this.props.toggleLoading(false);
    } 


    private renderUsers(): React.ReactNode
    {
        
        const elements: JSX.Element[] = [];
        for(let i = 0; i < this.state.users.length; i++)
        {
            elements.push(
                <UserCard onSave={() => {
                    alert("User has been updated.")
                }} className="mb-4 col-12" key={`user-${i}`} role={this.state.users[i].role} user={this.state.users[i]}></UserCard>
            );
        }
        return elements;
    }






    
    public render(): React.ReactNode {
        return (
            <div className="container pt-3">
               <div className="row justify-content-center">
                <div className="col-6">
                    {this.renderUsers()}
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

export default connect(() => { return {} }, mapDispatchToProps)(Users);