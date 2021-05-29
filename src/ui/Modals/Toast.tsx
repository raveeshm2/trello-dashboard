import React, { useContext } from 'react'
import { Toast as BootstrapToast } from "react-bootstrap";
import { GlobalContext, ToastinitialState } from '../../config/global';


interface toastProps { }

export const Toast: React.FC<toastProps> = () => {
    const context = useContext(GlobalContext);
    const data = context.toast;

    return (
        <BootstrapToast
            style={{
                position: 'fixed',
                top: data.top,
                right: data.right,
                zIndex: 10
            }}
            show={data.show}
            autohide={data.autohide}
            onClose={() => context.dispatch!({
                type: 'UPDATE_TOAST',
                payload: ToastinitialState
            })}
            delay={data.delay}
        >
            <BootstrapToast.Header>
                {data.header}
            </BootstrapToast.Header>
            <BootstrapToast.Body>{data.body}</BootstrapToast.Body>
        </BootstrapToast>
    );
}