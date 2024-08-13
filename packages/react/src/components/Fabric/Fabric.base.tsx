import * as React from 'react';
import {
  classNamesFunction,
  divProperties,
  getDocument,
  getNativeProps,
  getRTL,
  memoizeFunction,
  Customizer,
  FocusRectsProvider,
} from '../../Utilities';
import { createTheme } from '../../Styling';
import { useMergedRefs } from '@fluentui/react-hooks';
import type { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';
import type { IProcessedStyleSet } from '@fluentui/merge-styles';
import type { ITheme } from '../../Styling';

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

export const FabricBase: React.FunctionComponent<IFabricProps> = React.forwardRef<HTMLDivElement, IFabricProps>(
  (props, ref) => {
    const { className, theme, applyTheme, applyThemeToBody, styles } = props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      applyTheme,
      className,
    });

    const rootElement = React.useRef<HTMLDivElement>(null);
    useApplyThemeToBody(applyThemeToBody, classNames, rootElement);

    return <>{useRenderedContent(props, classNames, rootElement, ref)}</>;
  },
);
FabricBase.displayName = 'FabricBase';

function useRenderedContent(
  props: IFabricProps,
  { root }: IProcessedStyleSet<IFabricStyles>,
  rootElement: React.RefObject<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { as: Root = 'div', dir, theme } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['dir']);

  const { rootDir, needsTheme } = getDir(props);

  let renderedContent = (
    <FocusRectsProvider providerRef={rootElement}>
      <Root dir={rootDir} {...divProps} className={root} ref={useMergedRefs(rootElement, ref)} />
    </FocusRectsProvider>
  );

  // Create the contextual theme if component direction does not match parent direction.
  if (needsTheme) {
    // Disabling ThemeProvider here because theme doesn't need to be re-provided by ThemeProvider if dir has changed.
    renderedContent = (
      // eslint-disable-next-line deprecation/deprecation
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
