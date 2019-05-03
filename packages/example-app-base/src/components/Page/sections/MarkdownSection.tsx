import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { EditSection } from '../../EditSection/index';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from './OtherPageSection.module.scss';

export const MarkdownSection: React.StatelessComponent<IPageSectionProps> = props => {
  const {
    // prettier-ignore
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
  const sectionId = pascalize(sectionName || 'Markdown');
  const editUrl =
    props.editUrl || (componentUrl && getEditUrl({ name: fileNamePrefix || title, section: sectionId, baseUrl: componentUrl, platform }));

  const editSection = editUrl && <EditSection className={styles.edit} section={`${title} ${sectionName}`} url={editUrl} />;

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
        editUrl && <div className={styles.editSection}>{editSection}</div>
      )}
      <div className={css(styles.content, editUrl && !readableSectionName && styles.contentWithoutHeader)}>
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
};
