import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuBasicExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showCallout: false
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton1'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'newItem',
                name: 'New'
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'rename',
                name: 'Rename'
              },
              {
                key: 'edit',
                name: 'Edit'
              },
              {
                key: 'properties',
                name: 'Properties'
              },
              {
                key: 'disabled',
                name: 'Disabled item',
                disabled: true
              }
            ]
          } }
        />
      </div>
    );
  }
}
