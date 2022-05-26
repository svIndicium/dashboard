import axios from "axios"
import { AuthenticationClient } from "~/api/clients/Authentication"
import { EndGateway } from "~/api/request/EndGateway"
import { AxiosGateway } from "~/api/request/AxiosGateway"

const storage: Storage = process.server
  ? {
    getItem(_key: string): string | null {
      return null
    },
    key(_index: number): string | null {
      return null
    },
    length: 0,
    removeItem(_key: string): void {
    },
    setItem(_key: string, _value: string): void {
    },
    clear(): void {
    }
  }
    : sessionStorage
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.put["Content-Type"] = "application/json"
axios.defaults.headers.patch["Content-Type"] = "application/json"
export const gateway = new EndGateway(new AxiosGateway(axios), storage)
export const authenticationClient = new AuthenticationClient(gateway)
