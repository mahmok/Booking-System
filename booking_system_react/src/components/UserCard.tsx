import React from "react";
import User, { UserRoles } from "../models/User";

interface UserCardProps
{
    user: User;
    className: string;
    onSave?: () => void;
    role: string;
}

interface UserCardState {
    role: string;
}

export default class UserCard extends React.Component<UserCardProps, UserCardState> {
    
    constructor(props: UserCardProps) {
        super(props);
        this.state = {
            role: this.props.role
        }
    }

    public render(): React.ReactNode
    {
        return (
            <div className={"shadow-lg p-3 bg-body rounded " + this.props.className}>
                <div className="row m-0 p-0 justify-content-between col-12">
                    <div className="text-left m-0 p-0 fw-1 fs-3 col-7">
                        {this.props.user.name}
                    </div>
                    <button onClick={async () => {
                        if(await this.props.user.update())
                        {
                            if(this.props.onSave) {this.props.onSave()};
                            return;
                        }
                        alert("Error while updating user");
                    }} className="btn btn-primary col-3">Save</button>
                </div>
                <div><strong>Username:</strong> {this.props.user.username}</div>
                <div>
                    <select value={this.state.role}  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        this.props.user.role = event.target.value as UserRoles;
                        this.setState({role: event.target.value})
                    }}>
                        {
                             Object.values(UserRoles).map((value: UserRoles) => <option key={value} value={value}>{value}</option>)
                        }
                    </select>
                </div>
            </div>
        );
    }
}
