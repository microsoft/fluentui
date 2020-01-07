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
    const { dir, theme } = this.props;
    const isRTL = dir === 'rtl';
    const needDirectionChange = dir !== undefined && theme && (theme.rtl === undefined || theme.rtl !== isRTL);

    if (needDirectionChange) {
      const switchedTheme = getRTLTheme(theme!, isRTL);
      return <Customizer settings={{ theme: switchedTheme }}>{this._renderRoot(switchedTheme)}</Customizer>;
    } else {
      return this._renderRoot(theme!);
    }
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

  private _renderRoot(theme: ITheme) {
    const { as: Root = 'div' } = this.props;
    const classNames = this._getClassNames(theme);
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    return <Root {...divProps} className={classNames.root} ref={this._rootElement} />;
  }

  private _getClassNames(theme: ITheme): IProcessedStyleSet<IFabricStyles> {
    const { className, applyTheme } = this.props;
    const classNames = getClassNames(getStyles, {
      theme,
      applyTheme: applyTheme,
      className,
      isFocusVisible: this.state.isFocusVisible
    });
    return classNames;
  }

  private _addClassNameToBody(): void {
    if (this.props.applyThemeToBody) {
      const classNames = this._getClassNames(this.props.theme!);
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
