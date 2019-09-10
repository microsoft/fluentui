import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapCallout } from 'office-ui-fabric-react/lib/Callout';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import './CalloutExample.scss';

export interface ICalloutFocusTrapExampleState {
  isCalloutVisible: boolean;
}

export class CalloutFocusTrapExample extends React.Component<{}, ICalloutFocusTrapExampleState> {
  public state: ICalloutFocusTrapExampleState = {
    isCalloutVisible: false
  };

  private _menuButtonElement: HTMLElement | null;
  // Use getId() to ensure that the callout title ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure its uniqueness.)
  private _titleId: string = getId('callout-label');

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <div className="ms-CalloutExample">
        <div className="ms-CalloutBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton onClick={this._onDismiss} text={isCalloutVisible ? 'Hide callout' : 'Show callout'} />
        </div>
        {isCalloutVisible ? (
          <div>
            <FocusTrapCallout
              role="alertdialog"
              ariaLabelledBy={this._titleId}
              className="ms-CalloutExample-callout"
              gapSpace={0}
              target={this._menuButtonElement}
              onDismiss={this._onDismiss}
              setInitialFocus={true}
            >
              <div className="ms-CalloutExample-header">
                <p className="ms-CalloutExample-title" id={this._titleId}>
                  Callout title here
                </p>
              </div>
              <div className="ms-CalloutExample-inner">
                <div className="ms-CalloutExample-content">
                  <p className="ms-CalloutExample-subText">
                    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                  </p>
                </div>
              </div>
              <CommandBar items={/* tslint:disable-line:no-use-before-declare */ items} />
            </FocusTrapCallout>
          </div>
        ) : null}
      </div>
    );
  }

  private _onDismiss = () => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  };
}

const onCommandClick = (ev: any, item?: ICommandBarItemProps) => console.log(item && item.name);
const items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    name: 'New',
    iconProps: { iconName: 'Add' },
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    subMenuProps: {
      items: [
        { key: 'emailMessage', name: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', name: 'Calendar event', iconProps: { iconName: 'Calendar' } }
      ]
    }
  },
  { key: 'upload', name: 'Upload', iconProps: { iconName: 'Upload' }, href: 'https://dev.office.com/fabric', target: '_blank' },
  { key: 'share', name: 'Share', iconProps: { iconName: 'Share' }, onClick: onCommandClick },
  { key: 'download', name: 'Download', iconProps: { iconName: 'Download' }, onClick: onCommandClick }
];
