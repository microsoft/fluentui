/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/* eslint-disable */

import * as Constraints from 'ability-attributes-js-constraints';

import {
  AbilityAttributesError,
  AssumptionSpecificity,
  AttributeSchemaClass,
  DevEnv,
  DevEnvSettings,
  JSConstraints,
  WindowWithClassMap,
  WindowWithDevEnv,
} from './DevEnvTypes';
import { ErrorReporter } from './ErrorReporter';
import { AmbiguousAssumptionError } from './Errors';
import { HTMLElementAttributes } from './HTML';
import { setup as setupValidator } from './Validator';

export * from './DevEnvTypes';

export function setup(settings?: DevEnvSettings): void {
  if (!__DEV__) {
    return;
  }

  const w = ((settings && settings.window) || (typeof window !== 'undefined' ? window : undefined)) as WindowWithDevEnv;

  if (!w) {
    return;
  }

  if (!w.__abilityAttributesDev) {
    w.__abilityAttributesDev = {
      error: settings?.errorReporter ?? new ErrorReporter(w),
      jsConstraints: {},
    };

    const enforceClasses = (settings && settings.enforceClasses) !== false;
    const ignoreUnknownClasses = !!(settings && settings.ignoreUnknownClasses);

    setupValidator(
      w,
      w.__abilityAttributesDev.error,
      getClassByName,
      w.__abilityAttributesDev.jsConstraints,
      enforceClasses,
      assumeClass,
      ignoreUnknownClasses,
    );

    Object.keys(Constraints).forEach(name => {
      const c = (Constraints as JSConstraints)[name];

      if (typeof c === 'function' && typeof c.schemaName === 'string') {
        addConstraint(c);
      }
    });
  }
}

export function addClass(name: string, Class: AttributeSchemaClass) {
  if (__DEV__ && typeof window !== 'undefined') {
    const win = window as WindowWithClassMap;

    if (!win.__abilityAttributesDevClassMap) {
      win.__abilityAttributesDevClassMap = {};
    }

    if (win.__abilityAttributesDevClassMap[name]) {
      console.error(`Duplicate class '${name}'`);
    } else {
      win.__abilityAttributesDevClassMap[name] = Class;
    }
  }
}

export function getClassByName(name: string): AttributeSchemaClass | undefined {
  if (__DEV__ && typeof window !== 'undefined') {
    const win = window as WindowWithClassMap;

    return win.__abilityAttributesDevClassMap ? win.__abilityAttributesDevClassMap[name] : undefined;
  }

  return undefined;
}

export function addConstraint(func: Constraints.JSConstraintFunction): void {
  if (__DEV__ && typeof window !== 'undefined') {
    const env = getDevEnv(window);

    if (env) {
      if (typeof func === 'function' && typeof func.schemaName === 'string') {
        env.jsConstraints[func.schemaName] = func;
      } else {
        console.error(`Invalid constraint function`);
      }
    } else {
      console.error(`Cannot add ability attributes constraint, before DevEnv.setup() is called`);
    }
  }
}

interface AssumedClass {
  Class: AttributeSchemaClass;
  specificity: AssumptionSpecificity;
}

export function assumeClass(
  tagName: string,
  attributes: HTMLElementAttributes,
  element: HTMLElement,
): AttributeSchemaClass | undefined {
  if (__DEV__ && typeof window !== 'undefined') {
    const win = window as WindowWithClassMap;
    const classes = win.__abilityAttributesDevClassMap;

    if (classes) {
      const assumed: AssumedClass[] = [];

      for (let name of Object.keys(classes)) {
        const Class = classes[name];

        if (Class.assume) {
          const specificity = Class.assume(tagName, attributes);

          if (specificity) {
            assumed.push({ Class, specificity });
          }
        }
      }

      if (assumed.length === 0) {
        return undefined;
      }

      let hasEqualAssumptions: [AssumedClass, AssumedClass] | undefined;

      if (assumed.length > 1) {
        assumed.sort((a, b) => {
          if (a.specificity.tag !== b.specificity.tag) {
            return a.specificity.tag ? -1 : 1;
          }

          if (a.specificity.attributes !== b.specificity.attributes) {
            return a.specificity.attributes < b.specificity.attributes ? -1 : 1;
          }

          hasEqualAssumptions = [a, b];

          return 0;
        });
      }

      if (hasEqualAssumptions) {
        reportError(
          new AmbiguousAssumptionError(hasEqualAssumptions[0].Class.className, hasEqualAssumptions[1].Class.className),
          element,
        );

        return undefined;
      }

      return assumed[0].Class;
    }
  }

  return undefined;
}

function getDevEnv(win: Window): DevEnv | undefined {
  return (win as WindowWithDevEnv).__abilityAttributesDev;
}

function reportError(error: AbilityAttributesError, element: HTMLElement, win?: Window): void {
  const w = win || (typeof window !== 'undefined' ? window : undefined);

  if (!w) {
    return;
  }

  const env = getDevEnv(w);

  if (env) {
    env.error.report(element, error);
  }
}
