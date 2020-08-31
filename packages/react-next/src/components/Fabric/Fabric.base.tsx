import * as React from 'react';
import {
  getNativeProps,
  divProperties,
  classNamesFunction,
  getDocument,
  memoizeFunction,
  getRTL,
  Customizer,
  useFocusRects,
} from '../../Utilities';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import { IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme, createTheme } from '../../Styling';
import { useMergedRefs } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();
const getFabricTheme = memoizeFunction((theme?: ITheme, isRTL?: boolean) => createTheme({ ...theme, rtl: isRTL }));

const getDir = ({ theme, dir }: IFabricProps) => {
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

export const FabricBase = React.forwardRef((props: IFabricProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, theme, applyTheme, applyThemeToBody } = props;

  const classNames = getClassNames(getStyles, {
    theme: theme!,
    applyTheme: applyTheme,
    className,
  });

  const rootElement = React.useRef<HTMLDivElement | null>(null);
  useApplyThemeToBody(applyThemeToBody, classNames, rootElement);
  useFocusRects(rootElement);

  return <>{useRenderedContent(props, classNames, rootElement, ref)}</>;
});
FabricBase.displayName = 'FabricBase';

function useRenderedContent(
  props: IFabricProps,
  { root }: IProcessedStyleSet<IFabricStyles>,
  rootElement: React.RefObject<HTMLDivElement | undefined>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { as: Root = 'div', dir, theme } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['dir']);

  const { rootDir, needsTheme } = getDir(props);

  let renderedContent = <Root dir={rootDir} {...divProps} className={root} ref={useMergedRefs(rootElement, ref)} />;

  // Create the contextual theme if component direction does not match parent direction.
  if (needsTheme) {
    // Disabling ThemeProvider here because theme doesn't need to be re-provided by ThemeProvider if dir has changed.
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
  }, [bodyThemed, applyThemeToBody, rootElement]);

  return rootElement;
}
