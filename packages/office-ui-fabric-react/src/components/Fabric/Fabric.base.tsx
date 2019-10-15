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
    const { className } = this.props;

    const classNames = getClassNames(getStyles, {
      theme: this.props.theme!,
      className,
      isFocusVisible: this.state.isFocusVisible
    });
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    let fabricComponent;
    // apply theme to just the div only if applyTheme is true, otherwise do not apply theme at all
    fabricComponent = (
      <div {...divProps} className={this.props.applyTheme ? classNames.rootThemed : classNames.root} ref={this._rootElement} />
    );
    if (this.props.applyThemeToBody) {
      // apply theme to the body of the whole page
      document.body.classList.add('ms-Fabric-body-themed');
    }
    return fabricComponent;
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
