import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';
import * as _ from 'lodash';

export const ErrorPanel = (elementUuid, elementAccessibilityErrors: AccessibilityError[]) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;

  console.log('access', elementAccessibilityErrors);
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
      content: <ul style={{ padding: '0rem 0.7rem', listStyleType: 'none' }}>{_.keys(elementAccessibilityErrors)}</ul>,
    },
  ];

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
