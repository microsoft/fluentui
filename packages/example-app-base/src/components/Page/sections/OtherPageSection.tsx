import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { camelize, pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from './OtherPageSection.module.scss';
import { EditSection } from '../../EditSection/index';

export interface IOtherPageSectionProps extends IPageSectionProps {
  sectionName?: string;
}

export const OtherPageSection: React.StatelessComponent<IOtherPageSectionProps> = props => {
  const { className, content, editUrl, sectionName, readableSectionName = sectionName, style, title = 'Page' } = props;

  const sectionClassName = sectionName ? camelize(sectionName) : '';
  const sectionId = sectionName ? pascalize(sectionName) : '';

  const editSection = editUrl && (
    <EditSection className={styles.edit} title={title} section={sectionId} readableSection={readableSectionName} url={editUrl} />
  );

  return (
    <div className={css(`Page-${sectionClassName}Section`, className)} style={style}>
      {readableSectionName ? (
        <div className={css(styles.sectionHeader, `Page-${sectionClassName}SectionHeader`)}>
          <h2 className={css(styles.subHeading, `Page-subHeading`)} id={sectionId}>
            {readableSectionName}
          </h2>
          {editSection}
        </div>
      ) : (
        <div className={styles.editSection}>{editSection}</div>
      )}
      <div className={css(editUrl && styles.contentWithoutHeader, styles.content)}>{content}</div>
    </div>
  );
};
