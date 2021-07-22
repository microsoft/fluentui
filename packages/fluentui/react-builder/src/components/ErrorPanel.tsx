import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Text, Accordion, List, Label } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export type ErrorPanelProps = {
  elementAccessibilityErrors: AccessibilityError[];
};

export const ErrorPanel: React.FunctionComponent<ErrorPanelProps> = ({ elementAccessibilityErrors }) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const uuid = elementAccessibilityErrors[0].elementUuid;
  const errorPanelTitle = (
    <Text>
      <ErrorIcon style={{ marginRight: '0.5rem' }} /> {numberAccessibilityErrors} Accessibility{' '}
      {numberAccessibilityErrors > 1 ? 'Errors' : 'Error'}
    </Text>
  );

  const errorPanelContent = (
    <List
      items={elementAccessibilityErrors.map(error => (
        <div>
          {error.message}
          <br style={{ display: 'block', margin: '100vh' }} />
          <Label
            style={{ marginTop: '.33vh', marginBottom: '1vh', fontSize: '.1em', color: '#606060' }}
            color={'grey'}
            content={error.source}
            fluid
          />
        </div>
      ))}
    />
  );

  const panels = [
    {
      key: `accessibility-errors-${uuid}`,
      title: {
        'aria-level': 4,
        content: errorPanelTitle,
      },
      content: errorPanelContent,
    },
  ];

  return (
    <div
      style={{
        background: '#e3404022',
        margin: '1vh',
        padding: '.15vw',
      }}
    >
      <Accordion panels={panels} />
    </div>
  );
};
