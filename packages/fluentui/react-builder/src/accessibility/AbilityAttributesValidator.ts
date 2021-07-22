import * as React from 'react';
import { DevEnv } from 'ability-attributes';
import { AccessibilityError } from './types';

export type AbilityAttributesValidatorProps = {
  onErrorsChanged: (errors: AccessibilityError[]) => void;
};

const getBuilderId = el => {
  return el ? el.getAttribute('data-builder-id') ?? getBuilderId(el.parentElement) : undefined;
};

let _lastId = 0;

export const AbilityAttributesValidator: React.FunctionComponent<AbilityAttributesValidatorProps> = ({
  onErrorsChanged,
}) => {
  const attributeNameErrorId = DevEnv.ATTRIBUTE_NAME_ERROR_ID;
  const window = document.getElementsByTagName('iframe')[0].ownerDocument.defaultView;

  const [errors, setErrors] = React.useState<AccessibilityError[]>();
  React.useMemo(() => {
    DevEnv.setup({
      enforceClasses: false,
      ignoreUnknownClasses: true,
      window,
    });
    const errorReporter: DevEnv.ErrorReporter = {
      dismiss(element: HTMLElement) {
        console.log('dismiss - WHAT?!');
      },
      remove(element: HTMLElement) {
        console.log('remove', element);
        const [builderId, errorId] = (element.getAttribute(attributeNameErrorId) ?? '').split(':');
        element.removeAttribute(attributeNameErrorId);
        if (builderId && errorId) {
          console.log(builderId, errorId);
        }
        /* setErrors(({ [builderId]: { [`${builderId}:${errorId}`]: __, ...errorsForBuilderId }, ...errors }) => ({
          ...errors,
          ...(!_.isEmpty(errorsForBuilderId) && { [builderId]: errorsForBuilderId }),
        }));
         } */
      },
      report(element: HTMLElement, error: any /* AbilityAttributesError */) {
        console.log('report', element, error);
        const builderId = getBuilderId(element);

        const errorId = element.getAttribute(attributeNameErrorId) ?? `${builderId}:${++_lastId}`;
        element.setAttribute(attributeNameErrorId, errorId);

        setErrors(errors => ({ ...errors, [builderId]: { ...errors?.[builderId], [errorId]: error.message } }));
      },
      toggle() {
        console.log('toggle - WHAT?!');
      },
    };
    return errorReporter;
  }, [window, attributeNameErrorId]);

  React.useMemo(() => {
    console.log('AbilityAttributesValidator - errors changed', errors);
    onErrorsChanged(errors);
  }, [errors, onErrorsChanged]);

  return null;
};
