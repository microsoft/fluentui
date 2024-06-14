/**
 * TypeScript type to return a deep partial object (each property can be undefined, recursively.)
 * @deprecated - This type will hit infinite type instantiation recursion. Please use {@link DeepPartialV2}
 */
export type DeepPartial<T> = {
  // eslint-disable-next-line deprecation/deprecation
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface IDeepPartialArray<T> extends Array<DeepPartialV2<T>> {}

type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartialV2<T[Key]>;
};

export type DeepPartialV2<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? IDeepPartialArray<U>
  : T extends object
  ? DeepPartialObject<T>
  : T;
