import * as React from 'react';
import {
  Customizer,
  getNativeProps,
  divProperties,
  classNamesFunction,
  getWindow,
  getDocument,
  memoizeFunction,
  getRTL,
  FocusRects
} from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme, createTheme } from '../../Styling';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
const getFabricTheme = memoizeFunction((theme?: ITheme, isRTL?: boolean) => createTheme({ ...theme, rtl: isRTL }));
const getDir = memoizeFunction((theme?: ITheme, dir?: IFabricProps['dir']) => {
  if (dir) {
    return dir;
  }
  if (theme && theme.rtl !== undefined) {
    return theme.rtl ? 'rtl' : 'ltr';
  }
  return getRTL() ? 'rtl' : 'ltr';
});

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
    const componentDir = getDir(theme, dir);
    const parentDir = getDir(theme);

    let renderedContent = <Root dir={componentDir} {...divProps} className={classNames.root} ref={this._rootElement} />;

    // Create the contextual theme if component direction does not match parent direction.
    if (componentDir !== parentDir) {
      renderedContent = <Customizer settings={{ theme: getFabricTheme(theme, dir === 'rtl') }}>{renderedContent}</Customizer>;
    }
    const win = getWindow(this._rootElement.current);

    return (
      <>
        {renderedContent}
        <FocusRects window={win} />
      </>
    );
  }

  public componentDidMount(): void {
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
}
