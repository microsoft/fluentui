import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import './ContextualMenuExample.scss';

export class ContextualMenuWithCustomDataAfterNameExample extends React.Component {

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
          id='ContextualMenuButton1'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'newItem',
                name: 'New Button',
                customData: <span className='applez'>Thu. 10:00 PM</span>
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
            ],
            contextualMenuItemAs: (props: IContextualMenuItemProps) => <div>{ props.item.name } { props.item.customData }</div>
          } }
        />
      </div>
    );
  }
}
