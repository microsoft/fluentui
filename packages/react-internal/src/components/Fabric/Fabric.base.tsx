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
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme, createTheme } from '../../Styling';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
const getFabricTheme = memoizeFunction((theme?: ITheme, isRTL?: boolean) => createTheme({ ...theme, rtl: isRTL }));

const getDir = (theme?: ITheme, dir?: IFabricProps['dir']) => {
  const contextDir = getRTL(theme) ? 'rtl' : 'ltr';
  const pageDir = getRTL() ? 'rtl' : 'ltr';
  const componentDir = dir ? dir : contextDir;
  return {
    // If Fabric dir !== contextDir
    // Or If contextDir !== pageDir
    // Then we need to set dir of the Fabric root
    rootDir: componentDir !== contextDir || componentDir !== pageDir ? componentDir : dir,
    // If dir !== contextDir || pageDir
    // then set contextual theme around content
    needsTheme: componentDir !== contextDir,
  };
};

export class FabricBase extends React.Component<IFabricProps> {
  private _rootElement = React.createRef<HTMLDivElement>();
  private _removeClassNameFromBody?: () => void = undefined;

  public render() {
    const { as: Root = 'div', theme, dir } = this.props;
    const classNames = this._getClassNames();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, ['dir']);
    const { rootDir, needsTheme } = getDir(theme, dir);

    let renderedContent = <Root dir={rootDir} {...divProps} className={classNames.root} ref={this._rootElement} />;

    if (needsTheme) {
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
    const { className, theme, applyTheme, styles } = this.props;
    const classNames = getClassNames(styles, {
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
