import * as React from 'react';
import {
  Customizer,
  getNativeProps,
  divProperties,
  classNamesFunction,
  getDocument,
  memoizeFunction,
  getRTL,
  FocusRects,
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

export class FabricBase extends React.Component<IFabricProps> {
  private _rootElement = React.createRef<HTMLDivElement>();
  private _removeClassNameFromBody?: () => void = undefined;

  public render() {
    const { as: Root = 'div', theme, dir } = this.props;
    const classNames = this._getClassNames();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, ['dir']);
    const componentDir = getDir(theme, dir);
    const parentDir = getDir(theme);

    let renderedContent = <Root dir={componentDir} {...divProps} className={classNames.root} ref={this._rootElement} />;

    // Create the contextual theme if component direction does not match parent direction.
    if (componentDir !== parentDir) {
      renderedContent = (
        <Customizer settings={{ theme: getFabricTheme(theme, dir === 'rtl') }}>{renderedContent}</Customizer>
      );
    }

    return (
      <>
        {renderedContent}
        <FocusRects rootRef={this._rootElement} />
      </>
    );
  }

  public componentDidMount(): void {
    this._addClassNameToBody();
  }

  public componentWillUnmount(): void {
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
