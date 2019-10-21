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

  constructor(props: IFabricProps) {
    super(props);
    this.state = { isFocusVisible: false };
  }

  public render() {
    const classNames = this.getClassNamesHelper();

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    let fabricComponent;
    // apply theme to just the div only if applyTheme is true, otherwise do not apply theme at all
    fabricComponent = (
      <div {...divProps} className={this.props.applyTheme ? classNames.rootThemed : classNames.root} ref={this._rootElement} />
    );
    return fabricComponent;
  }

  public componentDidMount(): void {
    const win = getWindow(this._rootElement.current);

    if (win) {
      this._disposables.push(on(win, 'mousedown', this._onMouseDown, true), on(win, 'keydown', this._onKeyDown, true));
    }

    const classNames = this.getClassNamesHelper();
    if (this.props.applyThemeToBody) {
      const currentDoc: Document = getDocument(this._rootElement.current)!;
      currentDoc.body.classList.add(classNames.bodyThemed);
    }
  }

  public componentWillUnmount(): void {
    this._disposables.forEach((dispose: () => void) => dispose());

    const classNames = this.getClassNamesHelper();
    if (this.props.applyThemeToBody) {
      const currentDoc: Document = getDocument(this._rootElement.current)!;
      currentDoc.body.classList.remove(classNames.bodyThemed);
    }
  }

  private getClassNamesHelper(): IProcessedStyleSet<IFabricStyles> {
    const { className } = this.props;
    const classNames = getClassNames(getStyles, {
      theme: this.props.theme!,
      className,
      isFocusVisible: this.state.isFocusVisible
    });
    return classNames;
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
