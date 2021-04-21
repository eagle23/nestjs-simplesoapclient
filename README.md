
<h1 align="center">NestJS Simple Soap Client</h1>

### Installation

**Yarn**
```bash
yarn add simplesoapclient
```

Let's register the config module in `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { SimpleSoapModule } from './simplesoap/simplesoap.module';

@Module({
    imports: [
        SimpleSoapModule.forRoot({
            name: 'SUPER_WSDL_SERVICE',
            wsdl: 'https://example.com/service.svc?singlewsdl',
        })
    ],
})
export class AppModule {}
```

In `app.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { InjectSoapClient, SimpleSoapService } from 'simplesoapclient';

@Injectable()
export class AppService {
    constructor(
        @InjectSoapClient('SUPER_WSDL_SERVICE') private readonly service: SimpleSoapService
    ){}

    getHello(args): any {
        return this.service.request<any>('SuperMethod', args)
    }
}
```

Extended config for module

```ts

import {
    httpClient,
    fileCacher,
    ISimplesoapOptions
} from 'simplesoapclient';

const wsdlHeaders = {
    'User-Agent': 'My Super Agent',
}

export const config: ISimplesoapOptions = {
    name: 'SUPER_WSDL_SERVICE',
    wsdl: 'https://example.com/service.svc?singlewsdl',
    soapOptions: {
        httpClient: httpClient, // axios client
        wsdl_headers: wsdlHeaders,

        wsdl_options: {
            timeout: 5000,
            forever: true, // keep-alive
            cacher: fileCacher // custom chacher
        }
    },
};
```

Cacher interface

```ts
interface ISimplesoapCacher {
    get: (key: string) => Promise<string | null>
    save: (key: string, data: string) => Promise<void>
}
```


-----

