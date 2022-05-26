import { AxiosResponse } from "axios"
import { AuthorizedAxiosGateway } from "~/api/request/AuthorizedAxiosGateway"
import Gateway from "~/api/request/Gateway"
import { Parameters, RequestMethod, RequestOptions } from "~/api/request/index"

export class EndGateway {
    private readonly authorizedGateway: AuthorizedAxiosGateway

    constructor(
         private readonly openGateway: Gateway,
         private readonly storage: Storage
    ) {
        this.authorizedGateway = new AuthorizedAxiosGateway(openGateway, storage)
    }

    async request(method: RequestMethod, resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        const response = await this.authorizedGateway.request(method, resource, data, options).response
        if (response.status !== 200) {
            throw response
        }
        return response
    }

    get(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.request(RequestMethod.GET, resource, data, options)
    }

    post(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.request(RequestMethod.POST, resource, data, options)
    }

    put(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.request(RequestMethod.PUT, resource, data, options)
    }

    delete(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.request(RequestMethod.DELETE, resource, data, options)
    }

    patch(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.request(RequestMethod.PATCH, resource, data, options)
    }

    async getJson<T>(resource: string, data?: Parameters, options?: RequestOptions): Promise<T> {
        return (await this.get(resource, data, options)).data
    }

    async postJson<T>(resource: string, data?: Parameters, options?: RequestOptions): Promise<T> {
        return (await this.post(resource, data, options)).data
    }

    getOpen(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.openGateway.request(RequestMethod.GET, resource, data, options).response
    }

    postOpen(resource: string, data?: Parameters, options?: RequestOptions): Promise<AxiosResponse> {
        return this.openGateway.request(RequestMethod.POST, resource, data, options).response
    }
}
