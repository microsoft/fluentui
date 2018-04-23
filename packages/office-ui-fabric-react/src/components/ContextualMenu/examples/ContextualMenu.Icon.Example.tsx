import * as React from 'react';
import { ContextualMenuItemType, IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export class ContextualMenuIconExample extends React.Component<{}, { showCallout: boolean }> {

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
                key: 'openInWord',
                name: 'Open in Word',
                onRenderIcon: (props: IContextualMenuItemProps) => {
                  return (
                    <span className={ styles.iconContainer }>
                      <Icon name={ 'WordLogoFill16' } className={ styles.logoFillIcon } />
                      <Icon name={ 'WordLogo16' } className={ styles.logoIcon } />
                    </span>
                  );
                }
              },
              {
                key: 'newItem',
                iconProps: {
                  name: 'Add'
                },
                name: 'New'
              },
              {
                key: 'upload',
                onClick: () => {
                  this.setState({ showCallout: true });
                },
                iconProps: {
                  name: 'Upload',
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
                  name: 'Share'
                },
                name: 'Share'
              },
              {
                key: 'print',
                iconProps: {
                  name: 'Print'
                },
                name: 'Print'
              },
              {
                key: 'music',
                iconProps: {
                  name: 'MusicInCollectionFill'
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
