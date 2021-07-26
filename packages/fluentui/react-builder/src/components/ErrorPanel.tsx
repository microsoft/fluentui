import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Accordion, List, Label, Header } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export type ErrorPanelProps = {
  elementAccessibilityErrors: AccessibilityError[];
};

export const ErrorPanel: React.FunctionComponent<ErrorPanelProps> = ({ elementAccessibilityErrors }) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const uuid = elementAccessibilityErrors[0].elementUuid;
  const errorPanelTitle = (
    <Header style={{ fontWeight: 'lighter' }} as="h4">
      <ErrorIcon style={{ marginRight: '0.5rem' }} /> {numberAccessibilityErrors} Accessibility{' '}
      {numberAccessibilityErrors > 1 ? 'Errors' : 'Error'}
    </Header>
  );

  const errorPanelContent = (
    <List
      styles={{ listStyleType: 'upper-roman' }}
      items={elementAccessibilityErrors.map(error => (
        <div style={{ display: 'list-item', listStyle: 'outside' }}>
          {error.message}
          <br style={{ display: 'block', margin: '100vh' }} />
          <Label
            style={{ marginTop: '.33vh', marginBottom: '1vh', fontSize: '.25em', color: '#606060' }}
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
