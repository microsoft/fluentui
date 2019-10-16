import * as React from 'react';

import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

export interface ITeachingBubbleWideIllustrationExampleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubbleWideIllustrationExample extends React.Component<{}, ITeachingBubbleWideIllustrationExampleState> {
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
    const exampleImageProps: IImageProps = { src: 'http://placehold.it/154x220', alt: 'Example placeholder image' };
    const examplePrimaryButton: IButtonProps = {
      children: 'Try it out'
    };
    const exampleSecondaryButtonProps: IButtonProps = {
      children: 'Maybe later',
      onClick: this._onDismiss
    };

    return (
      <div className="ms-TeachingBubbleExample">
        <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
          <DefaultButton
            onClick={isTeachingBubbleVisible ? this._onDismiss : this._onShow}
            text={isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
          />
        </span>
        {isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              illustrationImage={exampleImageProps}
              calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
              isWide={true}
              hasSmallHeadline={true}
              hasCloseIcon={true}
              closeButtonAriaLabel="Close"
              target={this._menuButtonElement}
              primaryButtonProps={examplePrimaryButton}
              secondaryButtonProps={exampleSecondaryButtonProps}
              onDismiss={this._onDismiss}
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
