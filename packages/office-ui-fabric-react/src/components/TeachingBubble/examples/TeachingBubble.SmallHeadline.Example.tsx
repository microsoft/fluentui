import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';

export interface ITeachingBubbleSmallHeadlineExampleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubbleSmallHeadlineExample extends React.Component<{}, ITeachingBubbleSmallHeadlineExampleState> {
  private _menuButtonElement: HTMLElement;

  constructor(props: {}) {
    super(props);

    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isTeachingBubbleVisible: false,
    };
  }

  public render(): JSX.Element {
    const { isTeachingBubbleVisible } = this.state;
    const examplePrimaryButton: IButtonProps = {
      children: 'Try it out',
    };

    return (
      <div className='ms-TeachingBubbleExample'>
        <span className='ms-TeachingBubbleBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton! }>
          <DefaultButton
            onClick={ this._onDismiss }
            text={ isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble' }
          />
        </span>
        { isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              targetElement={ this._menuButtonElement }
              hasSmallHeadline={ true }
              onDismiss={ this._onDismiss }
              hasCloseIcon={ true }
              primaryButtonProps={ examplePrimaryButton }
              headline='Discover what’s trending around you'
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?
            </TeachingBubble>
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
    });
  }
}
