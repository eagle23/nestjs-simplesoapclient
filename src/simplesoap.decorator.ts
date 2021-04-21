/**
 * @author Andrey Orlin
 * @email ao@instafxgroup.com
 * @create date 2021-03-25 18:00:55
 * @modify date 2021-04-21 15:37:00
 * @desc Decorator
 */

import { Inject } from '@nestjs/common';
import { getProviderName } from './simplesoap.util'

export const InjectSoapClient = (name: string) => {
  return Inject(getProviderName(name));
};