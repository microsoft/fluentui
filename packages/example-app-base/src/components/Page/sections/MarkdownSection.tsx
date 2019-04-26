import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { css } from 'office-ui-fabric-react';
import { camelize, getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from './MarkdownSection.module.scss';

export const MarkdownSection: React.StatelessComponent<IPageSectionProps> = props => {
  const {
    className,
    content: markdown,
    fileNamePrefix,
    componentUrl,
    platform,
    sectionName,
    readableSectionName = sectionName,
    style,
    title = 'Page'
  } = props;
  const sectionClassName = sectionName ? camelize(sectionName) : 'markdown';
  const sectionId = sectionName ? pascalize(sectionName) : 'Markdown';
  const editUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: sectionId, baseUrl: componentUrl, platform })
    : undefined;

  const editSection = editUrl && (
    <EditSection
      className={styles.edit}
      title={title}
      section={sectionId}
      readableSection={readableSectionName || 'Markdown'}
      url={editUrl}
    />
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
        editUrl && <div className={styles.editSection}>{editSection}</div>
      )}
      <div className={css(styles.content, `Page-${sectionClassName}SectionContent`)}>
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
};
