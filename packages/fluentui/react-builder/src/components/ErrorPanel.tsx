import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export type ErrorPanelProps = {
  elementAccessibilityErrors: AccessibilityError[];
};

export const ErrorPanel: React.FunctionComponent<ErrorPanelProps> = ({ elementAccessibilityErrors }) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const uuid = elementAccessibilityErrors[0].elementUuid;

  const panels = React.useMemo(
    () => [
      {
        key: `accessibility-errors-${uuid}`,
        title: {
          'aria-level': 4,
          content: (
            <Text>
              <ErrorIcon style={{ marginRight: '0.5rem' }} /> {numberAccessibilityErrors} Accessibility{' '}
              {numberAccessibilityErrors > 1 ? 'Errors' : 'Error'}
            </Text>
          ),
        },
        content: (
          <ul style={{ padding: '0rem 0.7rem' }}>
            {elementAccessibilityErrors.map(error => (
              <li>{error.message}</li>
            ))}
          </ul>
        ),
      },
    ],
    [elementAccessibilityErrors, numberAccessibilityErrors, uuid],
  );

  return (
    <div
      style={{
        background: '#e3404022',
        marginTop: '1rem',
        padding: '.25rem',
        borderRadius: '.5rem',
      }}
    >
      <Accordion panels={panels} />
    </div>
  );
};
