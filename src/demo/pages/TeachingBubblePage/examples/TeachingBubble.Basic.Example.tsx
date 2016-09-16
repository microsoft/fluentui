/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  TeachingBubble,
  Button,
  Image,
  IImageProps,
  IButtonProps,
} from '../../../../index';

export interface ITeachingBubbleBaiscExampleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubbleBasicExample extends React.Component<any, ITeachingBubbleBaiscExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isTeachingBubbleVisible: false,
    };
  }

  public render() {
    let { isTeachingBubbleVisible } = this.state;
    let exampleImageProps: IImageProps = { src: 'http://placehold.it/364x140'};
    let examplePrimaryButtonProps: IButtonProps = {
      href: 'http://microsoft.com'
    };
    let exampleSecondaryButtonProps: IButtonProps = {
      href: 'http://microsoft.com'
    };

    return (
      <div className='ms-TeachingBubbleExample'>
        <span className='ms-TeachingBubbleBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onDismiss } >{ isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble' }</Button>
        </span>
        { isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              imageProps= { exampleImageProps }
              targetElement={ this._menuButtonElement }
              primaryButtonProps= { examplePrimaryButtonProps }
              secondaryButtonProps= { exampleSecondaryButtonProps }
              onDismiss={this._onDismiss}
              hasCloseIcon={ true }
              headline='this is my title'
              body='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?'
            >

            </TeachingBubble>
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss(ev: any) {
    this.setState({
      isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
    });
  }
}
