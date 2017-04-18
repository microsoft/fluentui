import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { classNames } from '../classNames/index';
import { defaultPalette } from '../styles/colors';
import { fonts } from '../styles/fonts';

const styles: CSSProperties = {
  root: {
    marginBottom: '20px'
  },
  title: {
    ...fonts.medium,
    marginBottom: '8px'
  },
  container: {
    position: 'relative',
    maxWidth: '400px',
    height: '100px',
    border: '1px solid black',
    backgroundImage:
    'url("data:image/svg+xml;base64,' + 'PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc' +
    '+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwx' +
    'IGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J' +
    '2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg==")',
    backgroundRepeat: 'repeat',
  },
  animationBox: {
    position: 'absolute',

    background: defaultPalette.themePrimary,
    width: '25%',
    height: '100%'
  },
  isLeft: {
    left: 0,
    top: 0,
    width: '25%',
    height: '100%'
  },
  isRight: {
    right: 0,
    top: 0,
    width: '25%',
    height: '100%'
  },
  isTop: {
    left: 0,
    top: 0,
    width: '100%',
    height: '50%'
  },
  isBottom: {
    left: 0,
    bottom: 0,
    width: '100%',
    height: '50%'
  },
  isIn: {
    opacity: 0
  }
};

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
    const name: string = this.props.name;
    const isIn: boolean = name.indexOf('In') >= 0;
    let positioningStyle: CSSProperties;
    const isInStyle: CSSProperties = isIn ? styles.isIn : null;

    if (name.indexOf('Left') >= 0) {
      positioningStyle = styles.isRight;
    } else if (name.indexOf('Right') >= 0) {
      positioningStyle = styles.isLeft;
    } else if (name.indexOf('Up') >= 0) {
      positioningStyle = isIn ? styles.isBottom : styles.isTop;
    } else {
      positioningStyle = isIn ? styles.isTop : styles.isBottom;
    }

    return (
      <div { ...css(styles.root) } onClick={ this._onClick }>
        <div { ...css(styles.title) }>{ this.props.name }</div>
        <div { ...css(styles.container) }>
          <div
            { ...css(styles.animationBox, positioningStyle, isInStyle) }
            className={ this.state.isAnimating && classNames.animations[this.props.name] } />
        </div>
      </div>
    );
  }

  private _onClick = (): void => {
    this.setState({ isAnimating: true });
    this._async.setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 2000);
  };
}
