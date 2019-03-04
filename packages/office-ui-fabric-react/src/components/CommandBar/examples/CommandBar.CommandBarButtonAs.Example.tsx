import * as React from 'react';

import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Coachmark } from 'office-ui-fabric-react/lib/Coachmark';
import { BaseComponent, IComponentAsProps, IComponentAs } from 'office-ui-fabric-react/lib/Utilities';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';

export interface IIndividualCommandBarButtonAsExampleProps {
  onDismissCoachmark: () => void;

  isCoachmarkVisible: boolean;
}

export interface IIndividualCommandBarButtonAsExampleWrapperState {
  isCoachmarkVisible: boolean;
}

interface ICoachmarkCommandBarButtonProps extends IComponentAsProps<ICommandBarItemProps> {
  onDismiss: () => void;

  isCoachmarkVisible?: boolean;
}

class CoachmarkCommandBarButton extends BaseComponent<ICoachmarkCommandBarButtonProps> {
  private _targetButton = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { defaultRender: DefaultRender = CommandBarButton, isCoachmarkVisible, onDismiss, ...buttonProps } = this.props;

    return (
      <>
        <div ref={this._targetButton}>
          <DefaultRender {...buttonProps} />
        </div>
        {isCoachmarkVisible && (
          <Coachmark
            target={this._targetButton.current}
            positioningContainerProps={{
              directionalHint: DirectionalHint.bottomCenter
            }}
            ariaAlertText="A Coachmark has appeared"
            ariaDescribedBy={'coachmark-desc1'}
            ariaLabelledBy={'coachmark-label1'}
            ariaLabelledByText={'Coachmark notification'}
          >
            <TeachingBubbleContent
              headline="Example Title"
              hasCloseIcon={true}
              closeButtonAriaLabel="Close"
              onDismiss={onDismiss}
              ariaDescribedBy={'example-description1'}
              ariaLabelledBy={'example-label1'}
            >
              Welcome to the land of Coachmarks!
            </TeachingBubbleContent>
          </Coachmark>
        )}
      </>
    );
  }
}

export class IndividualCommandBarButtonAsExample extends React.Component<IIndividualCommandBarButtonAsExampleProps> {
  public render(): JSX.Element {
    return (
      <CommandBar
        overflowButtonProps={{
          ariaLabel: 'More commands',
          menuProps: {
            items: [], // Items must be passed for typesafety, but commandBar will determine items rendered in overflow
            isBeakVisible: true,
            beakWidth: 20,
            gapSpace: 10,
            directionalHint: DirectionalHint.topCenter
          }
        }}
        items={this._getItems()}
        overflowItems={this.getOverlflowItems()}
        farItems={this.getFarItems()}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
    );
  }

  // Data for CommandBar
  private _getItems = (): ICommandBarItemProps[] => {
    const { onDismissCoachmark, isCoachmarkVisible } = this.props;
    const customCommandBarButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
      return <CoachmarkCommandBarButton {...props} isCoachmarkVisible={isCoachmarkVisible} onDismiss={onDismissCoachmark} />;
    };

    return [
      {
        key: 'newItem',
        name: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New',
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              iconProps: {
                iconName: 'Mail'
              },
              ['data-automation-id']: 'newEmailButton'
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              iconProps: {
                iconName: 'Calendar'
              }
            }
          ]
        }
      },
      {
        key: 'upload',
        name: 'Upload',
        iconProps: {
          iconName: 'Upload'
        },
        href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton'
      },
      {
        key: 'share',
        name: 'Share',
        iconProps: {
          iconName: 'Share'
        },
        commandBarButtonAs: customCommandBarButton,
        onClick: () => console.log('Share')
      },
      {
        key: 'download',
        name: 'Download',
        iconProps: {
          iconName: 'Download'
        },
        onClick: () => console.log('Download')
      }
    ];
  };

  private getOverlflowItems = () => {
    return [
      {
        key: 'move',
        name: 'Move to...',
        onClick: () => console.log('Move to'),
        iconProps: {
          iconName: 'MoveToFolder'
        }
      },
      {
        key: 'copy',
        name: 'Copy to...',
        onClick: () => console.log('Copy to'),
        iconProps: {
          iconName: 'Copy'
        }
      },
      {
        key: 'rename',
        name: 'Rename...',
        onClick: () => console.log('Rename'),
        iconProps: {
          iconName: 'Edit'
        }
      }
    ];
  };

  private getFarItems = () => {
    return [
      {
        key: 'sort',
        name: 'Sort',
        ariaLabel: 'Sort',
        iconProps: {
          iconName: 'SortLines'
        },
        onClick: () => console.log('Sort')
      },
      {
        key: 'tile',
        name: 'Grid view',
        ariaLabel: 'Grid view',
        iconProps: {
          iconName: 'Tiles'
        },
        iconOnly: true,
        onClick: () => console.log('Tiles')
      },
      {
        key: 'info',
        name: 'Info',
        ariaLabel: 'Info',
        iconProps: {
          iconName: 'Info'
        },
        iconOnly: true,
        onClick: () => console.log('Info')
      }
    ];
  };
}

export class IndividualCommandBarButtonAsExampleWrapper extends React.Component<{}, IIndividualCommandBarButtonAsExampleWrapperState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      isCoachmarkVisible: true
    };
  }

  public render(): JSX.Element {
    const { isCoachmarkVisible } = this.state;

    return <IndividualCommandBarButtonAsExample onDismissCoachmark={this._onDismissCoachmark} isCoachmarkVisible={isCoachmarkVisible} />;
  }

  private _onDismissCoachmark = (): void => {
    this.setState({
      isCoachmarkVisible: false
    });
  };
}
