/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-25 12:34:24
 * @modify date 2021-03-25 12:34:24
 * @desc SimpleSoapModule
 */
import { DynamicModule, Module } from '@nestjs/common';
import { SimpleSoapCoreModule } from './simplesoap-core.module';
import { ISimplesoapOptions } from './simplesoap.interface';

@Module({})
export class SimpleSoapModule {
    static forRoot(options: ISimplesoapOptions): DynamicModule {
        return {
            module: SimpleSoapModule,
            imports: [ SimpleSoapCoreModule.forRoot(options) ],
            exports: [ SimpleSoapCoreModule ]
        };
    }
}
