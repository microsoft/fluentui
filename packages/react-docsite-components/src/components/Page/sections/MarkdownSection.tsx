import * as React from 'react';
import { css } from '@fluentui/react';
import { EditSection } from '../../EditSection/index';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';

export const MarkdownSection: React.FunctionComponent<IPageSectionProps> = props => {
  const {
    className,
    content: markdown,
    fileNamePrefix,
    componentUrl,
    platform,
    sectionName,
    readableSectionName = sectionName,
    style,
    id,
    title = 'Page',
  } = props;
  const editUrl =
    props.editUrl ||
    (componentUrl &&
      getEditUrl({
        name: fileNamePrefix || title,
        section: pascalize(sectionName || 'Markdown'),
        baseUrl: componentUrl,
        platform,
      }));

  const editSection = editUrl && (
    <EditSection
      className={styles.edit}
      title={sectionName}
      section={readableSectionName || 'Markdown'}
      url={editUrl}
    />
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
        editUrl && <div className={styles.editSection}>{editSection}</div>
      )}
      <div className={css(styles.content, editUrl && !readableSectionName && styles.contentWithoutHeader)}>
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
};
