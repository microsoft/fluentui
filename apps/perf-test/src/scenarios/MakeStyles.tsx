import { mergeClasses, makeStyles, createDOMRenderer } from '@griffel/core';
import * as React from 'react';

const renderer = createDOMRenderer(document);

const useStyles = makeStyles({
  view: {
    alignItems: 'stretch',
    borderLeftWidth: 0,
    borderLeftStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    marginLeft: 0,
    paddingLeft: 0,
    position: 'relative',
    minHeight: 0,
    minWidth: 0,
  },
  boxOuter: { alignSelf: 'flex-start', paddingLeft: '4px' },
  boxRow: { flexDirection: 'row' },
  boxColor0: { backgroundColor: '#14171A' },
  boxColor1: { backgroundColor: '#AAB8C2' },
  boxColor2: { backgroundColor: '#E6ECF0' },
  boxColor3: { backgroundColor: '#FFAD1F' },
  boxColor4: { backgroundColor: '#F45D22' },
  boxColor5: { backgroundColor: '#E0245E' },
  boxFixed: { width: '6px', height: '6px' },
});

const View: React.FunctionComponent<{ className?: string }> = props => {
  const { className } = props;

  const styles = useStyles({ dir: 'ltr', renderer });
  const classes = mergeClasses(styles.view, className);

  return <div className={classes} />;
};

const Box: React.FunctionComponent = () => {
  const styles = useStyles({ dir: 'ltr', renderer });
  const classes = mergeClasses(styles.boxOuter, styles.boxRow, styles.boxFixed, styles.boxColor3);

  return <View className={classes} />;
};

const Scenario = () => <Box />;

export default Scenario;
