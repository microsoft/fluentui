import * as React from 'react';
import { FeedbackList } from '../../FeedbackList/index';
import { css } from 'office-ui-fabric-react';
import { pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';

export const FeedbackSection: React.StatelessComponent<IPageSectionProps> = props => {
  const { className, sectionName = 'Feedback', style, title } = props;
  const { readableSectionName = sectionName } = props;
  const sectionId = pascalize(sectionName);
  const feedbackList = <FeedbackList title={title!} />;

  return (
    <div className={css(styles.feedbackSection, className)} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={sectionId}>
          {readableSectionName}
        </h2>
      </div>
      <div className={styles.feedbackList}>{feedbackList}</div>
    </div>
  );
};
