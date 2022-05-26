import Vue from "vue"
import {
    AuthenticationState,
    Parameters,
    Request,
    RequestHeader,
    RequestMethod,
    RequestOptions
} from "~/api/request/index"
import Gateway from "~/api/request/Gateway"
import { AuthenticationClient } from "~/api/clients/Authentication"

export class AuthorizedAxiosGateway implements Gateway {
    constructor(private gateway: Gateway,
                private storage: Storage) {
    }

    request(method: RequestMethod, resource: string, data?: Parameters, options?: RequestOptions): Request {
        const optionOverride: RequestOptions = options
            ? {
                ...options,
                headers: {
                    ...options.headers,
                    [RequestHeader.AUTHORIZATION]: `Bearer ${this.getToken()}`
                }
            }
            : {
                headers: {
                    [RequestHeader.AUTHORIZATION]: `Bearer ${this.getToken()}`
                }
            }
        const request = this.gateway.request(method, resource, data, optionOverride)
        return {
            ...request,
            response: request.response.then((response) => {
                switch (response.status) {
                    case 401:
                        Vue.prototype.$eventBus.emit(AuthenticationState.AUTHORIZATION_FAILED)
                        break
                    case 403:
                        Vue.prototype.$eventBus.emit(AuthenticationState.ACCESS_DENIED)
                        break
                }
                return response
            })
        }
    }

    private getToken() {
        return this.storage.getItem(AuthenticationClient.ACCESS_TOKEN_STORAGE_KEY)
    }
}
