import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from './OtherPageSection.module.scss';
import { EditSection } from '../../EditSection/index';
import { Markdown } from '../../Markdown';

export const OtherPageSection: React.StatelessComponent<IPageSectionProps> = props => {
  const { className, content, editUrl, sectionName, readableSectionName = sectionName, style, title = 'Page' } = props;

  const sectionId = sectionName ? pascalize(sectionName || 'Other') : '';

  const editSection = editUrl && <EditSection className={styles.edit} section={`${title} ${sectionName || ''}`} url={editUrl} />;

  return (
    <div className={className} style={style}>
      {readableSectionName ? (
        <div className={styles.sectionHeader}>
          <h2 className={styles.subHeading} id={sectionId}>
            {readableSectionName}
          </h2>
          {editSection}
        </div>
      ) : (
        <div className={styles.editSection}>{editSection}</div>
      )}
      <div className={css(styles.content, editUrl && !readableSectionName && styles.contentWithoutHeader)}>
        {typeof content === 'string' ? <Markdown>{content}</Markdown> : content}
      </div>
    </div>
  );
};
