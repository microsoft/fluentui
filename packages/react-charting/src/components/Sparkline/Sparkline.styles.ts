import { makeStyles } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
export const useClasses = makeStyles({
  line: {
    stroke: tokens.colorPaletteRedForeground2,
    fill: 'transparent',
    opacity: 1,
    strokeWidth: tokens.strokeWidthThick,
  },
  area: {
    opacity: 1,
    fillOpacity: 0.2,
    fill: tokens.colorPaletteRedForeground2,
  },
  inlineBlock: {
    display: 'inline',
    fontSize: tokens.fontSizeBase300,
    fill: tokens.colorNeutralForeground1,
  },
});
