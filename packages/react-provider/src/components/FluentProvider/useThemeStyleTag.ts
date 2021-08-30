import { useId, usePrevious } from '@fluentui/react-utilities';
import { themeToCSSVariables } from '@fluentui/react-theme';
import * as React from 'react';
import type { FluentProviderState } from './FluentProvider.types';

const hcMediaQuery =
  window && window.matchMedia && window.matchMedia('screen and (-ms-high-contrast: active), (forced-colors: active)');
const colorTokens: { [key: string]: string } = {
  '--alias-color-neutral-neutralForeground1': 'CanvasText',
  '--alias-color-neutral-neutralForeground2': 'CanvasText',
  '--alias-color-neutral-neutralForeground2Hover': 'HighlightText',
  '--alias-color-neutral-neutralForeground2Pressed': 'HighlightText',
  '--alias-color-neutral-neutralForeground2Selected': 'HighlightText',
  '--alias-color-neutral-neutralForeground2BrandHover': 'HighlightText',
  '--alias-color-neutral-neutralForeground2BrandPressed': 'HighlightText',
  '--alias-color-neutral-neutralForeground2BrandSelected': 'HighlightText',
  '--alias-color-neutral-neutralForeground3': 'CanvasText',
  '--alias-color-neutral-neutralForeground3Hover': 'HighlightText',
  '--alias-color-neutral-neutralForeground3Pressed': 'HighlightText',
  '--alias-color-neutral-neutralForeground3Selected': 'HighlightText',
  '--alias-color-neutral-neutralForeground3BrandHover': 'HighlightText',
  '--alias-color-neutral-neutralForeground3BrandPressed': 'HighlightText',
  '--alias-color-neutral-neutralForeground3BrandSelected': 'HighlightText',
  '--alias-color-neutral-neutralForeground4': 'CanvasText',
  '--alias-color-neutral-neutralForegroundDisabled': 'GrayText',
  '--alias-color-neutral-brandForegroundLink': 'LinkText',
  '--alias-color-neutral-brandForegroundLinkHover': 'LinkText',
  '--alias-color-neutral-brandForegroundLinkPressed': 'LinkText',
  '--alias-color-neutral-brandForegroundLinkSelected': 'LinkText',
  '--alias-color-neutral-compoundBrandForeground1': 'Highlight',
  '--alias-color-neutral-compoundBrandForeground1Hover': 'Highlight',
  '--alias-color-neutral-compoundBrandForeground1Pressed': 'Highlight',
  '--alias-color-neutral-brandForeground1': 'CanvasText',
  '--alias-color-neutral-brandForeground2': 'ButtonText',
  '--alias-color-neutral-neutralForegroundInverted': 'Canvas',
  '--alias-color-neutral-neutralForegroundOnBrand': 'ButtonText',
  '--alias-color-neutral-neutralForegroundInvertedLink': 'LinkText',
  '--alias-color-neutral-neutralForegroundInvertedLinkHover': 'LinkText',
  '--alias-color-neutral-neutralForegroundInvertedLinkPressed': 'LinkText',
  '--alias-color-neutral-neutralForegroundInvertedLinkSelected': 'LinkText',
  '--alias-color-neutral-neutralBackground1': 'Canvas',
  '--alias-color-neutral-neutralBackground1Hover': 'Highlight',
  '--alias-color-neutral-neutralBackground1Pressed': 'Highlight',
  '--alias-color-neutral-neutralBackground1Selected': 'Highlight',
  '--alias-color-neutral-neutralBackground2': 'Canvas',
  '--alias-color-neutral-neutralBackground2Hover': 'Highlight',
  '--alias-color-neutral-neutralBackground2Pressed': 'Highlight',
  '--alias-color-neutral-neutralBackground2Selected': 'Highlight',
  '--alias-color-neutral-neutralBackground3': 'Canvas',
  '--alias-color-neutral-neutralBackground3Hover': 'Highlight',
  '--alias-color-neutral-neutralBackground3Pressed': 'Highlight',
  '--alias-color-neutral-neutralBackground3Selected': 'Highlight',
  '--alias-color-neutral-neutralBackground4': 'Canvas',
  '--alias-color-neutral-neutralBackground4Hover': 'Highlight',
  '--alias-color-neutral-neutralBackground4Pressed': 'Highlight',
  '--alias-color-neutral-neutralBackground4Selected': 'Highlight',
  '--alias-color-neutral-neutralBackground5': 'Canvas',
  '--alias-color-neutral-neutralBackground5Hover': 'Highlight',
  '--alias-color-neutral-neutralBackground5Pressed': 'Highlight',
  '--alias-color-neutral-neutralBackground5Selected': 'Highlight',
  '--alias-color-neutral-neutralBackground6': 'Canvas',
  '--alias-color-neutral-neutralBackgroundInverted': 'CanvasText',
  '--alias-color-neutral-subtleBackground': 'transparent',
  '--alias-color-neutral-subtleBackgroundHover': 'Highlight',
  '--alias-color-neutral-subtleBackgroundPressed': 'Highlight',
  '--alias-color-neutral-subtleBackgroundSelected': 'Highlight',
  '--alias-color-neutral-transparentBackground': 'transparent',
  '--alias-color-neutral-transparentBackgroundHover': 'Highlight',
  '--alias-color-neutral-transparentBackgroundPressed': 'Highlight',
  '--alias-color-neutral-transparentBackgroundSelected': 'Highlight',
  '--alias-color-neutral-neutralBackgroundDisabled': 'Canvas',
  '--alias-color-neutral-neutralStencil1': 'var(--global-palette-grey-8)',
  '--alias-color-neutral-neutralStencil2': 'var(--global-palette-grey-52)',
  '--alias-color-neutral-brandBackground': 'ButtonFace',
  '--alias-color-neutral-brandBackgroundHover': 'Highlight',
  '--alias-color-neutral-brandBackgroundPressed': 'Highlight',
  '--alias-color-neutral-brandBackgroundSelected': 'Highlight',
  '--alias-color-neutral-compoundBrandBackground': 'Highlight',
  '--alias-color-neutral-compoundBrandBackgroundHover': 'Highlight',
  '--alias-color-neutral-compoundBrandBackgroundPressed': 'Highlight',
  '--alias-color-neutral-brandBackgroundStatic': 'Canvas',
  '--alias-color-neutral-brandBackground2': 'ButtonFace',
  '--alias-color-neutral-neutralStrokeAccessible': 'CanvasText',
  '--alias-color-neutral-neutralStrokeAccessibleHover': 'Highlight',
  '--alias-color-neutral-neutralStrokeAccessiblePressed': 'Highlight',
  '--alias-color-neutral-neutralStrokeAccessibleSelected': 'Highlight',
  '--alias-color-neutral-neutralStroke1': 'CanvasText',
  '--alias-color-neutral-neutralStroke1Hover': 'Highlight',
  '--alias-color-neutral-neutralStroke1Pressed': 'Highlight',
  '--alias-color-neutral-neutralStroke1Selected': 'Highlight',
  '--alias-color-neutral-neutralStroke2': 'CanvasText',
  '--alias-color-neutral-neutralStroke3': 'CanvasText',
  '--alias-color-neutral-brandStroke1': 'CanvasText',
  '--alias-color-neutral-brandStroke2': 'Canvas',
  '--alias-color-neutral-compoundBrandStroke': 'Highlight',
  '--alias-color-neutral-compoundBrandStrokeHover': 'Highlight',
  '--alias-color-neutral-compoundBrandStrokePressed': 'Highlight',
  '--alias-color-neutral-neutralStrokeDisabled': 'GrayText',
  '--alias-color-neutral-transparentStroke': 'CanvasText',
  '--alias-color-neutral-transparentStrokeInteractive': 'Highlight',
  '--alias-color-neutral-transparentStrokeDisabled': 'GrayText',
  '--alias-color-neutral-strokeFocus1': 'Canvas',
  '--alias-color-neutral-strokeFocus2': 'Highlight',
  '--alias-color-neutral-neutralShadowAmbient': 'rgba(0,0,0,0.24)',
  '--alias-color-neutral-neutralShadowKey': 'rgba(0,0,0,0.28)',
  '--alias-color-neutral-neutralShadowAmbientLighter': 'rgba(0,0,0,0.12)',
  '--alias-color-neutral-neutralShadowKeyLighter': 'rgba(0,0,0,0.14)',
  '--alias-color-neutral-neutralShadowAmbientDarker': 'rgba(0,0,0,0.40)',
  '--alias-color-neutral-neutralShadowKeyDarker': 'rgba(0,0,0,0.48)',
  '--alias-color-neutral-brandShadowAmbient': 'rgba(0,0,0,0.30)',
  '--alias-color-neutral-brandShadowKey': 'rgba(0,0,0,0.25)',
};

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (options: Pick<FluentProviderState, 'theme' | 'targetDocument'>) => {
  const { targetDocument, theme } = options;

  const styleTagId = useId('fluent-provider');
  const styleTag = React.useMemo(() => {
    if (!targetDocument) {
      return null;
    }

    const tag = targetDocument.createElement('style');
    tag.setAttribute('id', styleTagId);
    targetDocument.head.appendChild(tag);
    return tag;
  }, [styleTagId, targetDocument]);

  const cssRule = React.useMemo(() => {
    const cssVars = themeToCSSVariables(theme);
    let cssVarsAsString = Object.keys(cssVars).reduce((cssVarRule, cssVar) => {
      if (hcMediaQuery && hcMediaQuery.matches && colorTokens[cssVar] !== undefined) {
        return cssVarRule + `${cssVar}: ${colorTokens[cssVar]}; `;
      }

      return cssVarRule + `${cssVar}: ${cssVars[cssVar]}; `;
    }, '');

    if (hcMediaQuery && hcMediaQuery.matches) {
      cssVarsAsString += 'forced-color-adjust: none;';
    }

    // result: .fluent-provider1 { --css-var: '#fff' }
    return `.${styleTagId} { ${cssVarsAsString} }`;
  }, [theme, styleTagId]);
  const previousCssRule = usePrevious(cssRule);

  if (styleTag && previousCssRule !== cssRule) {
    const sheet = styleTag.sheet as CSSStyleSheet;

    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }

    sheet.insertRule(cssRule, 0);
  }

  // Removes the style tag from the targetDocument on unmount or change
  React.useEffect(() => {
    return () => {
      if (styleTag) {
        // IE11 safe node removal, otherwise use node.remove()
        styleTag.parentElement?.removeChild(styleTag);
      }
    };
  }, [styleTag]);

  return styleTagId;
};
