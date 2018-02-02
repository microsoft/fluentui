import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';
import { DefaultPalette } from '../../Styling';

export interface IBeakState { }

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  private _canvasElement: HTMLCanvasElement;

  public static defaultProps = {
    beakHeight: 18,
    beakWidth: 18
  }

  constructor(props: IBeakProps) {
    super(props);
  }

  public componentDidMount() {
    this._createTriangle(this._canvasElement, DefaultPalette.themePrimary);
  }

  public render() {
    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles);
    const {
      beakHeight,
      beakWidth
    } = this.props;

    return (
      <div className={ css("ms-Beak", classNames.root) }>
        <canvas
          ref={ this._resolveRef('_canvasElement') }
          className={ css("ms-Beak-canvas", classNames.canvas) }
          width={ beakWidth + "px" }
          height={ beakHeight + "px" }
        ></canvas>
      </div>
    );
  }

  private _createTriangle(canvasElement: HTMLCanvasElement, backgroundColor: string): void {
    const ctx = canvasElement.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(this.props.beakWidth! / 2, 0); // Top point
    ctx.lineTo(this.props.beakWidth!, this.props.beakHeight!); // Bottom right point
    ctx.lineTo(0, this.props.beakHeight!); // Bottom left point
    ctx.fillStyle = backgroundColor;
    ctx.fill();
  }
};