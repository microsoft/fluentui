import * as React from 'react';
import { Async, css, mergeStyles, Customizer, ICustomizations, ILinkProps } from '@fluentui/react';
import { slugify } from '../../utilities/index2';
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
  IImplementationSectionProps,
} from './sections/index';
import { IPageProps, IPageSectionProps } from './Page.types';
import * as styles from './Page.module.scss';
import { sideRailWidth } from '../../styles/constants';
import { getLinkColors } from '../../utilities/getLinkColors';
import { BannerSection } from './sections/BannerSection';

const SECTION_STAGGER_INTERVAL = 0.05;
/** Section key/id prefix for sections which don't have a title */
const GENERIC_SECTION = 'genericsection';

export interface IPageState {
  isMountedOffset?: boolean;
}

const linkCustomizations: Partial<ILinkProps> = {
  styles: props => {
    const { semanticColors } = props.theme;
    return {
      root: getLinkColors(semanticColors.link, semanticColors.linkHovered),
    };
  },
};

const scopedSettings: ICustomizations['scopedSettings'] = {
  Link: linkCustomizations,
};

// TODO: I think this component should be templated to forward the TPlatform type to props.
//        It can then be used in JSX like this:
//        <Page<Platform> {...props} />
// https://mariusschulz.com/blog/typescript-2-9-passing-generics-to-jsx-elements
// This change will expose a domino effect where other page components in this package should use
//    IPageSection props with a templated arg rather than just defaulting to string. These
//    issues could probably be more easily found by removing the default TPlatform generic type.
// To work around this issue for now, a bunch of "as IPageSectionProps[]" casts were added to public-docsite package.
// export class Page<TPlatform extends string> extends React.Component<IPageProps<TPlatform>, IPageState> {
export class Page extends React.Component<IPageProps, IPageState> {
  public static defaultProps: Partial<IPageProps> = {
    showSideRail: true,
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

    const sections = this._getPageSections();
    return (
      <Customizer scopedSettings={scopedSettings}>
        <div className={css(styles.Page, className)}>
          {this._getPageHeader()}
          <div className={styles.main}>
            {this._pageContent(sections)}
            {this._getSideRail(sections)}
          </div>
        </div>
      </Customizer>
    );
  }

  private _pageContent = (sections: IPageSectionProps[]): JSX.Element | undefined => {
    const { sectionWrapperClassName, showSideRail } = this.props;
    const { isMountedOffset } = this.state;

    return (
      <div
        className={css(
          styles.sectionWrapper,
          showSideRail && styles.showSideRail,
          isMountedOffset && styles.isMountedOffset,
          sectionWrapperClassName,
        )}
      >
        {
          // Map over array of section objects in order to add increasing transitionDelay to stagger load animation.
          sections.map((section: IPageSectionProps, sectionIndex: number) => {
            const { renderAs: SectionType = OtherPageSection, className, style, ...rest } = section;
            return (
              <SectionType
                key={section.id || sectionIndex}
                {...rest}
                className={css(className, styles.section)}
                style={{ transitionDelay: `${sectionIndex * SECTION_STAGGER_INTERVAL}s` }}
              />
            );
          })
        }
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
      hideImplementationTitle,
      jsonDocs,
      title,
      usage,
      accessibility,
      banner,
    } = this.props;

    const sectionProps: IPageSectionProps = {
      fileNamePrefix,
      componentUrl,
      platform,
      title,
    };

    const sections: IPageSectionProps[] = [];

    banner &&
      sections.push({
        renderAs: BannerSection,
        ...sectionProps,
        content: banner.message,
        sectionName: banner.title,
      });

    overview &&
      sections.push({ renderAs: OverviewSection, ...sectionProps, sectionName: 'Overview', content: overview });

    addlContent &&
      sections.push({
        renderAs: MarkdownSection,
        sectionName: addlContentTitle,
        ...sectionProps,
        content: addlContent,
        id: 'markdown',
      });

    if (bestPractices || (dos && donts)) {
      const bestPracticesProps: IBestPracticesSectionProps = {
        renderAs: BestPracticesSection,
        ...sectionProps,
        sectionName: 'Best practices',
        bestPractices,
        dos,
        donts,
      };
      sections.push(bestPracticesProps);
    }

    usage &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Usage',
        readableSectionName: 'Usage Guidelines',
        content: usage,
      });

    design &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Design',
        readableSectionName: 'Design Guidelines',
        content: design,
      });

    if (examples) {
      const examplesProps: IExamplesSectionProps = {
        renderAs: ExamplesSection,
        ...sectionProps,
        sectionName: 'Usage',
        exampleKnobs,
        examples,
      };
      sections.push(examplesProps);
    }

    if (propertiesTablesSources || jsonDocs) {
      const propertiesTablesProps: IImplementationSectionProps = {
        renderAs: ImplementationSection,
        ...sectionProps,
        sectionName: 'Implementation',
        allowNativeProps,
        nativePropsElement,
        allowNativePropsForComponentName,
        propertiesTablesSources,
        hideImplementationTitle,
        jsonDocs,
      };
      sections.push(propertiesTablesProps);
    }

    accessibility &&
      sections.push({
        renderAs: MarkdownSection,
        ...sectionProps,
        sectionName: 'Accessibility',
        readableSectionName: 'Accessibility best practices',
        content: accessibility,
      });

    otherSections &&
      otherSections.forEach((section: IPageSectionProps, index: number) =>
        sections.push({
          renderAs: OtherPageSection,
          ...sectionProps,
          ...section,
        }),
      );

    isFeedbackVisible &&
      title &&
      sections.push({ renderAs: FeedbackSection, ...sectionProps, sectionName: 'Feedback' });

    // Ensure all the sections have an ID
    for (let i = 0; i < sections.length; i++) {
      sections[i].id = _getSectionId(sections[i], i);
    }

    return sections;
  };

  private _getPageHeader = (): JSX.Element | null => {
    const { showSideRail, title, subTitle, versionSwitcherDefinition } = this.props;
    return title ? (
      <PageHeader
        pageTitle={title}
        pageSubTitle={subTitle}
        versionSwitcherDefinition={versionSwitcherDefinition}
        className={mergeStyles(
          showSideRail
            ? {
                '@media only screen and (min-width: 1360px)': {
                  width: `calc(100% - ${sideRailWidth}px)`,
                },
              }
            : { width: '100%' },
        )}
      />
    ) : null;
  };

  private _getSideRail = (sections: IPageSectionProps[]): JSX.Element | undefined => {
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

      const jumpLinks: ISideRailLink[] = [];
      for (const section of sections) {
        if (section.id!.indexOf(GENERIC_SECTION) === -1) {
          jumpLinks.push({
            text: (section.jumpLinkName || section.readableSectionName || section.sectionName)!,
            url: section.id!,
          });
          jumpLinks.push(...(section.jumpLinks || []));
        }
      }

      return (
        <div className={css(styles.sideRailWrapper)}>
          <ScrollBars viewClassName={styles.sideRailScrollbarsView}>
            <SideRail
              jumpLinks={jumpLinks}
              relatedLinks={processedRelated}
              contactLinks={processedContacts}
              observe={true}
            />
          </ScrollBars>
        </div>
      );
    }
    return undefined;
  };
}

function _getSectionId(props: IPageSectionProps, index: number): string {
  return props.id || slugify(props.readableSectionName || props.sectionName || `${GENERIC_SECTION}-${index}`);
}
