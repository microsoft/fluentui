import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import {
  AnimationClassNames,
  IStyle,
  mergeStyles
} from '@uifabric/styling';
import { IAnimationTileStyles, getStyles } from './AnimationTile.styles';

export interface IAnimationTileProps {
  name: string;
}

export interface IAnimationTileState {
  isAnimating: boolean;
}

export class AnimationTile extends BaseComponent<IAnimationTileProps, IAnimationTileState> {
  constructor(props: IAnimationTileProps) {
    super(props);

    this.state = {
      isAnimating: false
    };
  }

  public render(): JSX.Element {
    const styles: IAnimationTileStyles = getStyles();
    const name: string = this.props.name;
    const isIn: boolean = name.indexOf('In') >= 0;
    const isInStyle: IStyle | null = isIn ? styles.isIn : null;
    let positioningStyle: IStyle;

    if (name.indexOf('Left') >= 0) {
      positioningStyle = isIn ? styles.isRight : styles.isLeft;
    } else if (name.indexOf('Right') >= 0) {
      positioningStyle = isIn ? styles.isLeft : styles.isRight;
    } else if (name.indexOf('Up') >= 0) {
      positioningStyle = isIn ? styles.isBottom : styles.isTop;
    } else {
      positioningStyle = isIn ? styles.isTop : styles.isBottom;
    }

    let animationClassName: string | null = this.state.isAnimating
      // tslint:disable-next-line:no-any
      ? (AnimationClassNames as any)[this.props.name]
      : null;

    return (
      <div className={ styles.root as string } onClick={ this._onClick }>
        <div className={ styles.title as string }>{ this.props.name }</div>
        <div className={ styles.container as string }>
          <div
            className={ mergeStyles(
              styles.animationBox,
              positioningStyle,
              isInStyle,
              animationClassName
            ) as string }
          />
        </div>
      </div>
    );
  }

  private _onClick = (): void => {
    this.setState({ isAnimating: true });
    this._async.setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 2000);
  }

}
