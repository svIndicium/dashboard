import {AuthenticationClient} from "~/api/clients/Authentication";
import {EndGateway} from "~/api/request/EndGateway";
import {AxiosGateway} from "~/api/request/AxiosGateway";
import axios from "axios";

const storage: Storage = process.server
    ? {
        getItem(key: string): string | null {
            return null;
        }, key(index: number): string | null {
            return null;
        }, length: 0, removeItem(key: string): void {
        }, setItem(key: string, value: string): void {
        }, clear(): void {
        }
    }
    : sessionStorage
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.put["Content-Type"] = "application/json"
axios.defaults.headers.patch["Content-Type"] = "application/json"
export const gateway = new EndGateway(new AxiosGateway(axios), storage)
export const authenticationClient = new AuthenticationClient(gateway)
