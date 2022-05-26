import { Parameters, Request, RequestMethod, RequestOptions } from "~/api/request/index"

export default interface Gateway {
    request(method: RequestMethod, resource: string, data?: Parameters, options?: RequestOptions): Request
}
