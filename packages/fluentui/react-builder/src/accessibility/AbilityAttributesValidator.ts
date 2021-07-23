import * as React from 'react';

import { setup } from '../ability-attributes/DevEnv';
import { AccessibilityError } from './types';

export type AccessibilityErrors = Record<string, Record<string, string>>;

export type AbilityAttributesValidatorProps = {
  window: Window;
  onErrorsChanged: (errors: AccessibilityError[]) => void;
};

const getBuilderId = el => {
  return el ? el.getAttribute('data-builder-id') ?? getBuilderId(el.parentElement) : undefined;
};

export const AbilityAttributesValidator: React.FunctionComponent<AbilityAttributesValidatorProps> = ({
  window,
  onErrorsChanged,
}) => {
  const [errors, setErrors] = React.useState({});

  React.useMemo(() => {
    setup({
      enforceClasses: false,
      ignoreUnknownClasses: true,
      window,
      errorReporter: {
        dismiss(element: HTMLElement) {
          console.log('dismiss - WHAT?!');
        },
        remove(element: HTMLElement) {
          console.log('remove', element);
        },
        report(element: HTMLElement, error: any /* AbilityAttributesError */) {
          setErrors(errors => ({ ...errors, [getBuilderId(element)]: error.message }));
        },
        toggle() {
          console.log('toggle - WHAT?!');
        },
      },
    });
  }, [window]);

  React.useMemo(() => {
    console.log('AbilityAttributesValidator - errors changed', errors);
    onErrorsChanged(
      Object.entries(errors).map(
        e =>
          ({
            elementUuid: e[0],
            source: 'AA',
            message: e[1],
          } as AccessibilityError),
      ),
    );
  }, [errors, onErrorsChanged]);

  return null;
};
