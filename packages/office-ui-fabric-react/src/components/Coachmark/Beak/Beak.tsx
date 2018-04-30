import * as React from 'react';
import { BaseComponent, css, classNamesFunction } from '../../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles } from './Beak.styles';
import { IBeakStylesProps } from './Beak.types';

export interface IBeakState {
  left: string | null;
  top: string | null;
}

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  constructor(props: IBeakProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height = 18, width = 18, left, top } = this.props;

    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles, {
      left,
      top,
      height: height + 'px',
      width: width + 'px'
    });

    const pointOne = width / 2 + ',' + 0;
    const pointTwo = width + ',' + height;
    const pointThree = 0 + ',' + height;

    return (
      <div className={css('ms-Beak', classNames.root)}>
        <svg height={height} width={width} className={classNames.beak}>
          <polygon points={pointOne + ' ' + pointTwo + ' ' + pointThree} />
        </svg>
      </div>
    );
  }
}
