import * as React from 'react';
import {
  Customizer,
  getNativeProps,
  on,
  divProperties,
  classNamesFunction,
  getWindow,
  getDocument,
  isDirectionalKeyCode,
  memoizeFunction
} from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme } from '../../Styling';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
const getRTLTheme = memoizeFunction((theme: ITheme, isRTL: boolean) => ({ ...theme, rtl: isRTL }));

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
    const { as: Root = 'div', theme, dir } = this.props;
    const classNames = this._getClassNames();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    const isRTL = dir === 'rtl';
    let renderedContent = <Root {...divProps} className={classNames.root} ref={this._rootElement} />;

    // Expose an rtl based theme if dir is specified and it doesn't agree with the theme setting.
    if (dir !== undefined && theme && (theme.rtl === undefined || theme.rtl !== isRTL)) {
      renderedContent = <Customizer settings={{ theme: getRTLTheme(theme, isRTL) }}>{renderedContent}</Customizer>;
    }

    return renderedContent;
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
