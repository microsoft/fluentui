import type { IRefObject } from './createRef';

/**
 * BaseProps interface.
 *
 * BaseProps interface.
 *
 * {@docCategory IBaseProps}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBaseProps<T = any> {
  componentRef?: IRefObject<T>;
}
