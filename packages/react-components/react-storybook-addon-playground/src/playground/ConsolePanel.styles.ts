import { makeStyles, tokens } from '@fluentui/react-components';

const MONOSPACE_FONT = '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace';

export const useConsolePanelStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
  },
  toggle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    minWidth: 0,
    fontWeight: tokens.fontWeightSemibold,
  },
  counts: {
    display: 'inline-flex',
    gap: tokens.spacingHorizontalS,
    marginLeft: tokens.spacingHorizontalS,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3,
  },
  countError: {
    color: tokens.colorPaletteRedForeground1,
  },
  countWarn: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  body: {
    maxHeight: '30vh',
    overflow: 'auto',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
  },
  empty: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground3,
  },
  entry: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    columnGap: tokens.spacingHorizontalS,
    alignItems: 'start',
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
  },
  entryError: {
    color: tokens.colorPaletteRedForeground1,
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
  entryWarn: {
    color: tokens.colorPaletteDarkOrangeForeground1,
    backgroundColor: tokens.colorPaletteYellowBackground1,
  },
  icon: {
    display: 'inline-flex',
    width: '16px',
    height: tokens.lineHeightBase300,
    alignItems: 'center',
    fontSize: '14px',
  },
  message: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: MONOSPACE_FONT,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
  },
  repeat: {
    minWidth: '18px',
    padding: `0 ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase300,
  },
});
