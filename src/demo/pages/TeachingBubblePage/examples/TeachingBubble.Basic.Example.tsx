/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  TeachingBubble,
  TeachingBubbleTypes,
  Button
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

    return (
      <div className='ms-TeachingBubbleExample'>
        <div className='ms-TeachingBubbleBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onDismiss } >{ isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble' }</Button>
        </div>
        { isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              targetElement={ this._menuButtonElement }
              teachingBubbleType= {TeachingBubbleTypes.reversed}
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
