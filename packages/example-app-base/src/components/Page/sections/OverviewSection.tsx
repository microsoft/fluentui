import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export const OverviewSection: React.FunctionComponent<IPageSectionPropsWithSectionName> = props => {
  const {
    className,
    content: overview,
    fileNamePrefix,
    componentUrl,
    platform,
    sectionName,
    readableSectionName = sectionName,
    style,
    id,
    title = 'Page',
  } = props;
  const editUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: pascalize(sectionName!), baseUrl: componentUrl, platform })
    : undefined;

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        {/* This heading must be programmatically focusable for simulating jumping to an anchor */}
        <h2 className={styles.subHeading} id={id} tabIndex={-1}>
          {readableSectionName}
        </h2>
        {editUrl && <EditSection className={styles.edit} title={title} section={readableSectionName!} url={editUrl} />}
      </div>
      <div className={styles.content}>
        <Markdown>{overview}</Markdown>
      </div>
    </div>
  );
};
