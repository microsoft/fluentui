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
  private _canvasElement: HTMLCanvasElement;

  constructor(props: IBeakProps) {
    super(props);
  }

  public componentDidMount(): void {
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