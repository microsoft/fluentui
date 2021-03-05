import * as React from 'react';
import { css } from '@fluentui/react';
import { IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';
import { EditSection } from '../../EditSection/index';
import { Markdown } from '../../Markdown/index';

export const OtherPageSection: React.FunctionComponent<IPageSectionProps> = props => {
  const {
    // prettier-ignore
    className,
    content,
    editUrl,
    sectionName,
    readableSectionName = sectionName,
    style,
    id,
    title = 'Page',
  } = props;

  const editSection = editUrl && (
    <EditSection className={styles.edit} title={title} section={readableSectionName || 'Other'} url={editUrl} />
  );

  return (
    <div className={className} style={style}>
      {readableSectionName ? (
        <div className={styles.sectionHeader}>
          {/* This heading must be programmatically focusable for simulating jumping to an anchor */}
          <h2 className={styles.subHeading} id={id} tabIndex={-1}>
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
