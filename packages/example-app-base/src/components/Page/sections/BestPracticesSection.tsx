import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { css } from 'office-ui-fabric-react';
import { getEditUrl, pascalize } from '../../../utilities/index2';
import { Markdown } from '../../Markdown/index';
import { IPageSectionProps } from '../Page.types';
import * as styles from './BestPracticesSection.module.scss';

export interface IBestPracticesSectionProps extends IPageSectionProps {
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
    sectionName = 'Best Practices',
    bestPractices,
    dos,
    donts,
    style,
    title = 'Page'
  } = props;
  const { readableSectionName = sectionName } = props;
  const sectionId = pascalize(sectionName);
  const bestPracticesUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: sectionId, baseUrl: componentUrl, platform })
    : undefined;
  const dosUrl = componentUrl ? getEditUrl({ name: fileNamePrefix || title, section: 'Dos', baseUrl: componentUrl, platform }) : undefined;
  const dontsUrl = componentUrl
    ? getEditUrl({ name: fileNamePrefix || title, section: 'Donts', baseUrl: componentUrl, platform })
    : undefined;

  const dosAndDonts: JSX.Element[] = [];

  dosAndDonts.push(
    <div className={styles.subSection} key="best-practices">
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={sectionId}>
          {readableSectionName}
        </h2>
        {bestPractices && bestPracticesUrl && (
          <EditSection
            className={styles.edit}
            section={title + ' Best Practices'}
            readableSection={readableSectionName}
            url={bestPracticesUrl}
          />
        )}
      </div>
      {bestPractices && (
        <div className={styles.content}>
          <Markdown>{bestPractices}</Markdown>
        </div>
      )}
    </div>
  );

  if (dos || donts) {
    dosAndDonts.push(
      <div className={styles.subSection} key="dosAndDonts">
        <div className={styles.doSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.smallSubHeading}>Do</h3>
            {dos && dosUrl && <EditSection className={styles.edit} section={title + ' Dos'} url={dosUrl} />}
          </div>
          {dos && (
            <div className={css(styles.content, styles.doList)}>
              <Markdown>{dos}</Markdown>
            </div>
          )}
        </div>
        <div className={styles.dontSection}>
          <div className={styles.sectionHeader}>
            <h3 className={css(styles.smallSubHeading)}>Don&rsquo;t</h3>
            {donts && dontsUrl && <EditSection className={styles.edit} section={title + " Don'ts"} url={dontsUrl} />}
          </div>
          {donts && (
            <div className={css(styles.content, styles.dontList)}>
              <Markdown>{donts}</Markdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {dosAndDonts}
    </div>
  );
};
