import * as React from 'react';
import { css, classNamesFunction, styled } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { Link } from '@fluentui/react/lib/Link';
import { Stack, IStackProps } from '@fluentui/react/lib/Stack';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { EditSection } from '../EditSection/index';
import {
  IComponentPageProps,
  IComponentPageStyleProps,
  IComponentPageStyles,
  IComponentPageSection,
} from './ComponentPage.types';
import { getStyles } from './ComponentPage.styles';
import { showOnlyExamples } from '../../utilities/showOnlyExamples';
import { getCurrentUrl } from '../../utilities/getCurrentUrl';

const getClassNames = classNamesFunction<IComponentPageStyleProps, IComponentPageStyles>();

/**
 * Extended section interface used internally for de-duplicating section rendering code.
 */
interface IExtendedComponentPageSection extends IComponentPageSection {
  /** URL for editing the section markdown */
  editUrl?: string;
  /** Override for section ID. Null means don't use a section ID. */
  id?: string | null;
  /** Class for the section wrapper (default variantsSection). Null means don't use a class. */
  wrapperClass?: string | null;
  /** Class for the section title (default variantsTitle). Null means don't use a class. */
  titleClass?: string | null;
}

const headingWithEditStackProps: IStackProps = {
  horizontal: true,
  verticalAlign: 'center',
  horizontalAlign: 'space-between',
};

export class ComponentPageBase extends React.PureComponent<IComponentPageProps> {
  public static defaultProps: Partial<IComponentPageProps> = {
    isHeaderVisible: true,
    areBadgesVisible: false,
  };

  private _baseUrl: string;
  private _showOnlyExamples: boolean;
  private _styles: IProcessedStyleSet<IComponentPageStyles>;

  constructor(props: IComponentPageProps) {
    super(props);

    this._baseUrl = getCurrentUrl();
    this._showOnlyExamples = showOnlyExamples();
  }

  public render() {
    const { componentName, className, otherSections, styles, theme } = this.props;

    const onlyExamples = this._showOnlyExamples;

    const classNames = (this._styles = getClassNames(styles, { theme }));

    return onlyExamples ? (
      this._getVariants()
    ) : (
      <div className={css(classNames.root, className)}>
        <div className={componentName}>
          {this._getPageHeader()}
          <div className={classNames.body}>
            {this._getOverview()}
            {this._getBestPractices()}
            {this._getVariants()}
            {this._getAccessibility()}
            {this._getPropertiesTable()}
            {this._getFeedback()}
            {otherSections && otherSections.map(section => this._getSection(section))}
          </div>
        </div>
      </div>
    );
  }

  private _getPageHeader(): JSX.Element | undefined {
    const classNames = this._styles;
    if (this.props.isHeaderVisible) {
      return (
        <div className={classNames.header}>
          <h1 className={classNames.title}>{this.props.title}</h1>
          {this._navigationLinks()}
        </div>
      );
    }
  }

  private _navigationLinks(): JSX.Element {
    const classNames = this._styles;
    const props = this.props;

    const sections = [
      { title: 'Overview' },
      !!(props.bestPractices || (props.dos && props.donts)) && { title: 'Best practices' },
      props.exampleCards && { title: 'Variants' },
      props.propertiesTables && { title: 'Implementation' },
      props.isFeedbackVisible && { title: 'Feedback' },
      ...(props.otherSections || []),
    ].filter(section => !!section) as Array<{ title: string }>;

    return (
      <Stack horizontal wrap tokens={{ childrenGap: '5px 40px', maxWidth: '100%' }} className={classNames.navigation}>
        {sections.map(section => (
          <Link
            key={section.title}
            href={this._baseUrl + '#' + _idFromSectionTitle(section.title)}
            className={classNames.headerLink}
          >
            {section.title}
          </Link>
        ))}
      </Stack>
    );
  }

  private _getNativePropsInfo(): JSX.Element | undefined {
    const { allowNativeProps, allowNativePropsForComponentName, nativePropsElement = 'div' } = this.props;
    if (allowNativeProps) {
      const nativePropsElems = Array.isArray(nativePropsElement) ? nativePropsElement : [nativePropsElement];

      const elementsArr: (JSX.Element | string)[] = [];
      for (const elem of nativePropsElems) {
        elementsArr.push(<code key={elem}>{`<${elem}>`}</code>);
        elementsArr.push(' and ');
      }
      elementsArr.pop(); // remove last ' and '
      elementsArr.push(` tag${nativePropsElems.length > 1 ? 's' : ''}`);

      let componentNameJsx: JSX.Element | undefined;
      if (allowNativePropsForComponentName) {
        componentNameJsx = <code>{allowNativePropsForComponentName}</code>;
      }

      /* eslint-disable @fluentui/max-len */
      return (
        <MessageBar>
          <strong>Native props allowed {componentNameJsx && <>for {componentNameJsx}</>}</strong> - all HTML attributes
          native to the {elementsArr}, including all aria and custom data attributes, can be applied as native props on{' '}
          {componentNameJsx || 'this component'}.
        </MessageBar>
      );
      /* eslint-enable @fluentui/max-len */
    }
  }

  private _getPropertiesTable(): JSX.Element | undefined {
    if (this.props.propertiesTables) {
      return this._getSection({
        title: 'Implementation',
        section: (
          <>
            {!this.props.jsonDocs && this._getNativePropsInfo()}
            {this.props.propertiesTables}
          </>
        ),
        wrapperClass: this._styles.implementationSection,
        titleClass: null,
      });
    }
  }

