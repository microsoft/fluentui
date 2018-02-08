import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';
import { getComboBoxOptionClassNames } from 'src/components/ComboBox/ComboBox.classNames';

export interface IBeakState {
  left: string | null;
  top: string | null;
}

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  private _beakElement: HTMLElement;

  constructor(props: IBeakProps) {
    super(props);
  }

  public componentDidMount(): void {
    const beakComputedStyles = window.getComputedStyle(this._beakElement);
    this.setState({
      left: beakComputedStyles.left,
      top: beakComputedStyles.top
    });
  }

  public render(): JSX.Element {
    const {
      height = 18,
      width = 18,
      left,
      top
    } = this.props;

    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles, {
      left: this.props.left,
      top: this.props.top,
      height: height + 'px',
      width: width + 'px'
    });

    const pointOne = width / 2 + ',' + 0;
    const pointTwo = width + ',' + height;
    const pointThree = 0 + ',' + height;

    return (
      <div
        className={ css('ms-Beak', classNames.root) }
        ref={ this._resolveRef('_beakElement') }
      >
        <svg
          height={ height } width={ width }
          className={ classNames.beak }
        >
          <polygon points={ pointOne + ' ' + pointTwo + ' ' + pointThree } />
        </svg>
      </div>
    );
  }
}