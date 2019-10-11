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
    if (this.props.applyTheme) {
      // apply theme only to the div
      fabricComponent = (
        <div
          {...divProps}
          style={{ backgroundColor: this.props.theme!.semanticColors.bodyBackground }}
          className={classNames.root}
          ref={this._rootElement}
        />
      );
    } else if (this.props.applyThemeToBody) {
      // apply theme to the body of the whole page
      document.body.style.backgroundColor = this.props.theme!.semanticColors.bodyBackground;
      fabricComponent = <div {...divProps} className={classNames.root} ref={this._rootElement} />;
    } else {
      // do not apply theme
      fabricComponent = <div {...divProps} className={classNames.root} ref={this._rootElement} />;
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
