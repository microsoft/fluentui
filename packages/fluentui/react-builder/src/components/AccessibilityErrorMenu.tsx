import * as _ from 'lodash';
import * as React from 'react';
import { jsonTreeFindElement } from '../config';

import { Text, Button, List } from '@fluentui/react-northstar';
import { JSONTreeElement } from './types';
import { AccessibilityError } from '../accessibility/types';

export type AccessibilityErrorMenuProps = {
  tree: JSONTreeElement;
  selectedComponent?: JSONTreeElement;
  accessibilityErrors?: AccessibilityError[];
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
};

export const AccessibilityErrorMenu: React.FunctionComponent<AccessibilityErrorMenuProps> = ({
  tree,
  selectedComponent,
  accessibilityErrors,
  onSelectComponent,
}) => {
  const handleSelectComponent = React.useCallback(
    elementUuid => {
      onSelectComponent?.(jsonTreeFindElement(tree, elementUuid));
    },
    [onSelectComponent, tree],
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1em 0 0 1em',
        maxWidth: '5em',
        flexWrap: 'wrap',
      }}
    >
      <Text size={'small'}>
        To learn more about best practices for accessibility, visit
        <a href="https://www.microsoft.com/en-us/accessibility/" target="_blank" rel="noopener noreferrer">
          {' https://www.microsoft.com/en-us/accessibility/'}
        </a>
        <br />
        <br />
      </Text>
      {_.isEmpty(accessibilityErrors) ? (
        <Text weight={'bold'}>No accessibility errors automatically detected.</Text>
      ) : (
        // group the accesssibility errors (if they exist)
        // const groupedAccessibilityErrors = _.groupBy(accessibilityErrors, error => error.severity);
        Object.keys(_.groupBy(accessibilityErrors, error => error.elementUuid)).map(elementUuid => (
          <div>
            <Button text onClick={handleSelectComponent}>
              {jsonTreeFindElement(tree, elementUuid).displayName}
            </Button>
            {_.groupBy(accessibilityErrors, error => error.elementUuid)[elementUuid].map(error => (
              <List items={[error.error, `Severity: ${error.severity}`, `Source: ${error.source}`]} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};
