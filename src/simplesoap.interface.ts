/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-25 16:43:02
 * @modify date 2021-04-21 15:38:00
 * @desc Interfaces
 */

import { AxiosRequestConfig } from 'axios';
import { IOptions, IExOptions, IHeaders } from 'soap';

export interface ISimplesoapCacher {
    get: (key: string) => Promise<string | null>
    save: (key: string, data: string) => Promise<void>
}

export interface ISimplesoapExOptions extends IExOptions {
    cacher?: ISimplesoapCacher,
    axiosConfig?: AxiosRequestConfig
}

export interface ISimplesoapOptions {
    name: string;
    wsdl: string;
    soapOptions?: IOptions & {
        wsdl_options?: ISimplesoapExOptions & IExOptions
    }
}

export interface ISimplesoapCallbackRes {
    statusCode: number
}

export interface ISimplesoapCallback {
    (error: any, res?: ISimplesoapCallbackRes, body?: any): any
}

export interface ISimplesoapHttpClient {
    request: (url: string, data: any, callback: ISimplesoapCallback, exheaders: IHeaders, exoptions: IExOptions) => any
}

