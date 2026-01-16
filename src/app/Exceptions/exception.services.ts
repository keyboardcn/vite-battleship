import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

export class ErrorHandler {
    constructor(e: Error | any) {
        if (e instanceof AxiosError) {
            toast(`503:${e.message}`);
        } else {
            toast(`${e.message}`);
        }
    }
}