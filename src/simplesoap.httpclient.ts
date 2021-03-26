/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-26 11:02:32
 * @modify date 2021-03-26 11:02:32
 * @desc httpClient
 */
import axios, { AxiosRequestConfig } from 'axios';
import * as http from 'http';
import * as https from 'https';

import { IHeaders } from "soap";
import { ISimplesoapCallback, ISimplesoapExOptions, ISimplesoapHttpClient } from './simplesoap.interface';

const defaultHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'none',
    'Accept-Charset': 'utf-8',
}

const isExternalCacherExists = (exoptions: ISimplesoapExOptions): boolean =>
    typeof exoptions?.cacher?.get === 'function' &&
    typeof exoptions?.cacher?.save === 'function'

export const httpClient: ISimplesoapHttpClient = {
    request: async (url: string, data: any, callback: ISimplesoapCallback, exheaders: IHeaders, exoptions: ISimplesoapExOptions) => {
        const method = data === null ? 'get' : 'post'
        const { axiosConfig, timeout, forever } = exoptions || {};

        if(data === null && isExternalCacherExists(exoptions)) {
            try {
                const { cacher: { get } } = exoptions;
                const cachedWsdl = await get(url)

                return callback(null, { statusCode: 200 }, cachedWsdl)

            } catch(e){}
        }

        try {
            const res = await axios({
                ...axiosConfig,
                httpAgent: new http.Agent({ keepAlive: !!forever }),
                httpsAgent: new https.Agent({ keepAlive: !!forever }),
                timeout,
                method,
                url,
                data,
                headers: {...defaultHeaders, ...exheaders, ...exoptions?.headers}
            })

            if(data === null && res?.status === 200 && res?.data && isExternalCacherExists(exoptions)) {
                // try to save
                const { cacher: { save } } = exoptions;
                save(url, res.data)
            }

            return callback(null, { statusCode: res.status }, res.data)
        } catch(e) {
            callback(e)
        }
    }
}