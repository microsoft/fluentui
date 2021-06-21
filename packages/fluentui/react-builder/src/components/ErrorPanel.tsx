import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion } from '@fluentui/react-northstar';

export const ErrorPanel = ({ elementUuid, accessibilityErrors }) => {
  const panels = [
    {
      key: `accessibility-errors-${elementUuid}`,
      title: {
        'aria-level': 4,
        content: (
          <Text>
            <ErrorIcon style={{ marginRight: '0.5rem' }} /> {accessibilityErrors.length} Accessibility{' '}
            {accessibilityErrors.length > 1 ? 'Errors' : 'Error'}
          </Text>
        ),
      },
      content: (
        <ul style={{ padding: '0rem 0.7rem', listStyleType: 'none' }}>
          {accessibilityErrors.map(error => (
            <li>{error}</li>
          ))}
        </ul>
      ),
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
