import type { IRefObject } from './createRef';

/**
 * BaseProps interface.
 *
 * @public
 * {@docCategory IBaseProps}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBaseProps<T = any> {
  componentRef?: IRefObject<T>;
}
