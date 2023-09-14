import * as React from 'react';

export interface IControlledStateOptions<TProps, TProp extends keyof TProps, TDefaultProp extends keyof TProps> {
  defaultPropValue?: TProps[TProp];
  defaultPropName?: TDefaultProp;
}

/**
 * Controlled state helper that gives priority to props value. Useful for components that have props with both
 * controlled and uncontrolled modes. Any props values will override state, but will not update internal state.
 * If prop is defined and then later undefined, state will revert to its previous value.
 *
 * @param props - The props object containing controlled prop values.
 * @param propName - The controlled prop name.
 * @param options - Options. defaultPropValue is only used if defaultPropName (or its value) is undefined.
 */
export function useControlledState<TProps, TProp extends keyof TProps, TDefaultProp extends keyof TProps>(
  props: Readonly<TProps>,
  propName: TProp,
  options?: IControlledStateOptions<TProps, TProp, TDefaultProp>,
): [TProps[TProp] | undefined, React.Dispatch<React.SetStateAction<TProps[TProp]>>] {
  let defaultValue: TProps[TProp] | undefined;
  if (options) {
    if (options.defaultPropName && props[options.defaultPropName] !== undefined) {
      // No easy way to coerce TProps[TDefaultProp] to match TProps[TProp] in generic typings, so cast it here.
      defaultValue = props[options.defaultPropName] as unknown as TProps[TProp];
    } else {
      defaultValue = options && options.defaultPropValue;
    }
  }

  const [state, setState] = React.useState(defaultValue);

  if (props[propName] !== undefined) {
    return [props[propName], setState];
  } else {
    return [state, setState];
  }
}

/**
 * Simple controlled helper that gives priority to props value and falls back to derived value.
 *
 * @param props - The props object containing controlled prop values.
 * @param propName - The controlled prop name.
 * @param derivedValue - Derived value. Returned when controlled value is not present.
 */
export function getControlledDerivedProps<TProps, TProp extends keyof TProps>(
  props: Readonly<TProps>,
  propName: TProp,
  derivedValue: TProps[TProp],
): TProps[TProp] {
  if (props[propName] !== undefined) {
    return props[propName];
  } else {
    return derivedValue;
  }
}
