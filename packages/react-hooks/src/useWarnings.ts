import * as React from 'react';
import {
  warn,
  warnControlledUsage,
  warnConditionallyRequiredProps,
  warnDeprecations,
  warnMutuallyExclusive,
} from '@fluentui/utilities';
import { usePrevious } from './usePrevious';
import { useConst } from './useConst';
import type { ISettingsMap, IWarnControlledUsageParams } from '@fluentui/utilities';

export interface IWarningOptions<P> {
  /** Name of the component */
  name: string;

  /** Current component props */
  props: P;

  /** Generic messages */
  other?: string[];

  /** Warns when props are required if a condition is met */
  conditionallyRequired?: {
    /** Props required when the condition is met */
    requiredProps: string[];
    /** Name of the prop that the condition is based on */
    conditionalPropName: string;
    /** Whether the condition is met */
    condition: boolean;
  }[];

  /**
   * Warns when deprecated props are being used. Each key is a prop name and each value is
   * either undefined or a replacement prop name.
   */
  deprecations?: ISettingsMap<P>;

  /**
   * Warns when two props which are mutually exclusive are both being used.
   * The key is one prop name and the value is the other.
   */
  mutuallyExclusive?: ISettingsMap<P>;

  /**
   * Check for and warn on the following error conditions with a form component:
   * - A value prop is provided (indicated it's being used as controlled) without a change handler,
   *    and the component is not read-only
   * - Both the value and defaultValue props are provided
   * - The component is attempting to switch between controlled and uncontrolled
   *
   * The messages mimic the warnings React gives for these error conditions on input elements.
   * The warning will only be displayed once per component instance.
   */
  controlledUsage?: Pick<
    IWarnControlledUsageParams<P>,
    'valueProp' | 'defaultValueProp' | 'onChangeProp' | 'readOnlyProp'
  >;
}

let warningId = 0;

/**
 * Only in development mode, display console warnings when certain conditions are met.
 * Note that all warnings except `controlledUsage` will only be shown on first render
 * (new `controlledUsage` warnings may be shown later due to prop changes).
 */
export function useWarnings<P extends {}>(options: IWarningOptions<P>) {
  if (process.env.NODE_ENV !== 'production') {
    const {
      name,
      props,
      other = [],
      conditionallyRequired,
      deprecations,
      mutuallyExclusive,
      controlledUsage,
    } = options;

    /* eslint-disable react-hooks/rules-of-hooks -- build-time conditional */
    const hasWarnedRef = React.useRef(false);
    const componentId = useConst(() => `useWarnings_${warningId++}`);
    const oldProps = usePrevious(props);
    /* eslint-enable react-hooks/rules-of-hooks */

    // Warn synchronously (not in useEffect) on first render to make debugging easier.
    if (!hasWarnedRef.current) {
      hasWarnedRef.current = true;

      for (const warning of other) {
        warn(warning);
      }

      if (conditionallyRequired) {
        for (const req of conditionallyRequired) {
          warnConditionallyRequiredProps(name, props, req.requiredProps, req.conditionalPropName, req.condition);
        }
      }

      deprecations && warnDeprecations(name, props, deprecations);

      mutuallyExclusive && warnMutuallyExclusive(name, props, mutuallyExclusive);
    }

    // Controlled usage warnings may be displayed on either first or subsequent renders due to
    // prop changes. Note that it's safe to run this synchronously (not in useEffect) even in
    // concurrent mode because `warnControlledUsage` internally tracks which warnings have been
    // displayed for each component instance (so nothing will be displayed twice).
    controlledUsage && warnControlledUsage({ ...controlledUsage, componentId, props, componentName: name, oldProps });
  }
}
