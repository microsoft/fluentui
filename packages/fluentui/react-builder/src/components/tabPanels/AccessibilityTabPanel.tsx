import * as _ from 'lodash';
import * as React from 'react';
import { jsonTreeFindElement } from '../../config';

import { Text, Button, Accordion } from '@fluentui/react-northstar';
import { JSONTreeElement } from '../types';
import { AccessibilityError } from '../../accessibility/types';

export type AccessibilityTabPanelProps = {
  jsonTree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  accessibilityErrors?: AccessibilityError[];
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
};

export const AccessibiltyTabPanel: React.FunctionComponent<AccessibilityTabPanelProps> = ({
  jsonTree: tree,
  selectedComponent,
  accessibilityErrors,
  onSelectComponent,
}) => {
  const handleSelectComponent = React.useCallback(
    elementUuid => {
      const element = jsonTreeFindElement(tree, elementUuid);
      onSelectComponent?.(element);
      setElementDisplayName(element.displayName);
    },
    [onSelectComponent, tree],
  );

  const [elementDisplayName, setElementDisplayName] = React.useState('');
  const accessibilityErrorsByElement = _.groupBy(accessibilityErrors, error => error.elementUuid);
  console.log(accessibilityErrorsByElement, accessibilityErrors);
  return (
    <div
      style={{
        padding: '1em 0 0 1em',
        minWidth: '22.85px',
        maxWidth: '250px',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <Text size={'small'}>
          To learn more about best practices for accessibility, visit
          <a href="https://www.microsoft.com/en-us/accessibility/" target="_blank" rel="noopener noreferrer">
            {' https://www.microsoft.com/en-us/accessibility/'}
          </a>
          <br />
          <br />
        </Text>
      </div>
      {_.isEmpty(accessibilityErrors) ? (
        <Text weight={'bold'}>No accessibility errors automatically detected!</Text>
      ) : (
        // group the accesssibility errors (if they exist)
        Object.keys(accessibilityErrorsByElement).map(elementUuid => (
          <div>
            <Button
              text
              onClick={handleSelectComponent}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 4px',
                background: '#FFFF',
                ...(selectedComponent &&
                  selectedComponent.uuid === elementUuid && {
                    background: '#ffc65c',
                    color: '#444',
                  }),
                width: '120%',
              }}
            >
              {console.log(elementDisplayName)}
              {elementDisplayName}
            </Button>
            <Accordion
              panels={[
                {
                  title: {
                    'aria-level': 4,
                    content: (
                      <Text>
                        {accessibilityErrorsByElement[elementUuid].length}{' '}
                        {accessibilityErrorsByElement[elementUuid].length > 1 ? 'Errors' : 'Error'}
                      </Text>
                    ),
                  },
                  content: accessibilityErrorsByElement[elementUuid].map(error => (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '1rem',
                        lineHeight: '1.5em',
                      }}
                    >
                      {error.error}
                      <br />
                      <Text size="smaller" weight="light">
                        {`Severity: ${error.severity}`}
                      </Text>
                      <Text size="smaller" weight="light">
                        {`Source: ${error.source}`}
                      </Text>
                    </div>
                  )),
                },
              ]}
            />
          </div>
        ))
      )}
    </div>
  );
};
