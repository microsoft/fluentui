import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion } from '@fluentui/react-northstar';

export const ErrorPanel = ({ axeErrors }) => {
  const panels = [
    {
      key: 'axe',
      title: {
        'aria-level': 4,
        content: (
          <Text>
            <ErrorIcon style={{ marginRight: '0.5rem' }} /> {axeErrors.length} Accessibility{' '}
            {axeErrors.length > 1 ? 'Errors' : 'Error'}
          </Text>
        ),
      },
      content: (
        <ul style={{ padding: '0rem 0.7rem', listStyleType: 'none' }}>
          {axeErrors.map(error => (
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
