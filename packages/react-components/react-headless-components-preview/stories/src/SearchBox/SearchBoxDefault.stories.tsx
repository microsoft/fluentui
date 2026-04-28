import * as React from 'react';
import { SearchBox } from '@fluentui/react-headless-components-preview/search-box';
import { SearchRegular } from '@fluentui/react-icons';

// SearchBox reuses the input CSS module per the story authoring guide.
import styles from '../../../../../../theme/components/input.module.css';
import storySource from './SearchBoxDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <SearchBox
      placeholder="Search…"
      className={styles.wrap}
      contentBefore={{
        className: styles.affix,
        children: <SearchRegular className={styles.affixIcon} aria-hidden />,
      }}
      input={{ className: styles.input }}
    />
  </div>
);

Default.parameters = withStorySource(storySource);
