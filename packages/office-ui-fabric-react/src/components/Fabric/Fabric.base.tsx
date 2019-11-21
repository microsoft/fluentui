import * as React from 'react';
import { getNativeProps, on, divProperties, classNamesFunction, getWindow, getDocument, isDirectionalKeyCode } from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
export class FabricBase extends React.Component<
  IFabricProps,
  {
    isFocusVisible: boolean;
  }
> {
  private _rootElement = React.createRef<HTMLDivElement>();
  private _disposables: (() => void)[] = [];
  private _removeClassNameFromBody?: () => void = undefined;

  constructor(props: IFabricProps) {
    super(props);
    this.state = { isFocusVisible: false };
  }

  public render() {
    const classNames = this._getClassNames();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    return <div {...divProps} className={classNames.root} ref={this._rootElement} />;
  }

  public componentDidMount(): void {
    const win = getWindow(this._rootElement.current);
    if (win) {
      this._disposables.push(on(win, 'mousedown', this._onMouseDown, true), on(win, 'keydown', this._onKeyDown, true));
    }
    this._addClassNameToBody();
  }

  public componentWillUnmount(): void {
    this._disposables.forEach((dispose: () => void) => dispose());
    if (this._removeClassNameFromBody) {
      this._removeClassNameFromBody();
    }
  }

  private _getClassNames(): IProcessedStyleSet<IFabricStyles> {
    const { className, theme, applyTheme } = this.props;
    const classNames = getClassNames(getStyles, {
      theme: theme!,
      applyTheme: applyTheme,
      className,
      isFocusVisible: this.state.isFocusVisible
    });
    return classNames;
  }

  private _addClassNameToBody(): void {
    if (this.props.applyThemeToBody) {
      const classNames = this._getClassNames();
      const currentDoc = getDocument(this._rootElement.current);
      if (currentDoc) {
        currentDoc.body.classList.add(classNames.bodyThemed);
        this._removeClassNameFromBody = () => {
          currentDoc.body.classList.remove(classNames.bodyThemed);
        };
      }
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
