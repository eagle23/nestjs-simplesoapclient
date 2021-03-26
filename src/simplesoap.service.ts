/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-25 12:34:48
 * @modify date 2021-03-25 12:34:48
 * @desc SimpleSoapService
 */

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { createClientAsync, Client } from 'soap';
import { SIMPLESOAP_OPTIONS_PROVIDER } from './simplesoap.constant';
import { ISimplesoapOptions } from './simplesoap.interface';

@Injectable()
export class SimpleSoapService {
    constructor(
        @Inject(SIMPLESOAP_OPTIONS_PROVIDER)
        private options: ISimplesoapOptions,
    ) {}

    request<IResponse = any, IRequest = any>(
        method: string,
        args: IRequest,
    ): Observable<IResponse> {

        return new Observable<IResponse>(subscriber => {
            const { wsdl_headers: headers, wsdl_options } = this.options.soapOptions || {};
            const { timeout, forever } = wsdl_options || {};

            createClientAsync(this.options.wsdl, this.options.soapOptions)
               .then((client: Client) => client[`${method}Async`](args, { headers, timeout, forever }))
               .then(data => {
                   subscriber.next(data)
                   subscriber.complete()
               })
               .catch(err => {
                   subscriber.error(err);
               })
        })
    }
}
