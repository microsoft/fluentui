import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import { ChevronRightRegular } from '@fluentui/react-icons';

import styles from './breadcrumb.module.css';
import storySource from './BreadcrumbDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <Breadcrumb aria-label="Navigation" className={styles.crumb} list={{ className: styles.list }}>
    <BreadcrumbItem className={styles.item}>
      <BreadcrumbButton className={styles.btn}>Home</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider className={styles.divider}>
      <ChevronRightRegular aria-hidden />
    </BreadcrumbDivider>
    <BreadcrumbItem className={styles.item}>
      <BreadcrumbButton className={styles.btn}>Settings</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider className={styles.divider}>
      <ChevronRightRegular aria-hidden />
    </BreadcrumbDivider>
    <BreadcrumbItem className={styles.item}>
      <BreadcrumbButton current className={styles.btn}>
        Profile
      </BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);

Default.parameters = withStorySource(storySource);
