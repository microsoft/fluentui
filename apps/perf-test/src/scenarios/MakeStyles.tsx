import { ax, makeStyles, createDOMRenderer } from '@fluentui/make-styles';
import * as React from 'react';

const renderer = createDOMRenderer();

const useStyles = makeStyles({
  view: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    position: 'relative',
    minHeight: 0,
    minWidth: 0,
  },
  boxOuter: { alignSelf: 'flex-start', padding: '4px' },
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
  const classes = ax(styles.view, className);

  return <div className={classes} />;
};

const Box: React.FunctionComponent = () => {
  const styles = useStyles({ dir: 'ltr', renderer });
  const classes = ax(styles.boxOuter, styles.boxRow, styles.boxFixed, styles.boxColor3);

  return <View className={classes} />;
};

const Scenario = () => <Box />;

export default Scenario;
