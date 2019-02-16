import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuWithCustomMenuItemExample extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          text="Click for ContextualMenu"
          menuProps={{
            shouldFocusOnMount: true,
            items: [
              {
                key: 'newItem',
                text: 'New'
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'rename',
                text: 'Rename'
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
            contextualMenuItemAs: (props: IContextualMenuItemProps) => <div>Custom rendered {props.item.text}</div>
          }}
        />
      </div>
    );
  }
}
