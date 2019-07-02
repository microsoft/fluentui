export type MaybeControlled<TControlledProps, TUncontrolledProps> =
  | ({
      isControlled: true;
    } & TControlledProps)
  | {
      isControlled: false;
    } & TUncontrolledProps;

export type ControlledProps<T> = T extends MaybeControlled<infer C, infer U>
  ? (C & {
      isControlled: true;
    })
  : never;

export type UncontrolledProps<T> = T extends MaybeControlled<infer C, infer U>
  ? (U & {
      isControlled: false;
    })
  : never;
