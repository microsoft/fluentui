import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';

export const OverviewSection: React.StatelessComponent<IPageSectionProps> = props => {
  const { className, content: overview, fileNamePrefix, componentUrl, platform, sectionName = 'Overview', style, title = 'Page' } = props;
  const { readableSectionName = sectionName } = props;
  const sectionId = pascalize(sectionName);
  const editUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: sectionId, baseUrl: componentUrl, platform })
    : undefined;

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={sectionId}>
          {readableSectionName}
        </h2>
        {editUrl && <EditSection className={styles.edit} title={title} section={readableSectionName} url={editUrl} />}
      </div>
      <div className={styles.content}>
        <Markdown>{overview}</Markdown>
      </div>
    </div>
  );
};
