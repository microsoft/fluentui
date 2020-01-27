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
  memoizeFunction,
  getRTL
} from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme, createTheme } from '../../Styling';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
const getFabricTheme = memoizeFunction((theme?: ITheme, isRTL?: boolean) => createTheme({ ...theme, rtl: isRTL }));

const getAllDir = memoizeFunction((theme?: ITheme, dir?: IFabricProps['dir']) => {
  const themedRTL = getRTL(theme) ? 'rtl' : 'ltr';
  const pagedRTL = getRTL() ? 'rtl' : 'ltr';

  return {
    component: dir ? dir : themedRTL,
    parent: themedRTL,
    page: pagedRTL
  };
});

/*
Scenarios where we modify Fabric theme or dir value:
1. Page LTR, Fabric inside RTL theme - set dir
2. Page LTR, Fabric has dir="rtl" - set dir, wrap in RTL theme
3. Theme LTR, Fabric has dir="rtl" - set dir, wrap in RTL theme
*/

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
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, ['dir']);
    const getDir = getAllDir(theme, dir);
    // If Fabric dir !== theme.RTL
    // Or If theme.RTL !== page RTL
    // Then we need to set dir on the Fabric component
    const setComponentDir = getDir.component !== getDir.parent || getDir.component !== getDir.page;
    // If dir !== theme.RTL || page RTL
    // Or If theme.RTL !== page RTL
    // then set contextual theme around Fabric
    const setComponentTheme = getDir.component !== getDir.parent;

    let renderedContent = (
      <Root dir={setComponentDir ? getDir.component : undefined} {...divProps} className={classNames.root} ref={this._rootElement} />
    );

    if (setComponentTheme) {
      renderedContent = <Customizer settings={{ theme: getFabricTheme(theme, dir === 'rtl') }}>{renderedContent}</Customizer>;
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
