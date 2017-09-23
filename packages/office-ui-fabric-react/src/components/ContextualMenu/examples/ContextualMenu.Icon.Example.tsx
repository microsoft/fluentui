import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuIconExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showCallout: false
    };
  }

  public render() {
    let { showCallout } = this.state;

    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton2'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'newItem',
                iconProps: {
                  iconName: 'Add'
                },
                name: 'New'
              },
              {
                key: 'upload',
                onClick: () => {
                  this.setState({ showCallout: true });
                },
                iconProps: {
                  iconName: 'Upload',
                  style: {
                    color: 'salmon'
                  }
                },
                name: 'Upload (Click for popup)',
                title: 'Upload a file'
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'share',
                iconProps: {
                  iconName: 'Share'
                },
                name: 'Share'
              },
              {
                key: 'print',
                iconProps: {
                  iconName: 'Print'
                },
                name: 'Print'
              },
              {
                key: 'music',
                iconProps: {
                  iconName: 'MusicInCollectionFill'
                },
                name: 'Music',
              }
            ]
          }
          }
        />
        { showCallout && (
          <Callout
            setInitialFocus={ true }
            onDismiss={ () => this.setState({ showCallout: false }) }
          >
            <DefaultButton
              onClick={ () => this.setState({ showCallout: false }) }
              text='Hello Popup'
            />
          </Callout>
        ) }
      </div>
    );
  }
}
