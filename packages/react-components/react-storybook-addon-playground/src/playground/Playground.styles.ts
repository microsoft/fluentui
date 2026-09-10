import { makeStyles, tokens } from '@fluentui/react-components';

export const usePlaygroundStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: 'nowrap',
  },
  toolbar: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: 0,
  },
  themePicker: {
    minWidth: '140px',
  },
  main: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    minHeight: 0,
  },
  editorPane: {
    minWidth: 0,
    minHeight: 0,
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  previewPane: {
    display: 'grid',
    gridTemplateRows: 'minmax(0, 1fr) auto',
    minWidth: 0,
    minHeight: 0,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground3,
  },
  errorBar: {
    margin: tokens.spacingHorizontalM,
    maxHeight: '40vh',
    overflow: 'auto',
  },
  errorMessage: {
    margin: 0,
    marginTop: tokens.spacingVerticalXS,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
  },
});
