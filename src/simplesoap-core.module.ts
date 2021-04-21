/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-25 12:34:24
 * @modify date 2021-04-21 15:36:52
 * @desc SimpleSoapCoreModule
 */
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SIMPLESOAP_OPTIONS_PROVIDER } from './simplesoap.constant';
import { ISimplesoapOptions } from './simplesoap.interface';
import { SimpleSoapService } from './simplesoap.service';
import { getProviderName } from './simplesoap.util';

@Global()
@Module({})
export class SimpleSoapCoreModule {

    static forRoot(options: ISimplesoapOptions): DynamicModule {

        const optionsProvider: Provider = {
            provide: SIMPLESOAP_OPTIONS_PROVIDER,
            useValue: options
        }

        const soapServiceProvider: Provider = {
            provide: getProviderName(options.name),
            useValue: new SimpleSoapService(options)
        }

        return {
            module: SimpleSoapCoreModule,
            providers: [
               optionsProvider,
               soapServiceProvider
            ],
            exports: [
                optionsProvider,
                soapServiceProvider
            ],
        };
    }
}
