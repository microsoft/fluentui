import { IRefObject } from './createRef';

/**
 * BaseProps interface.
 *
 * @public
 */
// tslint:disable-next-line:no-any
export interface IBaseProps<T = any> {
  componentRef?: IRefObject<T>;
}
