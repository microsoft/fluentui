import * as React from 'react';
import { FeedbackList } from '../../FeedbackList/index';
import { css } from 'office-ui-fabric-react';
import { camelize, pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from './FeedbackSection.module.scss';

export const FeedbackSection: React.StatelessComponent<IPageSectionProps> = props => {
  const { className, sectionName = 'Feedback', style, title } = props;
  const { readableSectionName = sectionName } = props;
  const sectionClassName = camelize(sectionName);
  const sectionId = pascalize(sectionName);
  const feedbackList = <FeedbackList title={title!} />;

  return (
    <div className={css(styles.feedbackSection, `Page-${sectionClassName}Section`, className)} style={style}>
      <div className={css(styles.sectionHeader, `Page-${sectionClassName}SectionHeader`)}>
        <h2 className={css(styles.subHeading, `Page-subHeading`)} id={sectionId}>
          {readableSectionName}
        </h2>
      </div>
      <div className={css(styles.feedbackList, `Page-${sectionClassName}SectionContent`)}>{feedbackList}</div>
    </div>
  );
};
