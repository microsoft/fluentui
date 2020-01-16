import * as React from 'react';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export const ContextualMenuWithScrollBarExample: React.FunctionComponent = () => {
  return (
    <div>
      <DefaultButton
        text="Click for ContextualMenu"
        menuProps={{
          shouldFocusOnMount: true,
          directionalHint: DirectionalHint.bottomRightEdge,
          directionalHintFixed: true,
          items: [
            {
              key: 'newItem',
              text: 'New'
            },
            {
              key: 'item 2',
              text: 'Item with a very long label text'
            },
            {
              key: 'edit',
              text: 'Edit'
            },
            {
              key: 'properties',
              text: 'Properties'
            },
            {
              key: 'disabled',
              text: 'Disabled item',
              disabled: true
            }
          ],
          calloutProps: {
            calloutMaxHeight: 65
          }
        }}
      />
    </div>
  );
};
