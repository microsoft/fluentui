import * as React from 'react';
import { getNativeProps, on, divProperties, classNamesFunction, getWindow, isDirectionalKeyCode } from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();

export class FabricBase extends React.Component<
  IFabricProps,
  {
    isFocusVisible: boolean;
  }
> {
  private _rootElement = React.createRef<HTMLDivElement>();
  private _disposables: (() => void)[] = [];

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
    const win = getWindow(this._rootElement.current);

    if (win) {
      this._disposables.push(on(win, 'mousedown', this._onMouseDown, true), on(win, 'keydown', this._onKeyDown, true));
    }
  }

  public componentWillUnmount(): void {
    this._disposables.forEach((dispose: () => void) => dispose());
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
