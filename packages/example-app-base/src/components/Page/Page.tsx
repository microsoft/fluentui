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
          'Page-content',
          styles.sectionWrapper,
          showSideRail && styles.showSideRail,
          isMountedOffset && styles.isMountedOffset,
          sectionWrapperClassName
        )}
      >
        {// Map over array of section objects in order to add increasing transitionDelay to stagger load animation.
        this._getPageSections().map((section: IPageSectionProps & React.Attributes, sectionIndex: number) => {
          const { renderAs: SectionType = OtherPageSection, className, style, ...rest } = section;
          return (
            // All the props objects will include a key
            // tslint:disable-next-line:jsx-key
            <SectionType
              {...rest}
              className={css(className, styles.section)}
              style={{ transitionDelay: `${sectionIndex * SECTION_STAGGER_INTERVAL}s` }}
            />
          );
        })}
      </div>
    );
  };

  private _getPageSections = (): (IPageSectionProps & React.Attributes)[] => {
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
      hideImplementationTitle,
      jsonDocs,
      title,
      usage
    } = this.props;

    const sectionProps: IPageSectionProps = {
      fileNamePrefix,
      componentUrl,
      platform,
      title
    };

    const sections: (IPageSectionProps & React.Attributes)[] = [];

    overview && sections.push({ renderAs: OverviewSection, ...sectionProps, content: overview, key: 'Overview' });

    addlContent &&
      sections.push({ renderAs: MarkdownSection, sectionName: addlContentTitle, ...sectionProps, content: addlContent, key: 'Markdown' });

    if (bestPractices || (dos && donts)) {
      const bestPracticesProps: IBestPracticesSectionProps & React.Attributes = {
        renderAs: BestPracticesSection,
        ...sectionProps,
        bestPractices,
        dos,
        donts,
        key: 'BestPractices'
      };
      sections.push(bestPracticesProps);
    }

    usage &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Usage',
        readableSectionName: 'Usage Guidelines',
        key: 'Usage',
        content: usage
      });

    design &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Design',
        readableSectionName: 'Design Guidelines',
        key: 'Design',
        content: design
      });

    if (examples) {
      const examplesProps: IExamplesSectionProps & React.Attributes = {
        renderAs: ExamplesSection,
        ...sectionProps,
        exampleKnobs,
        examples,
        key: 'Examples'
      };
      sections.push(examplesProps);
    }

    if (propertiesTablesSources || jsonDocs) {
      const propertiesTablesProps: IImplementationSectionProps & React.Attributes = {
        renderAs: ImplementationSection,
        ...sectionProps,
        allowNativeProps,
        nativePropsElement,
        allowNativePropsForComponentName,
        propertiesTablesSources,
        hideImplementationTitle,
        jsonDocs,
        key: 'Implementation'
      };
      sections.push(propertiesTablesProps);
    }

    otherSections &&
      otherSections.forEach((section: IPageSectionProps, index: number) =>
        sections.push({
          renderAs: OtherPageSection,
          key: section.sectionName || String(index),
          ...sectionProps,
          ...section
        })
      );

    isFeedbackVisible && title && sections.push({ renderAs: FeedbackSection, ...sectionProps, key: 'Feedback' });

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
        // don't show section if the content is empty
        processedRelated = related.trim() ? <Markdown>{related}</Markdown> : undefined;
      } else {
        processedRelated = related;
      }

      let processedContacts: JSX.Element | ISideRailLink[] | undefined;
      if (typeof contact === 'string') {
        processedContacts = contact.trim() ? <Markdown>{contact}</Markdown> : undefined;
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
      usage,
      jsonDocs
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

    if (jsonDocs || propertiesTablesSources) {
      links.push({
        text: 'Implementation',
        url: 'Implementation'
      });
    }

    if (otherSections) {
      for (const section of otherSections) {
        section.sectionName &&
          links.push({
            text: section.sectionName,
            url: pascalize(section.sectionName)
          });
      }
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
