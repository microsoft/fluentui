import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';

export interface IBeakState { }

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  constructor(props: IBeakProps) {
    super(props);
  }

  public componentDidMount(): void {
    // Determine where the target is
    if (this.props.target && this.props.targetBeakContainer) {
      let targetRect: ClientRect = this.props.target.getBoundingClientRect();
      let containerRect: ClientRect = this.props.targetBeakContainer.getBoundingClientRect();

      if (targetRect.right < containerRect.left) {
        console.log("left aligned");
        // Aligned left
      } else if (targetRect.right > containerRect.left) {
        // Aligned right
        console.log("right aligned");
      } else if (targetRect.top > containerRect.bottom) {
        console.log("top aligned");
        // Aligned top
      } else if (targetRect.bottom < containerRect.top) {
        console.log("bottom aligned");
        // Aligned bottom
      }
    }
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles);
    const {
      beakHeight = 18,
      beakWidth = 18
    } = this.props;

    const pointOne = beakWidth / 2 + "," + 0;
    const pointTwo = beakWidth + "," + beakHeight;
    const pointThree = 0 + "," + beakHeight;

    return (
      <div className={ css('ms-Beak', classNames.root) }>
        <svg
          height={ beakHeight } width={ beakWidth }
          className={ classNames.beak }
        >
          <polygon points={ pointOne + " " + pointTwo + " " + pointThree } />
        </svg>
      </div>
    );
  }
}