import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import APIClient from "../services/APIClient";
import { LoadingActionTypes } from '../store/loading/Actions';
import * as LoadingActionsCreators from '../store/loading/Creators';
import * as AuthenticationActionsCreators from '../store/authentication/Creators';
import SessionStorage from "../utils/SessionStorage";
import User, { UserRoles } from "../models/User";

interface LoginProps extends RouteComponentProps {
    toggleAuthentication: (isAuthenticated: boolean) => void;
    toggleLoading: (value: boolean) => void;
}

interface LoginState {
    error: string;
    signupError: string;
}

export class Login extends React.Component<LoginProps, LoginState>{

    private username: string = "";
    private password: string = "";
    private name: string = ""

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            error: "",
            signupError: ""
        }
    }

    async componentDidMount() {
    }

    private async login(): Promise<void> {
        try {
            this.props.toggleLoading(true);
            if (this.username.trim() === "" || this.password === "") {
                alert("Username/password cannot be empty");
                this.props.toggleLoading(false);
                return;
            }
            const token: string = await APIClient.getInstance().getUsersService().login(this.username, this.password);
            new SessionStorage().saveToken(token);
            this.props.toggleLoading(false);
            this.props.toggleAuthentication(true);
            this.props.history.push('/appointments')
        }
        catch (err) {
            this.props.toggleLoading(false);
            this.setState({ error: "Invalid username/password" });
        }
    }


    private async signup(): Promise<void> {
        try {
            this.props.toggleLoading(true);
            if (this.username.trim() === "" || this.password === "" || this.name === "") {
                alert("Name/username/password cannot be empty");
                this.props.toggleLoading(false);
                return;
            }
            const user: User = new User(-1, this.name, this.username, UserRoles.MEMBER, this.password);
            if(await user.create())
            {
                alert("Account created.")
            }
            else
            {
                throw new Error();
            }
            this.props.toggleLoading(false);

        }
        catch (err) {
            this.props.toggleLoading(false);
            this.setState({ signupError: "Error while creating account or username is taken" });
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="container-fluid">
                <div className="mb-3 text-center fs-1 fw-bold">
                    Appointments
                        </div>
                <div className="row m-0 p-0 justify-content-around align-items-center vh-100">
                    <div className="col-4 shadow-lg  p-3 mb-5 bg-body rounded">
                        <div className="mb-3 text-center fs-1 fw-bold">
                            Login
                        </div>
                        <div className="text-danger">
                            {this.state.error}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.username = event?.target.value }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.password = event?.target.value }} />
                        </div>
                        <div className="row justify-content-center m-0 p-0">
                            <button onClick={() => this.login()} className="btn btn-primary col-6">Login</button>
                        </div>
                    </div>

                    <div className="col-4 shadow-lg  p-3 mb-5 bg-body rounded">
                        <div className="mb-3 text-center fs-1 fw-bold">
                            Signup
                        </div>
                        <div className="text-danger">
                            {this.state.signupError}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.name = event?.target.value }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.username = event?.target.value }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.password = event?.target.value }} />
                        </div>
                        <div className="row justify-content-center m-0 p-0">
                            <button onClick={() => this.signup()} className="btn btn-primary col-6">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: Dispatch<LoadingActionTypes>) => {
    return {
        toggleAuthentication: (isAuthenticated: boolean) => dispatch(AuthenticationActionsCreators.toggleAuthentication(isAuthenticated)),
        toggleLoading: (isLoading: boolean) => dispatch(LoadingActionsCreators.toggleLoading(isLoading))
    }
}

export default connect(() => { return {} }, mapDispatchToProps)(Login);