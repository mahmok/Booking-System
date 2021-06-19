import React from "react";

interface LoadingIndicatorProps
{
    isLoading: boolean
}

export class LoadingIndicator extends React.Component<LoadingIndicatorProps> {
    

    public render(): React.ReactNode
    {
        return (
            <div style={{display: this.props.isLoading? 'block': 'none', top: 0, width: '100%', height: '100%', position: 'fixed', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 9999}}>
                <div className="row m-0 p-0 justify-content-center vh-100 align-items-center">
                    <div className="spinner-grow text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}
