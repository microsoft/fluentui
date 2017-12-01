import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import { IBeakProps } from './Beak.types';
import {
  getRelativePositions,
  IPositionInfo,
  IPositionProps,
  getMaxHeight,
  ICalloutPositon
} from 'office-ui-fabric-react/lib/utilities/positioning';
import { AnimationClassNames, mergeStyles } from '../../Styling';
import {
  getClassNames
} from './Beak.styles';

export interface IBeakState {
  positions?: IPositionInfo;
}

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  constructor() {
    super();
    this.state = {
      positions: undefined,
    }
  }
  public render() {
    let {
      beakWidth,
      backgroundColor
     } = this.props;
    let { positions } = this.state;
    let beakStyleWidth = beakWidth;
    let beakReactStyle: React.CSSProperties = {
      ...(positions && positions.beakPosition ? positions.beakPosition.position : null),
    };

    let styles = getClassNames()

    beakReactStyle.height = beakStyleWidth;
    beakReactStyle.width = beakStyleWidth;
    beakReactStyle.backgroundColor = backgroundColor;

    if (!beakReactStyle.top && !beakReactStyle.bottom && !beakReactStyle.left && !beakReactStyle.right) {
      beakReactStyle.left = BEAK_ORIGIN_POSITION.left;
      beakReactStyle.top = BEAK_ORIGIN_POSITION.top;
    }


    let directionalClassName = (positions && positions.directionalClassName)
      ? (AnimationClassNames as any)[positions.directionalClassName]
      : '';

    return (
      <div
        className={ css('ms-Callout-beak', styles.root) }
        style={ beakReactStyle }
      />
    );
  }
};