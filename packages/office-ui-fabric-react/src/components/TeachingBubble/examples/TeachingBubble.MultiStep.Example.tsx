import * as React from 'react';

import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';

export interface ITeachingBubbleMultiStepExampleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubbleMultiStepExample extends React.Component<{}, ITeachingBubbleMultiStepExampleState> {
  private _menuButtonElement: HTMLElement;

  constructor(props: {}) {
    super(props);

    this._onDismiss = this._onDismiss.bind(this);
    this._onShow = this._onShow.bind(this);

    this.state = {
      isTeachingBubbleVisible: false
    };
  }

  public render(): JSX.Element {
    const { isTeachingBubbleVisible } = this.state;
    const exampleSecondaryButtonProps: IButtonProps = {
      children: 'Previous',
      onClick: this._onDismiss
    };
    const examplePrimaryButton: IButtonProps = {
      children: 'Next'
    };

    return (
      <div className="ms-TeachingBubbleExample">
        <span className="ms-TeachingBubbleMultiStepExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
          <DefaultButton
            onClick={isTeachingBubbleVisible ? this._onDismiss : this._onShow}
            text={isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
          />
        </span>
        {isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              target={this._menuButtonElement}
              secondaryButtonProps={exampleSecondaryButtonProps}
              primaryButtonProps={examplePrimaryButton}
              onDismiss={this._onDismiss}
              footerContent="2 of 3"
              headline="Discover what’s trending around you"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
            </TeachingBubble>
          </div>
        ) : null}
      </div>
    );
  }

  private _onDismiss(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: false
    });
  }

  private _onShow(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: true
    });
  }
}
