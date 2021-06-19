import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Appointments from './pages/Appointments';
import Create from './pages/Create';
import Login from './pages/Login';
import Users from './pages/Users';
import { RootState } from './store/RootReducer';

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render(): React.ReactNode {
        let redirectPath: string = '';
        if (!this.props.isAuthenticated) {
            redirectPath = "/login";
        }
 
        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}


interface RoutesProps {
    isAuthenticated?: boolean;
}
export class Routes extends React.Component<RoutesProps> {

    public render(): React.ReactNode {
        return (
            

            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute isAuthenticated={this.props?.isAuthenticated || false} exact path="/appointments" component={Appointments} />
                <ProtectedRoute isAuthenticated={this.props?.isAuthenticated || false} exact path="/users" component={Users} />
                <ProtectedRoute isAuthenticated={this.props?.isAuthenticated || false} exact path="/create" component={Create} />
                <ProtectedRoute isAuthenticated={this.props?.isAuthenticated || false} exact path="/create/:id" component={Create} />
                <ProtectedRoute isAuthenticated={this.props?.isAuthenticated || false} exact path="/" component={Appointments} />
            </Switch>
        
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { isAuthenticated: state.authenticationState.isAuthenticated }
};
export default connect(mapStateToProps, {})(Routes);