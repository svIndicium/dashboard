import { AxiosRequestConfig, AxiosResponse } from "axios"

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD"
}

export enum RequestHeader {
    AUTHORIZATION = "Authorization"
}

export interface Request {
    abort: () => void
    response: Promise<AxiosResponse>
}

export interface KeyValuePairs<T = unknown> {
    [Symbol.iterator](): IterableIterator<[string, T]>

    entries(): IterableIterator<[string, T]>

    keys(): IterableIterator<string>

    values(): IterableIterator<T>

    append(name: string, value: T): void
}

export type Parameters<T = unknown> = object | KeyValuePairs | Array<T>

export type RequestOptions = Omit<AxiosRequestConfig, "url" | "baseURL">

export enum AuthenticationState {
    AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED",
    ACCESS_DENIED = "ACCESS_DENIED"
}
