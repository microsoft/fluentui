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
                iconName: 'Open in Word',
                onRenderIcon: (props: IContextualMenuItemProps) => {
                  return (
                    <span className={ styles.iconContainer }>
                      <Icon iconName={ 'WordLogoFill16' } className={ styles.logoFillIcon } />
                      <Icon iconName={ 'WordLogo16' } className={ styles.logoIcon } />
                    </span>
                  );
                }
              },
              {
                key: 'newItem',
                iconProps: {
                  iconName: 'Add'
                },
                iconName: 'New'
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
                iconName: 'Upload (Click for popup)',
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
                iconName: 'Share'
              },
              {
                key: 'print',
                iconProps: {
                  iconName: 'Print'
                },
                iconName: 'Print'
              },
              {
                key: 'music',
                iconProps: {
                  iconName: 'MusicInCollectionFill'
                },
                iconName: 'Music',
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
