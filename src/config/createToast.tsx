import { UPDATE_TOAST } from "./global";

export const createToast = (header: string, body: string): UPDATE_TOAST => {
    return {
        type: 'UPDATE_TOAST',
        payload: {
            show: true,
            header: <>
                <strong className="mr-auto"> {header} </strong>
            </>,
            body: <>{body}</>
        }
    }
}