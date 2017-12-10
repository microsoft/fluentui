import * as React from 'react';

import {
  BaseComponent,
  css
} from '../../Utilities';

import { IBeakProps } from './Beak.types';

import {
  ICalloutPositionedInfo,
  RectangleEdge
} from 'office-ui-fabric-react/lib/utilities/positioning';

import {
  AnimationClassNames,
  mergeStyles
} from '../../Styling';

import {
  getClassNames
} from './Beak.styles';

export interface IBeakState {
  positions?: IPositionInfo;
}

const styles: any = stylesImport;

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_STYLE = { opacity: 0 };
const BORDER_WIDTH: number = 1;
const SLIDE_ANIMATIONS: { [key: number]: string; } = {
  [RectangleEdge.top]: 'slideUpIn20',
  [RectangleEdge.bottom]: 'slideDownIn20',
  [RectangleEdge.left]: 'slideLeftIn20',
  [RectangleEdge.right]: 'slideRightIn20'
};

export class Beak extends BaseComponent<IBeakProps, IBeakState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakWidth: 16
  }

  constructor() {
    super();

    this._warnDeprecations({ 'beakStyle': 'beakWidth' });

    this.state = {
      positions: undefined,
    }
  }

  public componentWillUpdate(newProps: IBeakProps) {
    if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
      this._maxHeight = undefined;
    }
  }

  public render() {
    let {
      beakWidth,
      backgroundColor,
      isBeakVisible,
      beakStyle,
      target
     } = this.props;

    let { positions } = this.state;

    const beakReactStyle = this._getBeakPosition(positions, beakWidth, backgroundColor, beakStyle);
    let beakVisible = isBeakVisible && (!!target);

    return (
      <div>
        { beakVisible && (
          <div
            className={ css('ms-Callout-beak', styles.beak) }
            style={ beakReactStyle }
          />) }

        { beakVisible &&
          (<div className={ css('ms-Callout-beakCurtain', styles.beakCurtain) } />) }
      </div>
    );


  }

  private _getBeakPosition(positions?: ICalloutPositionedInfo,
    beakWidth?: number,
    backgroundColor?: string,
    beakStyle?: string) {
    let beakStyleWidth = beakWidth;

    // This is here to support the old way of setting the beak size until version 1.0.0.
    // beakStyle is now deprecated and will be be removed at version 1.0.0
    if (beakStyle === 'ms-Callout-smallbeak') {
      beakStyleWidth = 16;
    }

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