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

// tslint:disable-next-line:function-name
export function FabricBase(props: IFabricProps) {
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
      {getRenderedContent(props, classNames, rootElement)}
      <FocusRects rootRef={rootElement} />
    </>
  );
}

function getRenderedContent(
  props: IFabricProps,
  { root }: IProcessedStyleSet<IFabricStyles>,
  rootElement: React.RefObject<HTMLDivElement | undefined>,
) {
  const { as: Root = 'div', dir, theme } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['dir']);

  const componentDir = getDir(theme, dir);
  const parentDir = getDir(theme);

  let renderedContent = <Root dir={componentDir} {...divProps} className={root} ref={rootElement} />;

  // Create the contextual theme if component direction does not match parent direction.
  if (componentDir !== parentDir) {
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
