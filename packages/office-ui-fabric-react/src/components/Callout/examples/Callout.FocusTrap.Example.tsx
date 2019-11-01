import * as React from 'react';
<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx
import { DefaultButton, FocusTrapCallout, Stack, getId, FocusZone, PrimaryButton } from 'office-ui-fabric-react';
import './CalloutExample.scss';
=======
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { getId, classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { calloutExampleStyle, ICalloutExampleStyle } from './Callout.Examples.Styles';
>>>>>>> Updated Nested Example as well:packages/office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx

export interface ICalloutFocusTrapExampleState {
  isCalloutVisible: boolean;
}

<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx
export class CalloutFocusTrapExample extends React.Component<{}, ICalloutFocusTrapExampleState> {
  public state: ICalloutFocusTrapExampleState = {
=======
const getClassNames = classNamesFunction<{}, ICalloutExampleStyle>();
const classNames = getClassNames(calloutExampleStyle, {});

export class CalloutNestedExample extends React.Component<ICalloutNestedExampleProps, ICalloutNestedExampleState> {
  public state: ICalloutNestedExampleState = {
>>>>>>> Updated Nested Example as well:packages/office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx
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
        <div className={css(classNames.msCalloutBasicExamplebButtonArea)} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton onClick={this._onDismiss} text={isCalloutVisible ? 'Hide callout' : 'Show callout'} />
        </div>
        {isCalloutVisible ? (
          <div>
            <FocusTrapCallout
              role="alertdialog"
              ariaLabelledBy={this._titleId}
              className={css(classNames.msCalloutExampleCallout)}
              gapSpace={0}
              target={this._menuButtonElement}
              onDismiss={this._onDismiss}
              setInitialFocus={true}
            >
              <div className={css(classNames.msCalloutExampleHeader)}>
                <p className={css(classNames.msCalloutExampleTitle)} id={this._titleId}>
                  Callout title here
                </p>
              </div>
              <div className={css(classNames.msCalloutExampleInner)}>
                <div className="ms-CalloutExample-content">
                  <p className={css(classNames.msCalloutExampleSubText)}>
                    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                  </p>
                </div>
              </div>
              <FocusZone>
                <Stack className="ms-CalloutExample-buttons" gap={8} horizontal>
                  <PrimaryButton onClick={this._onDismiss}>Agree</PrimaryButton>
                  <DefaultButton onClick={this._onDismiss}>Cancel</DefaultButton>
                </Stack>
              </FocusZone>
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
