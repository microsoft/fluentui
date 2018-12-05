let _warningCallback: ((message: string) => void) | undefined = undefined;

export type ISettingsMap<T> = { [P in keyof T]?: string };

/**
 * Warns when a deprecated props are being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
export function warnDeprecations<P>(componentName: string, props: P, deprecationMap: ISettingsMap<P>): void {
  for (const propName in deprecationMap) {
    if (props && propName in props) {
      let deprecationMessage = `${componentName} property '${propName}' was used but has been deprecated.`;
      const replacementPropName = deprecationMap[propName];

      if (replacementPropName) {
        deprecationMessage += ` Use '${replacementPropName}' instead.`;
      }
      warn(deprecationMessage);
    }
  }
}

/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */
export function warnMutuallyExclusive<P>(componentName: string, props: P, exclusiveMap: ISettingsMap<P>): void {
  for (const propName in exclusiveMap) {
    if (props && propName in props) {
      let propInExclusiveMapValue = exclusiveMap[propName];
      if (propInExclusiveMapValue && propInExclusiveMapValue in props) {
        warn(`${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`);
      }
    }
  }
}

/**
 * Warns when props are required if a condition is met.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param requiredProps - The name of the props that are required when the condition is met.
 * @param conditionalPropName - The name of the prop that the condition is based on.
 * @param condition - Whether the condition is met.
 */
export function warnConditionallyRequiredProps<P>(
  componentName: string,
  props: P,
  requiredProps: string[],
  conditionalPropName: string,
  condition: boolean
): void {
  if (condition === true) {
    for (const requiredPropName of requiredProps) {
      if (!(requiredPropName in props)) {
        warn(`${componentName} property '${requiredPropName}' is required when '${conditionalPropName}' is used.'`);
      }
    }
  }
}

const warningsMap: {
  valueOnChange: { [id: string]: boolean };
  valueDefaultValue: { [id: string]: boolean };
  controlledToUncontrolled: { [id: string]: boolean };
  uncontrolledToControlled: { [id: string]: boolean };
} = {
  valueOnChange: {},
  valueDefaultValue: {},
  controlledToUncontrolled: {},
  uncontrolledToControlled: {}
};

/**
 * Check for and warn on the following error conditions with a form component:
 * - A value prop is provided (indicated it's being used as controlled) without a change handler
 * - Both the value and defaultValue props are provided
 *
 * The messages mimic the warnings React gives for these error conditions on input elements.
 * The warning will only be displayed once per component ID.
 *
 * @param componentId - The ID of the form component. Used to prevent showing warnings repeatedly.
 * @param componentName - The name of the form component.
 * @param props - The props to evaluate.
 * @param valueProp - The name of the prop for the controlled value.
 * @param defaultValueProp - The name of the prop for the uncontrolled default value.
 * @param onChangeProp - The name of the change handler prop.
 * @param addlOnChangeProp - The name of an additional change handler prop (e.g. the deprecated
 * `onChanged` prop in some components).
 * @param readOnlyProp - The name of the prop for setting the component to be read-only.
 */
export function warnControlledUsage<P>(
  componentId: string,
  componentName: string,
  props: P,
  valueProp: keyof P,
  defaultValueProp: keyof P,
  onChangeProp: keyof P,
  addlOnChangeProp?: keyof P,
  readOnlyProp?: keyof P
): void {
  const hasOnChange = !!(props[onChangeProp] || (addlOnChangeProp && props[addlOnChangeProp]));
  const isReadOnly = !!(readOnlyProp && props[readOnlyProp]);
  // != null is the same check used internally by React's <input>
  // https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMInput.js
  const hasValue = props[valueProp] != null; // tslint:disable-line:triple-equals
  const hasDefaultValue = props[defaultValueProp] != null; // tslint:disable-line:triple-equals

  if (hasValue && !(hasOnChange || isReadOnly) && !warningsMap.valueOnChange[componentId]) {
    warningsMap.valueOnChange[componentId] = true;
    warn(
      `Warning: You provided a '${valueProp}' prop to a ${componentName} without an '${onChangeProp}' handler. ` +
        `This will render a read-only field. If the field should be mutable use '${defaultValueProp}'. ` +
        `Otherwise, set '${onChangeProp}'${readOnlyProp ? ` or '${readOnlyProp}'` : ''}.`
    );
  }

  if (hasValue && hasDefaultValue && !warningsMap.valueDefaultValue[componentId]) {
    warningsMap.valueDefaultValue[componentId] = true;
    warn(
      `Warning: You provided both '${valueProp}' and '${defaultValueProp}' to a ${componentName}. ` +
        `Form fields must be either controlled or uncontrolled (specify either the '${valueProp}' prop, ` +
        `or the '${defaultValueProp}' prop, but not both). Decide between using a controlled or uncontrolled ` +
        `${componentName} and remove one of these props. More info: https://fb.me/react-controlled-components`
    );
  }
}

/**
 * Warn if a form component is switching between controlled and uncontrolled usage.
 * The message mimics the warning React gives for this error condition on input elements.
 * The warning will only be displayed once per component ID.
 *
 * @param componentId - The ID of the form component. Used to prevent showing warnings repeatedly.
 * @param componentName - The name of the form component.
 * @param wasControlled - true if the component was originally controlled, false if it was
 * uncontrolled. Used to determine the error message variant displayed.
 */
export function warnControlledUncontrolledSwitch(componentId: string, componentName: string, wasControlled: boolean): void {
  const oldType = wasControlled ? 'a controlled' : 'an uncontrolled';
  const newType = wasControlled ? 'uncontrolled' : 'controlled';
  const warnMap = wasControlled ? warningsMap.controlledToUncontrolled : warningsMap.uncontrolledToControlled;
  if (!warnMap[componentId]) {
    warnMap[componentId] = true;
    warn(
      `Warning: A component is changing ${oldType} ${componentName} to be ${newType}. ` +
        `${componentName}s should not switch from controlled to uncontrolled (or vice versa). ` +
        `Decide between using controlled or uncontrolled for the lifetime of the component. ` +
        `More info: https://fb.me/react-controlled-components`
    );
  }
}

/**
 * Sends a warning to console, if the api is present.
 *
 * @public
 * @param message - Warning message.
 */
export function warn(message: string): void {
  if (_warningCallback) {
    _warningCallback(message);
  } else if (console && console.warn) {
    console.warn(message);
  }
}

/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @public
 * @param warningCallback - Callback to override the generated warnings.
 */
export function setWarningCallback(warningCallback?: (message: string) => void): void {
  _warningCallback = warningCallback;
}
