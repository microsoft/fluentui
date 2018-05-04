import * as React from 'react';
import { ContextualMenuItemType, IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export class ContextualMenuIconSecondaryTextExample extends React.Component<{}, { showCallout: boolean }> {

  constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: false
    };
  }

  public render(): JSX.Element {
    const { showCallout } = this.state;

    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton2'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'Later Today',
                iconProps: {
                  iconName: 'Clock'
                },
                name: 'Later Today',
                secondaryText: '7:00 PM'
              },
              {
                key: 'Tomorrow',
                iconProps: {
                  iconName: 'Coffeescript'
                },
                name: 'Tomorrow',
                secondaryText: 'Thu. 8:00 AM'
              },
              {
                key: 'This Weekend',
                iconProps: {
                  iconName: 'Vacation'
                },
                name: 'This Weekend',
                secondaryText: 'Sat. 10:00 AM'
              },
              {
                key: 'Next Week',
                iconProps: {
                  iconName: 'Suitcase'
                },
                name: 'Next Week',
                secondaryText: 'Mon. 8:00 AM'
              },
            ]
          }
          }
        />
        { showCallout && (
          <Callout
            setInitialFocus={ true }
            // tslint:disable-next-line:jsx-no-lambda
            onDismiss={ () => this.setState({ showCallout: false }) }
          >
            <DefaultButton
              // tslint:disable-next-line:jsx-no-lambda
              onClick={ () => this.setState({ showCallout: false }) }
              text='Hello Popup'
            />
          </Callout>
        ) }
      </div>
    );
  }
}
