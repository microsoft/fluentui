import { warn } from './warn';
import { isControlled as checkIsControlled } from '../controlled';

type WarningMap = { [id: string]: boolean };

let warningsMap: {
  valueOnChange: WarningMap;
  valueDefaultValue: WarningMap;
  controlledToUncontrolled: WarningMap;
  uncontrolledToControlled: WarningMap;
};
if (process.env.NODE_ENV !== 'production') {
  warningsMap = {
    valueOnChange: {},
    valueDefaultValue: {},
    controlledToUncontrolled: {},
    uncontrolledToControlled: {},
  };
}

/** Reset controlled usage warnings for testing purposes. */
export function resetControlledWarnings(): void {
  if (process.env.NODE_ENV !== 'production') {
    warningsMap.valueOnChange = {};
    warningsMap.valueDefaultValue = {};
    warningsMap.controlledToUncontrolled = {};
    warningsMap.uncontrolledToControlled = {};
  }
}

export interface IWarnControlledUsageParams<P> {
  /** ID of the component instance. Used to prevent showing warnings repeatedly. */
  componentId: string;
  /** Name of the component class. */
  componentName: string;
  /** Current props to evaluate. */
  props: P;
  /** Previous props to evaluate (undefined if called in the constructor). */
  oldProps?: P;
  /** Name of the prop for the controlled value. */
  valueProp: keyof P;
  /** Name of the prop for the uncontrolled initial value. */
  defaultValueProp: keyof P;
  /** Name of the change handler prop. */
  onChangeProp: keyof P;
  /** Name of the read-only prop. */
  readOnlyProp?: keyof P;
}

/**
 * Check for and warn on the following error conditions with a form component:
 * - A value prop is provided (indicated it's being used as controlled) without a change handler,
 *    and the component is not read-only
 * - Both the value and defaultValue props are provided
 * - The component is attempting to switch between controlled and uncontrolled
 *
 * The messages mimic the warnings React gives for these error conditions on input elements.
 * The warning will only be displayed once per component ID.
 */
export function warnControlledUsage<P>(params: IWarnControlledUsageParams<P>): void {
  if (process.env.NODE_ENV !== 'production') {
    const { componentId, componentName, defaultValueProp, props, oldProps, onChangeProp, readOnlyProp, valueProp } =
      params;

    // This warning logic closely follows what React does for native <input> elements.

    const oldIsControlled = oldProps ? checkIsControlled(oldProps, valueProp) : undefined;
    const newIsControlled = checkIsControlled(props, valueProp);

    if (newIsControlled) {
      // onChange (or readOnly) must be provided if value is provided
      const hasOnChange = !!props[onChangeProp];
      const isReadOnly = !!(readOnlyProp && props[readOnlyProp]);
      if (!(hasOnChange || isReadOnly) && !warningsMap.valueOnChange[componentId]) {
        warningsMap.valueOnChange[componentId] = true;
        warn(
          `Warning: You provided a '${String(valueProp)}' prop to a ${String(componentName)} without an '${String(
            onChangeProp,
          )}' handler. ` +
            `This will render a read-only field. If the field should be mutable use '${String(defaultValueProp)}'. ` +
            `Otherwise, set '${String(onChangeProp)}'${readOnlyProp ? ` or '${String(readOnlyProp)}'` : ''}.`,
        );
      }

      // value and defaultValue are mutually exclusive
      const defaultValue = props[defaultValueProp];
      if (defaultValue !== undefined && defaultValue !== null && !warningsMap.valueDefaultValue[componentId]) {
        warningsMap.valueDefaultValue[componentId] = true;
        warn(
          `Warning: You provided both '${String(valueProp)}' and '${String(
            defaultValueProp,
          )}' to a ${componentName}. ` +
            `Form fields must be either controlled or uncontrolled (specify either the '${String(valueProp)}' prop, ` +
            `or the '${String(
              defaultValueProp,
            )}' prop, but not both). Decide between using a controlled or uncontrolled ` +
            `${componentName} and remove one of these props. More info: https://fb.me/react-controlled-components`,
        );
      }
    }

    // Warn if switching between uncontrolled and controlled. (One difference between this implementation
    // and React's <input> is that if oldIsControlled is indeterminate and newIsControlled true, we don't warn.)
    if (oldProps && newIsControlled !== oldIsControlled) {
      const oldType = oldIsControlled ? 'a controlled' : 'an uncontrolled';
      const newType = oldIsControlled ? 'uncontrolled' : 'controlled';
      const warnMap = oldIsControlled ? warningsMap.controlledToUncontrolled : warningsMap.uncontrolledToControlled;
      if (!warnMap[componentId]) {
        warnMap[componentId] = true;
        warn(
          `Warning: A component is changing ${oldType} ${componentName} to be ${newType}. ` +
            `${componentName}s should not switch from controlled to uncontrolled (or vice versa). ` +
            `Decide between using controlled or uncontrolled for the lifetime of the component. ` +
            `More info: https://fb.me/react-controlled-components`,
        );
      }
    }
  }
}
