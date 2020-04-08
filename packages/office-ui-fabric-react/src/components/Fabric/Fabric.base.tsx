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
import { useMergedRefs } from '@uifabric/react-hooks';

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
    rootDir: componentDir !== contextDir || componentDir !== pageDir ? componentDir : undefined,
    // If dir !== contextDir || pageDir
    // then set contextual theme around content
    needsTheme: componentDir !== contextDir,
  };
};

// tslint:disable-next-line:function-name no-function-expression
export const FabricBase = React.forwardRef(function(props: IFabricProps, ref: React.Ref<HTMLDivElement>) {
  const { className, theme, applyTheme, applyThemeToBody } = props;

  const classNames = getClassNames(getStyles, {
    theme: theme!,
    applyTheme: applyTheme,
    className,
  });

  const rootElement = React.useRef<HTMLDivElement>();
  useApplyThemeToBody(applyThemeToBody, classNames, rootElement);

  return (
    <>
      {useRenderedContent(props, classNames, rootElement, ref)}
      <FocusRects rootRef={rootElement} />
    </>
  );
});

function useRenderedContent(
  props: IFabricProps,
  { root }: IProcessedStyleSet<IFabricStyles>,
  rootElement: React.RefObject<HTMLDivElement | undefined>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { as: Root = 'div', dir, theme } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['dir']);

  const { rootDir, needsTheme } = getDir(theme, dir);

  let renderedContent = <Root dir={rootDir} {...divProps} className={root} ref={useMergedRefs(rootElement, ref)} />;

  // Create the contextual theme if component direction does not match parent direction.
  if (needsTheme) {
    renderedContent = (
      <Customizer settings={{ theme: getFabricTheme(theme, dir === 'rtl') }}>{renderedContent}</Customizer>
    );
  }

  return renderedContent;
}

function useApplyThemeToBody(
  applyThemeToBody: boolean | undefined,
  { bodyThemed }: IProcessedStyleSet<IFabricStyles>,
  rootElement: React.RefObject<HTMLDivElement | undefined>,
) {
  React.useEffect((): void | (() => void) => {
    if (applyThemeToBody) {
      const currentDoc = getDocument(rootElement.current);
      if (currentDoc) {
        currentDoc.body.classList.add(bodyThemed);
        return () => {
          currentDoc.body.classList.remove(bodyThemed);
        };
      }
    }
  }, [bodyThemed]);

  return rootElement;
}
