import * as React from 'react';
import { Spinner } from '@fluentui/react-headless-components-preview/spinner';
import { SpinnerIosRegular } from '@fluentui/react-icons';

import styles from '../../../../../../bebop/components/spinner.module.css';
import storySource from './SpinnerLabels.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Labels = (): React.ReactNode => (
  <div className={styles.demoCol}>
    <Spinner
      className={styles.spinner}
      label="Loading…"
      spinnerTail={{
        className: styles.tail,
        children: <SpinnerIosRegular />,
      }}
    />
    <Spinner
      className={styles.column}
      label="Saving changes"
      labelPosition="below"
      spinnerTail={{
        className: styles.tail,
        children: <SpinnerIosRegular />,
      }}
    />
  </div>
);

Labels.parameters = withStorySource(storySource);
