import * as React from 'react';

import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../Utilities';
import { IBeakProps } from './Beak.types';
import {
  ICalloutPositionedInfo
} from 'office-ui-fabric-react/lib/utilities/positioning';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';

const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();

export interface IBeakState {
  positions?: ICalloutPositionedInfo;
}

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };

export class Beak extends BaseComponent<IBeakProps, IBeakState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakWidth: 16
  }

  constructor() {
    super();
    this.state = {
      positions: undefined,
    }
  }

  public render(): JSX.Element {
    let {
      beakWidth,
      backgroundColor,
      isBeakVisible,
      target
    } = this.props;

    const classNames = getClassNames(getStyles, {});

    let { positions } = this.state;

    const beakReactStyle = this._getBeakPosition(positions, beakWidth, backgroundColor);
    let beakVisible = isBeakVisible && (!!target);

    return (
      <div>
        { beakVisible &&
          (
            <div
              className={ css('ms-Beak', classNames.root) }
              style={ beakReactStyle }
            />
          )
        }
        { beakVisible &&
          (<div className={ css('ms-Beak-curtain', classNames.curtain) } />)
        }
      </div>
    );
  }

  private _getBeakPosition(
    positions?: ICalloutPositionedInfo,
    beakWidth?: number,
    backgroundColor?: string
  ) {
    let beakStyleWidth = beakWidth;

    let beakReactStyle: React.CSSProperties = {
      ...(positions && positions.beakPosition ? positions.beakPosition.elementPosition : null),
    };

    beakReactStyle.height = beakStyleWidth;
    beakReactStyle.width = beakStyleWidth;
    beakReactStyle.backgroundColor = backgroundColor;

    if (!beakReactStyle.top && !beakReactStyle.bottom && !beakReactStyle.left && !beakReactStyle.right) {
      beakReactStyle.left = BEAK_ORIGIN_POSITION.left;
      beakReactStyle.top = BEAK_ORIGIN_POSITION.top;
    }

    return beakReactStyle;
  }
};