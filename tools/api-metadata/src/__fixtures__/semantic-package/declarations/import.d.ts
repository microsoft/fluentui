import type { NamespaceMember } from './namespace.js';

export interface BaseState {
  iconPosition: 'before' | 'after';
  root: {
    id: string;
    shared: 'base' | 'both';
  };
}

export type ComposedState = BaseState & {
  root: {
    'data-state'?: 'open' | 'closed';
    shared: 'both';
  };
};

export type WidgetSize = 'small' | 'medium';

export interface StyledProps {
  /** @default 'secondary' */
  appearance?: 'primary' | 'secondary';
  /** @defaultValue false */
  disabled?: boolean;
  shape?: 'rounded' | 'square';
  size?: WidgetSize;
}

export interface ConflictingDefaults {
  /**
   * @default 'first'
   * @defaultValue 'second'
   */
  value?: string;
  /**
   * @default 0
   * @defaultValue 0
   */
  count?: number;
}

export interface InheritedProps extends StyledProps {
  inherited?: boolean;
}

export interface StringDictionary {
  readonly [key: string]: string;
  fixed: string;
}

export type StyledVariant =
  | (StyledProps & { appearance?: 'primary' })
  | (StyledProps & { appearance?: 'secondary'; secondaryOnly?: boolean });

export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, Extract<keyof T, K>> : never;
export type BaseProps = Omit<StyledProps, 'appearance' | 'shape' | 'size'>;
export type BaseVariant = DistributiveOmit<StyledVariant, 'appearance' | 'shape' | 'size'>;
export type IconPosition = BaseState['iconPosition'];
export type OptionalMembers<T> = { readonly [K in keyof T]?: T[K] };
export type NamespaceMemberName = NamespaceMember['name'];

export interface RecursiveNode<T = string> {
  children?: readonly RecursiveNode<T>[];
  value: T;
}

export type RecursiveConditional<T> = T extends readonly (infer Item)[] ? RecursiveConditional<Item> : T;

export interface Merged {
  first: string;
}

export interface Merged {
  second: number;
}

export function overloaded(value: string): string;
export function overloaded(value: number): number;

export function identity<T extends NamespaceMember = NamespaceMember>(value: T): T;

export interface GenericCallable<T> {
  (required: T, optional?: number): T;
}

export declare const stringCallable: GenericCallable<string>;

export interface ReactElement {
  readonly type: string;
}

export interface ForwardRefComponent<P> {
  (props: P): ReactElement;
}

export declare const StyledWidget: ForwardRefComponent<StyledProps>;
export declare const HeadlessWidget: ForwardRefComponent<BaseProps>;
export declare const StringWidget: ForwardRefComponent<RecursiveNode<string>>;
export declare const RestrictedWidget: ForwardRefComponent<Pick<StyledProps, 'disabled'>>;
export declare function InlineWidget(props: { count: number; mode?: 'a' | 'b' }): ReactElement;
export declare function EmptyWidget(props: {}): ReactElement;
export declare function NoPropsWidget(): ReactElement;

export interface GenericMethodBase<T> {
  transform(value: T): T;
  generic<U extends T>(value: U): U;
}

export interface StringMethodHost extends GenericMethodBase<string> {}

export class Dual {
  static create(): Dual;
  readonly kind: 'dual';
}

export function mergedFunction(value: string): string;

export namespace mergedFunction {
  const version: 1;
  type Options = OptionalMembers<StyledProps>;
}

export type OriginalAlias = RecursiveNode<number>;
export type { OriginalAlias as RenamedAlias };

export * as utilities from './namespace.js';

declare const defaultIdentity: <T>(value: T) => T;
export default defaultIdentity;
