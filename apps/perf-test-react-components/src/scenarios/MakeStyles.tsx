import * as React from 'react';

import styles from './MakeStylesStyles.module.css';

/**
 * Historically this scenario benchmarked `@griffel/core` (`makeStyles` + `mergeClasses` with an
 * explicit renderer). With the Griffel -> Tailwind + CSS Modules migration the Griffel path no
 * longer ships, so the scenario is repointed at the replacement styling path: static CSS Modules
 * classes composed with plain string concatenation. The rendered DOM and computed styles are
 * unchanged (see MakeStylesStyles.module.css); what is measured is now the mount cost of the
 * shipped styling approach.
 *
 * The file keeps its historical name so the scenario id stays stable in perf-test output.
 */

const View: React.FunctionComponent<{ className?: string }> = props => {
  const { className } = props;

  const classes = className ? `${styles.view} ${className}` : styles.view;

  return <div className={classes} />;
};

const Box: React.FunctionComponent = () => {
  const classes = `${styles.boxOuter} ${styles.boxRow} ${styles.boxFixed} ${styles.boxColor3}`;

  return <View className={classes} />;
};

const Scenario = () => <Box />;

export default Scenario;
