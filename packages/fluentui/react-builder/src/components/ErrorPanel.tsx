import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-northstar';
import { Accordion, List, Label } from '@fluentui/react-northstar';
import { AccessibilityError } from '../accessibility/types';

export type ErrorPanelProps = {
  elementAccessibilityErrors: AccessibilityError[];
};

export const ErrorPanel: React.FunctionComponent<ErrorPanelProps> = ({ elementAccessibilityErrors }) => {
  const numberAccessibilityErrors = elementAccessibilityErrors.length;
  const uuid = elementAccessibilityErrors[0].elementUuid;

  const panels = React.useMemo(() => {
    const errorPanelTitle = (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', padding: '2px', marginLeft: '.05em' }}>
        <ErrorIcon size="medium" style={{ marginRight: '0.5rem', alignSelf: 'center' }} />
        {numberAccessibilityErrors} Accessibility {numberAccessibilityErrors > 1 ? 'Errors' : 'Error'}
      </div>
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
    return [
      {
        key: `accessibility-errors-${uuid}`,
        title: {
          'aria-level': 4,
          content: errorPanelTitle,
        },
        content: errorPanelContent,
      },
    ];
  }, [elementAccessibilityErrors, numberAccessibilityErrors, uuid]);

  return (
    <div
      style={{
        background: '#e3404022',
        marginTop: '1vh',
        padding: '.15em',
        borderRadius: '.5em',
      }}
    >
      <Accordion panels={panels} />
    </div>
  );
};
