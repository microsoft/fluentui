import { margin, padding, StaticStyleFunction } from '@fluentui/styles';

const globalStyles: StaticStyleFunction = siteVars => ({
  body: {
    ...margin(siteVars.bodyMargin),
    ...padding(siteVars.bodyPadding),
    fontFamily: siteVars.bodyFontFamily,
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
});

export default globalStyles;
