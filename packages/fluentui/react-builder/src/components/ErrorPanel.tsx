import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion, List } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export type ErrorPanelProps = {
  elementAccessibilityErrors: AccessibilityError[];
};

export const ErrorPanel: React.FunctionComponent<ErrorPanelProps> = ({ elementAccessibilityErrors }) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const uuid = elementAccessibilityErrors[0].elementUuid;

  const panels = [
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
      content: <List style={{ marginBottom: '1rem' }} items={elementAccessibilityErrors.map(error => error.error)} />,
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
