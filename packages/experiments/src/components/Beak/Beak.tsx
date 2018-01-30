import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../Utilities';
import { IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles, IBeakStylesProps } from './Beak.styles';

export interface IBeakState { }

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  private _canvasRef: HTMLCanvasElement;

  private _createTriangle() {
    if (this._canvasRef.getContext) {
      var ctx = this._canvasRef.getContext('2d')!;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(50, 50);
      ctx.lineTo(100, 0);
      ctx.fill();
    }
  }

  public componentDidMount() {
    this._createTriangle();
  }

  public render() {
    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div className={ css("ms-Beak", classNames.root) }>
        <canvas className={ classNames.canvas } ref={ this._resolveRef('_canvasRef') }></canvas>
      </div>
    );
  }
};