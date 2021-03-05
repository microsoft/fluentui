import * as React from 'react';
import { FeedbackList } from '../../FeedbackList/index';
import { css } from '@fluentui/react';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export const FeedbackSection: React.FunctionComponent<IPageSectionPropsWithSectionName> = props => {
  const { className, readableSectionName = props.sectionName, style, title, id } = props;

  return (
    <div className={css(styles.feedbackSection, className)} style={style}>
      <div className={styles.sectionHeader}>
        {/* This heading must be programmatically focusable for simulating jumping to an anchor */}
        <h2 className={styles.subHeading} id={id} tabIndex={-1}>
          {readableSectionName}
        </h2>
      </div>
      <div className={styles.feedbackList}>
        <FeedbackList title={title!} />
      </div>
    </div>
  );
};
