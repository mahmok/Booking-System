import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { LoadingIndicator } from './components/LoadingIndicator';
import { RootState } from './store/RootReducer';
import { connect } from 'react-redux';
import React from 'react';
import Navbar from './components/Navbar';


interface AppProps {
  isLoading: boolean;
  isAuthenticated: boolean;
}


class App extends React.Component<AppProps> {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        {this.props.isAuthenticated? <Navbar></Navbar>: <></>}
        <Routes></Routes>
        <LoadingIndicator isLoading={this.props.isLoading}></LoadingIndicator>

      </BrowserRouter>
    );
  };
}


const mapStateToProps = (state: RootState) => { 
  return {isLoading: state.loadingState.isLoading, isAuthenticated: state.authenticationState.isAuthenticated}
};


export default connect(mapStateToProps, {})(App);
