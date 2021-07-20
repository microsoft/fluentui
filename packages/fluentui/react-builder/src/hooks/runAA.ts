import * as React from 'react';
import * as _ from 'lodash';
import { ATTRIBUTE_NAME_ERROR_ID } from 'ability-attributes/dist/DevEnvTypes';
import { setup } from 'ability-attributes/dist/DevEnv';
import { AccessibilityError } from '../accessibility/types';

export type AbilityAttributesValidatorProps = {
  window: Window;
  onErrorsChanged: (errors: AccessibilityError[]) => void;
};

const getBuilderId = el => {
  return el ? el.getAttribute('data-builder-id') ?? getBuilderId(el.parentElement) : undefined;
};

let _lastId = 0;

export const AbilityAttributesValidator: React.FunctionComponent<AbilityAttributesValidatorProps> = ({
  window,
  onErrorsChanged,
}) => {
  // const [errors, setErrors] = React.useState<AccessibilityError>();
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
          // console.log('remove', element);
          const [builderId, errorId] = (element.getAttribute(ATTRIBUTE_NAME_ERROR_ID) ?? '').split(':');
          element.removeAttribute(ATTRIBUTE_NAME_ERROR_ID);
          // if (builderId && errorId) {
          // setErrors(({ [builderId]: { [`${builderId}:${errorId}`]: __, ...errorsForBuilderId }, ...errors }) => ({
          //  ...errors,
          //  ...(!_.isEmpty(errorsForBuilderId) && { [builderId]: errorsForBuilderId }),
          // }));
          // }
        },
        report(element: HTMLElement, error: any /* AbilityAttributesError */) {
          console.log('report', element, error);
          const builderId = getBuilderId(element);

          const errorId = element.getAttribute(ATTRIBUTE_NAME_ERROR_ID) ?? `${builderId}:${++_lastId}`;
          element.setAttribute(ATTRIBUTE_NAME_ERROR_ID, errorId);

          // setErrors(errors => ({ ...errors, [builderId]: { ...errors?.[builderId], [errorId]: error.message } }));
        },
        toggle() {
          console.log('toggle - WHAT?!');
        },
      },
    });
  }, [window]);

  React.useMemo(() => {
    console.log('AbilityAttributesValidator - errors changed', errors);
    onErrorsChanged(errors);
  }, [errors, onErrorsChanged]);

  return null;
};
