import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export const ErrorPanel = (elementUuid, elementAccessibilityErrors: AccessibilityError[]) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const panels = [
    {
      key: `accessibility-errors-${elementUuid}`,
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
        <ul style={{ padding: '0rem 0.7rem', listStyleType: 'none' }}>
          {elementAccessibilityErrors.map(error => (
            <li key="{error}">{error}</li>
          ))}
        </ul>
      ),
    },
  ];
  console.log('access', elementAccessibilityErrors);

  return (
    <div
      style={{
        background: '#e3404022',
      }}
    >
      <Accordion panels={panels} />
    </div>
  );
};
