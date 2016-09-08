import * as React from 'react';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';

import './TeachingBubble.scss';

export interface ITeachingBubbleState {
  isChecked: boolean;
}

export class TeachingBubble extends React.Component<ITeachingBubbleProps, ITeachingBubbleState> {

  // State Any Initial Prop Values
  public static initialProps = {
  };

  // Specify any private variables
  private _id: string;

  // Constructor
  constructor(props: ITeachingBubbleProps) {
    super();

    this._id = getId('TeachingBubble');
  }

  public render() {
    let { title } = this.props;

    return (
      <div className={
        css('ms-TeachingBubble')
      }>
        <h1 className='ms-TeachingBubble--title'>
          { title }
        </h1>
      </div>
    );
  }

}
