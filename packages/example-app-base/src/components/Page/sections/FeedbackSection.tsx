import * as React from 'react';
import { FeedbackList } from '../../FeedbackList/index';
import { css } from 'office-ui-fabric-react';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export const FeedbackSection: React.StatelessComponent<IPageSectionPropsWithSectionName> = props => {
  const { className, sectionName, readableSectionName, style, title, id } = props;

  return (
    <div className={css(styles.feedbackSection, className)} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={id}>
          {readableSectionName || sectionName}
        </h2>
      </div>
      <div className={styles.feedbackList}>
        <FeedbackList title={title!} />
      </div>
    </div>
  );
};
