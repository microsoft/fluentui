import { TeachingBubble } from './index';
import { DefaultButton, IButtonProps } from '../Button/index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class TeachingBubbleVPage extends React.Component<any, any> {

  public constructor() {
    super();

    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isTeachingBubbleVisible: false,
    };
  }

  public render() {
    let { isTeachingBubbleVisible } = this.state;
    let testPrimaryButton: IButtonProps = {
      children: 'Try it out'
    };
    let testSecondaryButtonProps: IButtonProps = {
      children: 'May be later',
      onClick: this._onDismiss
    };
    return <div>
      <DefaultButton
        className='TeachingBubble'
        onClick={ this._onDismiss }
        text={ isTeachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble' }
      />
      { isTeachingBubbleVisible ?
        <div> <TeachingBubble
          primaryButtonProps={ testPrimaryButton }
          secondaryButtonProps={ testSecondaryButtonProps }
          onDismiss={ this._onDismiss }
          headline='Discover what’s trending around you'
        /> This is teaching bubble</div>
        : null }
    </div>;
  }

  private _onDismiss(ev: any) {
    this.setState({
      isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
    });
  }
}