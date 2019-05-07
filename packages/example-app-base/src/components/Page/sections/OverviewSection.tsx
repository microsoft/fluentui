import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export const OverviewSection: React.StatelessComponent<IPageSectionPropsWithSectionName> = props => {
  const {
    className,
    content: overview,
    fileNamePrefix,
    componentUrl,
    platform,
    sectionName,
    readableSectionName,
    style,
    id,
    title = 'Page'
  } = props;
  const editUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: pascalize(sectionName!), baseUrl: componentUrl, platform })
    : undefined;

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={id}>
          {readableSectionName || sectionName}
        </h2>
        {editUrl && <EditSection className={styles.edit} title={title} section={readableSectionName!} url={editUrl} />}
      </div>
      <div className={styles.content}>
        <Markdown>{overview}</Markdown>
      </div>
    </div>
  );
};
