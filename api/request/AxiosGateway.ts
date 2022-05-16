import Gateway from "~/api/request/Gateway";
import {Parameters, RequestMethod, RequestOptions, Request} from "~/api/request/index";
import {entries, isUndefined} from "lodash-es";
import {AxiosRequestConfig, Axios} from "axios";

export class AxiosGateway implements Gateway {

    constructor(private axios: Axios) {
    }

    request(method: RequestMethod, resource: string, data?: Parameters, options?: RequestOptions): Request {
        const requestOptions: AxiosRequestConfig = {
            ...options,
            method: method
        }

        let query = ""

        if (!isUndefined(data)) {
            if (method === RequestMethod.GET || method === RequestMethod.DELETE || method === RequestMethod.HEAD) {
                let params = new URLSearchParams()
                for (const [key, value] of entries(data)) {
                    if (!isUndefined(value)) {
                        params.append(key, value)
                    }
                }
                query = `?${ params.toString() }`
            } else if (method === RequestMethod.POST || method === RequestMethod.PUT || method === RequestMethod.PATCH) {
                requestOptions.data = JSON.stringify(data)
            }
        }

        const controller = new AbortController()
        requestOptions.signal = controller.signal

        const abort = (): void => {
            controller.abort()
        }

        requestOptions.url = resource + query

        const response = this.axios.request(requestOptions)
        return { response, abort }
    }

    private getMethod(method: RequestMethod) {
        switch (method) {
            case RequestMethod.GET:
                return this.axios.get
            case RequestMethod.POST:
                return this.axios.post
            case RequestMethod.PUT:
                return this.axios.put
            case RequestMethod.DELETE:
                return this.axios.delete
            case RequestMethod.HEAD:
                return this.axios.head
            case RequestMethod.PATCH:
                return this.axios.patch
        }
    }
}
