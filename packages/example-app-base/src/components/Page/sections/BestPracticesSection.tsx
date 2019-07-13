import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { css } from 'office-ui-fabric-react';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown, MarkdownHeader } from '../../Markdown/index';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export interface IBestPracticesSectionProps extends IPageSectionPropsWithSectionName {
  bestPractices?: string;
  dos?: string;
  donts?: string;
}

export const BestPracticesSection: React.StatelessComponent<IBestPracticesSectionProps> = props => {
  const {
    className,
    fileNamePrefix,
    componentUrl,
    platform,
    sectionName,
    readableSectionName,
    bestPractices,
    dos,
    donts,
    style,
    id,
    title = 'Page'
  } = props;
  const bestPracticesUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: pascalize(sectionName!), baseUrl: componentUrl, platform })
    : undefined;
  const dosUrl = componentUrl ? getEditUrl({ name: fileNamePrefix || title, section: 'Dos', baseUrl: componentUrl, platform }) : undefined;
  const dontsUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: 'Donts', baseUrl: componentUrl, platform })
    : undefined;

  return (
    <div className={className} style={style}>
      <div className={styles.subSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.subHeading} id={id}>
            {readableSectionName || sectionName}
          </h2>
          {!!(bestPractices && bestPracticesUrl) && (
            <EditSection className={styles.edit} title={title} section="Best Practices" url={bestPracticesUrl} />
          )}
        </div>
        {bestPractices && (
          <div className={styles.content}>
            <Markdown>{bestPractices}</Markdown>
          </div>
        )}
      </div>
      {!!(dos || donts) && (
        <div className={styles.subSection}>
          <div className={styles.doSection}>
            <div className={styles.sectionHeader}>
              <MarkdownHeader as="h3" className={styles.smallSubHeading}>
                Do
              </MarkdownHeader>
              {dos && dosUrl && <EditSection className={styles.edit} title={title} section="Dos" url={dosUrl} />}
            </div>
            {dos && (
              <div className={css(styles.content, styles.doList)}>
                <Markdown>{dos}</Markdown>
              </div>
            )}
          </div>
          <div className={styles.dontSection}>
            <div className={styles.sectionHeader}>
              <MarkdownHeader as="h3" className={css(styles.smallSubHeading)}>
                Don&rsquo;t
              </MarkdownHeader>
              {donts && dontsUrl && <EditSection className={styles.edit} title={title} section="Don'ts" url={dontsUrl} />}
            </div>
            {donts && (
              <div className={css(styles.content, styles.dontList)}>
                <Markdown>{donts}</Markdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
