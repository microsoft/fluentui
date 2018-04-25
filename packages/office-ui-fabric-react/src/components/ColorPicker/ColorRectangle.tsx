import * as React from 'react';
import {
  BaseComponent,
  assign,
  css,
  createRef
} from '../../Utilities';
import {
  IColor,
  MAX_COLOR_SATURATION,
  MAX_COLOR_VALUE,
  getFullColorString,
  hsv2hex
} from '../../utilities/color/colors';
import * as stylesImport from './ColorPicker.scss';
const styles: any = stylesImport;

export interface IColorRectangleProps {
  componentRef?: () => void;
  color: IColor;
  minSize?: number;

  onSVChanged?(s: number, v: number): void;
}

export interface IColorPickerState {
  isAdjusting?: boolean;
  origin?: { x: number, y: number, color: IColor };
  color?: IColor;
  fullColorString?: string;
}

export class ColorRectangle extends BaseComponent<IColorRectangleProps, IColorPickerState> {
  public static defaultProps = {
    minSize: 220
  };

  private _root = createRef<HTMLDivElement>();

  constructor(props: IColorRectangleProps) {
    super(props);

    const { color } = this.props;

    this.state = {
      isAdjusting: false,
      origin: undefined,
      color: color,
      fullColorString: getFullColorString(color)
    };
  }

  public componentWillUnmount(): void {
    this._events.dispose();
  }

  public componentWillReceiveProps(newProps: IColorRectangleProps): void {
    const { color } = newProps;

    this.setState({
      color: color,
      fullColorString: getFullColorString(color)
    });
  }

  public render(): JSX.Element {
    const { minSize } = this.props;
    const { color, fullColorString } = this.state;

    return (
      <div ref={ this._root } className={ css('ms-ColorPicker-colorRect', styles.colorRect) } style={ { minWidth: minSize, minHeight: minSize, backgroundColor: fullColorString } } onMouseDown={ this._onMouseDown }>
        <div className={ css('ms-ColorPicker-light', styles.light) } />
        <div className={ css('ms-ColorPicker-dark', styles.dark) } />
        <div className={ css('ms-ColorPicker-thumb', styles.thumb) } style={ { left: color!.s + '%', top: (MAX_COLOR_VALUE - color!.v) + '%', backgroundColor: color!.str } } />
      </div>
    );
  }

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    this._events.on(window, 'mousemove', this._onMouseMove, true);
    this._events.on(window, 'mouseup', this._onMouseUp, true);

    this._onMouseMove(ev);
  }

  private _onMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const { color, onSVChanged } = this.props;

    if (!this._root.current) {
      return;
    }

    const rectSize = this._root.current.getBoundingClientRect();

    const sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const vPercentage = (ev.clientY - rectSize.top) / rectSize.height;

    const newColor = assign({}, color, {
      s: Math.min(MAX_COLOR_SATURATION, Math.max(0, sPercentage * MAX_COLOR_SATURATION)),
      v: Math.min(MAX_COLOR_VALUE, Math.max(0, MAX_COLOR_VALUE - (vPercentage * MAX_COLOR_VALUE))),
    });

    newColor.hex = hsv2hex(newColor.h, newColor.s, newColor.v);
    newColor.str = newColor.a === 100 ? '#' + newColor.hex : `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a / 100})`;

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

  private _onMouseUp = (ev: React.MouseEvent<HTMLElement>): void => {
    this._events.off();

    this.setState({
      isAdjusting: false,
      origin: undefined
    });
  }

}
