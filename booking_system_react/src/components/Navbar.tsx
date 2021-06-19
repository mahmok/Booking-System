import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";


export class Navbar extends React.Component<RouteComponentProps> {

    constructor(props: RouteComponentProps) {
        super(props);
    }
    private navigate(page: string): void {
        this.props.history.push(page);
    } 

    public render(): React.ReactNode {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div onClick={() => {this.navigate('/appointments')}} className="navbar-brand">Appointments</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li onClick={() => {this.navigate('/users')}} className="nav-item">
                                <div className="nav-link">Users</div>
                            </li>
                            <li className="nav-item">
                                <div onClick={() => {this.navigate('/create')}} className="nav-link">Create</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
