import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { css } from 'office-ui-fabric-react';
import { camelize, getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from './OverviewSection.module.scss';

export const OverviewSection: React.StatelessComponent<IPageSectionProps> = props => {
  const { className, content: overview, fileNamePrefix, componentUrl, platform, sectionName = 'Overview', style, title = 'Page' } = props;
  const { readableSectionName = sectionName } = props;
  const sectionClassName = camelize(sectionName);
  const sectionId = pascalize(sectionName);
  const editUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: sectionId, baseUrl: componentUrl, platform })
    : undefined;

  return (
    <div className={css(`Page-${sectionClassName}Section`, className)} style={style}>
      <div className={css(styles.sectionHeader, `Page-${sectionClassName}SectionHeader`)}>
        <h2 className={css(styles.subHeading, `Page-subHeading`)} id={sectionId}>
          {readableSectionName}
        </h2>
        {editUrl && (
          <EditSection className={styles.edit} title={title} section={sectionId} readableSection={readableSectionName} url={editUrl} />
        )}
      </div>
      <div className={css(styles.content, `Page-${sectionClassName}SectionContent`)}>
        <Markdown>{overview}</Markdown>
      </div>
    </div>
  );
};
