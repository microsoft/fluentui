import * as React from 'react';
import {
  IColor,
  MAX_COLOR_SATURATION,
  MAX_COLOR_VALUE,
  getFullColorString
 } from './colors';
import { assign } from '../../utilities/object';
import { autobind } from '../../utilities/autobind';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';

let hsv2hex = require('color-functions/lib/hsv2hex');

export interface IColorRectangleProps {
  color: IColor;
  minSize?: number;

  onSVChanged? (s: number, v: number): void;
}

export interface IColorPickerState {
  isAdjusting?: boolean;
  origin?: { x: number, y: number, color: IColor };
  color?: IColor;
  fullColorString?: string;
}

export class ColorRectangle extends React.Component<IColorRectangleProps, IColorPickerState> {
  public static defaultProps = {
    minSize: 220
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
  };

  private _events: EventGroup;

  constructor(props: IColorRectangleProps) {
    super(props);

    let { color } = this.props;

    this._events = new EventGroup(this);

    this.state = {
      isAdjusting: false,
      origin: null,
      color: color,
      fullColorString: getFullColorString(color)
    };
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentWillReceiveProps(newProps: IColorRectangleProps) {
    let { color } = newProps;

    this.setState({
      color: color,
      fullColorString: getFullColorString(color)
    });
  }

  public render() {
    let { minSize } = this.props;
    let { color, fullColorString } = this.state;

    return (
      <div ref='root' className='ms-ColorPicker-colorRect' style={ { minWidth: minSize, minHeight: minSize, backgroundColor: fullColorString } } onMouseDown={ this._onMouseDown }>
        <div className='ms-ColorPicker-light' />
        <div className='ms-ColorPicker-dark' />
        <div className='ms-ColorPicker-thumb' style={ { left: color.s + '%', top: (MAX_COLOR_VALUE - color.v) + '%', backgroundColor: color.str } }/>
      </div>
    );
  }

  @autobind
  private _onMouseDown(ev: React.MouseEvent<HTMLElement>) {
    this._events.on(window, 'mousemove', this._onMouseMove, true);
    this._events.on(window, 'mouseup', this._onMouseUp, true);

    this._onMouseMove(ev);
  }

  @autobind
  private _onMouseMove(ev: React.MouseEvent<HTMLElement>) {
    let { color, onSVChanged } = this.props;
    let rectSize = this.refs.root.getBoundingClientRect();

    let sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    let vPercentage = (ev.clientY - rectSize.top) / rectSize.height;

    let newColor = assign({}, color, {
        s: Math.min(MAX_COLOR_SATURATION, Math.max(0, sPercentage * MAX_COLOR_SATURATION)),
        v: Math.min(MAX_COLOR_VALUE, Math.max(0, MAX_COLOR_VALUE - (vPercentage * MAX_COLOR_VALUE))),
      });

    newColor.hex = hsv2hex(newColor.h, newColor.s, newColor.v);
    newColor.str = newColor.a === 100 ? '#' + newColor.hex : `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${ newColor.a / 100 })`;

    this.setState({
      isAdjusting: true,
      color: newColor
    });

    if (onSVChanged) {
      onSVChanged(newColor.s, newColor.v);
    }
    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onMouseUp(ev: React.MouseEvent<HTMLElement>) {
    this._events.off();

    this.setState({
      isAdjusting: false,
      origin: null
    });
  }

}
