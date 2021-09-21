import { StaticStyleFunction } from '@fluentui/styles';

export const globalStyles: StaticStyleFunction = siteVars => ({
  body: {
    padding: siteVars.bodyPadding,
    margin: siteVars.bodyMargin,
    fontSize: siteVars.bodyFontSize,
    lineHeight: siteVars.bodyLineHeight,
  },
  '*': {
    boxSizing: 'border-box',
  },
  '*:before': {
    boxSizing: 'border-box',
  },
  '*:after': {
    boxSizing: 'border-box',
  },
  /* Adding priority for HTML `hidden` attribute to be applied correctly */
  '[hidden]': {
    display: 'none!important',
  },
});
