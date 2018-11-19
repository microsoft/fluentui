import * as React from 'react';
import {
  BaseComponent,
  createRef,
  getNativeProps,
  divProperties,
  classNamesFunction,
  getWindow,
  isDirectionalKeyCode
} from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();

export class FabricBase extends BaseComponent<
  IFabricProps,
  {
    isFocusVisible: boolean;
  }
> {
  private _rootElement = createRef<HTMLDivElement>();

  constructor(props: IFabricProps) {
    super(props);
    this.state = { isFocusVisible: false };
  }

  public render() {
    const classNames = getClassNames(getStyles, {
      ...(this.props as IFabricStyleProps),
      ...this.state
    });
    const divProps = getNativeProps(this.props, divProperties);

    return <div {...divProps} className={classNames.root} ref={this._rootElement} />;
  }

  public componentDidMount(): void {
    const win = getWindow(this._rootElement.value);

    if (win) {
      this._events.on(win, 'mousedown', this._onMouseDown, true);
      this._events.on(win, 'keydown', this._onKeyDown, true);
    }
  }

  private _onMouseDown = (ev: MouseEvent): void => {
    this.setState({ isFocusVisible: false });
  };

  private _onKeyDown = (ev: KeyboardEvent): void => {
    if (isDirectionalKeyCode(ev.which)) {
      this.setState({ isFocusVisible: true });
    }
  };
}
