import * as React from 'react';
import { EditSection } from '../../EditSection/index';
import { css } from 'office-ui-fabric-react';
import { camelize, getEditUrl, pascalize } from '../../../utilities/index2';
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
  const sectionClassName = camelize(sectionName);
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
    <div className={css(styles.subSection, `Page-usage`)} key="best-practices">
      <div className={css(styles.sectionHeader, `Page-usageHeader`)}>
        <h2 className={css(styles.subHeading, `Page-subHeading`)} id={sectionId}>
          {readableSectionName}
        </h2>
        {bestPractices && bestPracticesUrl && (
          <EditSection
            className={styles.edit}
            title={title}
            section={sectionId}
            readableSection={readableSectionName}
            url={bestPracticesUrl}
          />
        )}
      </div>
      {bestPractices && (
        <div className={css(styles.content, `Page-${sectionClassName}SectionContent`)}>
          <Markdown>{bestPractices}</Markdown>
        </div>
      )}
    </div>
  );

  if (dos || donts) {
    dosAndDonts.push(
      <div className={css(styles.subSection, `Page-doDontSections`)} key="dosAndDonts">
        <div className={css(styles.doSection, `Page-doSection`)}>
          <div className={css(styles.sectionHeader, `Page-doSectionHeader`)}>
            <h3 className={css(styles.smallSubHeading)}>Do</h3>
            {dos && dosUrl && <EditSection className={styles.edit} title={title} section="Dos" url={dosUrl} />}
          </div>
          {dos && (
            <div className={css(styles.content, `Page-${sectionClassName}SectionContent`, styles.doList)}>
              <Markdown>{dos}</Markdown>
            </div>
          )}
        </div>
        <div className={css(styles.dontSection, `Page-doSection Page-doSection--dont`)}>
          <div className={css(styles.sectionHeader, `Page-doSectionHeader`)}>
            <h3 className={css(styles.smallSubHeading)}>Don&rsquo;t</h3>
            {donts && dontsUrl && <EditSection className={styles.edit} title={title} section="Donts" url={dontsUrl} />}
          </div>
          {donts && (
            <div className={css(styles.content, `Page-${sectionClassName}SectionContent`, styles.dontList)}>
              <Markdown>{donts}</Markdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={css(`Page-${sectionClassName}Section`, className)} style={style}>
      {dosAndDonts}
    </div>
  );
};
