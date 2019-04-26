import * as React from 'react';
import { Async, css } from 'office-ui-fabric-react';
import { pascalize } from '../../utilities/index2';
import { PageHeader } from '../PageHeader/index';
import { Markdown } from '../Markdown/index';
import { ScrollBars } from '../ScrollBars/index';
import { SideRail, ISideRailLink } from '../SideRail/index';
import {
  BestPracticesSection,
  ExamplesSection,
  FeedbackSection,
  ImplementationSection,
  MarkdownSection,
  OtherPageSection,
  OverviewSection,
  IBestPracticesSectionProps,
  IExamplesSectionProps,
  IImplementationSectionProps
} from './sections/index';
import { IPageProps, IPageSectionProps } from './Page.types';
import * as styles from './Page.module.scss';

const SECTION_STAGGER_INTERVAL = 0.05;

export interface IPageState {
  isMountedOffset?: boolean;
}

export class Page extends React.Component<IPageProps, IPageState> {
  public static defaultProps: Partial<IPageProps> = {
    showSideRail: true
  };

  public state: IPageState = {};

  private _async = new Async();

  public componentDidMount(): void {
    this._async.setTimeout(() => {
      this.forceUpdate(() => {
        this._async.setTimeout(() => {
          this.setState({ isMountedOffset: true });
        }, 10);
      });
    }, 10);
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { className } = this.props;

    return (
      <div className={css(styles.Page, className)}>
        {this._getPageHeader()}
        <div className={styles.main}>
          {this._pageContent()}
          {this._getSideRail()}
        </div>
      </div>
    );
  }

  private _pageContent = (): JSX.Element | undefined => {
    const { sectionWrapperClassName, showSideRail } = this.props;
    const { isMountedOffset } = this.state;

    return (
      <div
        className={css(
          styles.sectionWrapper,
          showSideRail && styles.showSideRail,
          isMountedOffset && styles.isMountedOffset,
          sectionWrapperClassName
        )}
      >
        {// Map over array of section objects in order to add increasing transitionDelay to stagger load animation.
        this._getPageSections().map((section: IPageSectionProps, sectionIndex: number) => {
          const { renderAs: RootType = OtherPageSection, className, style, ...rest } = section;
          return (
            <RootType
              key={sectionIndex}
              {...rest}
              className={css(className, styles.section)}
              style={{ transitionDelay: `${sectionIndex * SECTION_STAGGER_INTERVAL}s` }}
            />
          );
        })}
      </div>
    );
  };

  private _getPageSections = (): IPageSectionProps[] => {
    const {
      allowNativeProps,
      allowNativePropsForComponentName,
      bestPractices,
      design,
      donts,
      dos,
      exampleKnobs,
      examples,
      fileNamePrefix,
      isFeedbackVisible,
      addlContent,
      addlContentTitle,
      nativePropsElement,
      otherSections,
      overview,
      componentUrl,
      platform,
      propertiesTablesSources,
      title,
      usage
    } = this.props;

    const sectionProps: IPageSectionProps = {
      fileNamePrefix,
      componentUrl,
      platform,
      title
    };

    const sections: IPageSectionProps[] = [];

    overview && sections.push({ renderAs: OverviewSection, ...sectionProps, content: overview });

    addlContent && sections.push({ renderAs: MarkdownSection, sectionName: addlContentTitle, ...sectionProps, content: addlContent });

    if (bestPractices || (dos && donts)) {
      const bestPracticesProps: IBestPracticesSectionProps = { renderAs: BestPracticesSection, ...sectionProps, bestPractices, dos, donts };
      sections.push(bestPracticesProps);
    }

    usage &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Usage',
        readableSectionName: 'Usage Guidelines',
        content: usage
      });

    design &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Design',
        readableSectionName: 'Design Guidelines',
        content: design
      });

    if (examples) {
      const examplesProps: IExamplesSectionProps = { renderAs: ExamplesSection, ...sectionProps, exampleKnobs, examples };
      sections.push(examplesProps);
    }

    if (propertiesTablesSources) {
      const propertiesTablesProps: IImplementationSectionProps = {
        renderAs: ImplementationSection,
        ...sectionProps,
        allowNativeProps,
        nativePropsElement,
        allowNativePropsForComponentName,
        propertiesTablesSources
      };
      sections.push(propertiesTablesProps);
    }

    otherSections &&
      otherSections.forEach((PageSection: IPageSectionProps) =>
        sections.push({
          renderAs: OtherPageSection,
          className: PageSection.className,
          ...sectionProps,
          sectionName: PageSection.sectionName,
          content: PageSection.content,
          editUrl: PageSection.editUrl
        })
      );

    isFeedbackVisible && title && sections.push({ renderAs: FeedbackSection, ...sectionProps });

    return sections;
  };

  private _getPageHeader = (): JSX.Element | null => {
    const { title, subTitle } = this.props;
    return title ? <PageHeader pageTitle={title} pageSubTitle={subTitle} /> : null;
  };

  private _getSideRail = (): JSX.Element | undefined => {
    const { contact, related, showSideRail } = this.props;

    if (showSideRail) {
      let processedRelated: JSX.Element | ISideRailLink[] | undefined;
      if (typeof related === 'string') {
        processedRelated = <Markdown>{related}</Markdown>;
      } else {
        processedRelated = related;
      }

      let processedContacts: JSX.Element | ISideRailLink[] | undefined;
      if (typeof contact === 'string') {
        processedContacts = <Markdown>{contact}</Markdown>;
      } else {
        processedContacts = contact;
      }

      const jumpLinks = this._getJumpLinks();

      return (
        <div className={css(styles.sideRailWrapper)}>
          <ScrollBars viewClassName={styles.sideRailScrollbarsView}>
            <SideRail jumpLinks={jumpLinks} relatedLinks={processedRelated} contactLinks={processedContacts} observe={true} />
          </ScrollBars>
        </div>
      );
    }
    return undefined;
  };

  private _getJumpLinks = (): ISideRailLink[] => {
    const {
      bestPractices,
      design,
      dos,
      donts,
      examples,
      isFeedbackVisible,
      addlContent,
      addlContentTitle,
      otherSections,
      overview,
      propertiesTablesSources,
      usage
    } = this.props;

    const links: ISideRailLink[] = [];

    if (overview) {
      links.push({
        text: 'Overview',
        url: 'Overview'
      });
    }

    if (addlContent && addlContentTitle) {
      links.push({
        text: addlContentTitle,
        url: pascalize(addlContentTitle)
      });
    }

    if (bestPractices || dos || donts) {
      links.push({
        text: 'Best Practices',
        url: 'BestPractices'
      });
    }

    if (usage) {
      links.push({
        text: 'Usage Guidelines',
        url: 'Usage'
      });
    }

    if (design) {
      links.push({
        text: 'Design Guidelines',
        url: 'Design'
      });
    }

    if (examples) {
      links.push({
        text: 'Usage',
        url: 'Usage'
      });
    }

    if (propertiesTablesSources) {
      links.push({
        text: 'Implementation',
        url: 'Implementation'
      });
    }

    if (otherSections) {
      otherSections.map((PageSection: IPageSectionProps) => {
        PageSection.sectionName &&
          links.push({
            text: PageSection.sectionName,
            url: pascalize(PageSection.sectionName)
          });
      });
    }

    if (isFeedbackVisible) {
      links.push({
        text: 'Feedback',
        url: 'Feedback'
      });
    }

    return links;
  };
}