  private _getBestPractices(): JSX.Element | undefined {
    const classNames = this._styles;
    const props = this.props;
    const { bestPractices, dos, donts, title } = props;
    if (!(bestPractices || (dos && donts))) {
      return;
    }

    const practicesUrl = this._getURL('BestPractices', props.editBestPracticesUrl);
    const dosUrl = this._getURL('Dos', props.editDosUrl);
    const dontsUrl = this._getURL('Donts', props.editDontsUrl);

    return (
      <div id="BestPractices" className={classNames.bestPracticesSection}>
        {bestPractices &&
          this._getSection({
            title: 'Best practices',
            section: bestPractices,
            editUrl: practicesUrl,
            wrapperClass: classNames.usageSection,
            titleClass: classNames.usageHeading,
            id: null,
          })}
        {!!(dos && donts) && (
          <div className={css(classNames.section, classNames.doSections)}>
            <div className={classNames.dosDontsSection}>
              <Stack className={classNames.dosDontsHeading} {...headingWithEditStackProps}>
                <h3>Do</h3>
                {dosUrl && <EditSection title={title} section="Dos" url={dosUrl} />}
              </Stack>
              <hr className={css(classNames.dosDontsLine, classNames.dosLine)} />
              {dos}
            </div>
            <div className={css(classNames.dosDontsSection, classNames.dontsSection)}>
              <Stack className={classNames.dosDontsHeading} {...headingWithEditStackProps}>
                <h3>Don&rsquo;t</h3>
                {dontsUrl && <EditSection title={title} section="Don'ts" url={dontsUrl} />}
              </Stack>
              <hr className={css(classNames.dosDontsLine, classNames.dontsLine)} />
              {donts}
            </div>
          </div>
        )}
      </div>
    );
  }

  private _getVariants(): JSX.Element | undefined {
    const { exampleCards } = this.props;
    // We want to show the "Variants" header if the header is present since it has a relative anchor to it
    // or we have more than one example JSX element to render.
    const hasVariants = this.props.isHeaderVisible || (exampleCards && !!exampleCards.props.children.length);

    // If only one variant then use its title as the header text, otherwise use "Variants".
    const headerText = hasVariants ? 'Variants' : this.props.title;

    if (exampleCards) {
      return this._getSection({ title: headerText, section: exampleCards, id: 'Variants' });
    }
  }

  private _getFeedback(): JSX.Element | undefined {
    if (this.props.isFeedbackVisible && this.props.feedback) {
      return this._getSection({
        title: 'Feedback',
        section: this.props.feedback,
        wrapperClass: this._styles.feedbackSection,
      });
    }
  }

  private _getOverview(): JSX.Element | undefined {
    const { overview, editOverviewUrl } = this.props;
    if (overview) {
      return this._getSection({
        title: 'Overview',
        section: overview,
        editUrl: this._getURL('Overview', editOverviewUrl),
        wrapperClass: this._styles.overviewSection,
        titleClass: this._styles.overviewHeading,
      });
    }

    return undefined;
  }

  private _getAccessibility(): JSX.Element | undefined {
    const { accessibility, editOverviewUrl } = this.props;
    if (accessibility) {
      return this._getSection({
        title: 'Accessibility',
        section: accessibility,
        editUrl: this._getURL('Accessibility', editOverviewUrl),
      });
    }

    return undefined;
  }

  private _getSection(section: IExtendedComponentPageSection): JSX.Element {
    const {
      title,
      section: sectionContent,
      wrapperClass = this._styles.variantsSection,
      titleClass = this._styles.variantsTitle,
      id = _idFromSectionTitle(section.title),
      editUrl,
    } = section;
    const classNames = this._styles;
    return (
      <div key={id || title} className={css(classNames.section, wrapperClass)}>
        <Stack className={classNames.subHeading} {...headingWithEditStackProps}>
          <h2 className={css(titleClass)} id={id || undefined}>
            {title}
          </h2>
          {editUrl && <EditSection title={this.props.title} section={title} url={editUrl} />}
        </Stack>
        {sectionContent}
      </div>
    );
  }

  private _getURL(section: string, url?: string): string | undefined {
    if (url) {
      return url;
    }
    const componentName = _idFromSectionTitle(this.props.title || this.props.componentName);
    // Generate edit URL from componentURL
    let mdUrl;
    if (this.props.componentUrl) {
      mdUrl = `${this.props.componentUrl}/docs/${componentName}${section}.md`;
      // Replace /tree/ or /blob/ with /edit/ to get straight to GitHub editor.
      if (mdUrl.indexOf('/tree/') !== -1) {
        mdUrl = mdUrl.replace('/tree/', '/edit/');
      } else if (mdUrl.indexOf('/blob/') !== -1) {
        mdUrl = mdUrl.replace('/blob/', '/edit/');
      }
    }
    return mdUrl;
  }
}

function _idFromSectionTitle(title: string): string {
  return title.replace(/[^\w-]/g, '');
}

export const ComponentPage: React.FunctionComponent<IComponentPageProps> = styled<
  IComponentPageProps,
  IComponentPageStyleProps,
  IComponentPageStyles
>(ComponentPageBase, getStyles, undefined, {
  scope: 'ComponentPage',
});
