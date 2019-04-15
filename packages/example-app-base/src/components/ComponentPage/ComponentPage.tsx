import * as React from 'react';
import { css, getDocument } from 'office-ui-fabric-react/lib/Utilities';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { EditSection } from '../EditSection/index';
import './ComponentPage.scss';
import { IComponentPageProps, IComponentPageSection } from './ComponentPage.types';

export class ComponentPage extends React.PureComponent<IComponentPageProps> {
  public static defaultProps: Partial<IComponentPageProps> = {
    isHeaderVisible: true,
    areBadgesVisible: false
  };

  private _baseUrl: string;

  constructor(props: IComponentPageProps) {
    super(props);

    const doc = getDocument();
    this._baseUrl = doc ? document.location.href : '';
  }

  public render() {
    const { componentName, className, otherSections } = this.props;

    return (
      <div className={css('ComponentPage', className)}>
        <div className={componentName}>
          {this._pageHeader()}
          <div className="ComponentPage-body">
            {this._getComponentStatusBadges()}
            {this._getOverview()}
            {this._getBestPractices()}
            {this._getVariants()}
            {this._getImplementationExamples()}
            {this._getPropertiesTable()}
            {this._getFeedback()}
            {otherSections && otherSections.map(this._getSection)}
          </div>
        </div>
      </div>
    );
  }

  private _pageHeader(): JSX.Element | undefined {
    if (this.props.isHeaderVisible) {
      return (
        <div className="ComponentPage-header">
          <h1 className="ComponentPage-title">{this.props.title}</h1>
          {this._navigationLinks()}
        </div>
      );
    }
  }

  private _navigationLinks(): JSX.Element {
    const props = this.props;

    const sections = [
      { title: 'Overview' },
      !!(props.bestPractices || (props.dos && props.donts)) && { title: 'Best Practices' },
      props.exampleCards && { title: 'Variants' },
      props.implementationExampleCards && { title: 'Implementation Examples' },
      props.propertiesTables && { title: 'Implementation' },
      props.isFeedbackVisible && { title: 'Feedback' },
      ...(props.otherSections || [])
    ].filter(section => !!section) as Array<{ title: string }>;

    return (
      <div className="ComponentPage-navigation">
        {sections.map(section => {
          return (
            <div key={section.title} className="ComponentPage-navLink">
              <Link href={this._baseUrl + '#' + section.title.replace(/ /g, '')}>{section.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }

  private _getRelatedComponents(): JSX.Element | undefined {
    if (this.props.related) {
      return (
        <div className="ComponentPage-related">
          <span className="ComponentPage-relatedTitle">Also available in</span>
          {this.props.related}
        </div>
      );
    }
  }

  private _getPropertiesTable(): JSX.Element | undefined {
    if (this.props.propertiesTables) {
      return (
        <div className="ComponentPage-implementationSection">
          <h2 className="ComponentPage-subHeading" id="Implementation">
            Implementation
          </h2>
          {this.props.propertiesTables}
        </div>
      );
    }
  }

  private _getBestPractices(): JSX.Element | undefined {
    const props = this.props;
    const { bestPractices, dos, donts, title } = props;
    if (!(bestPractices || (dos && donts))) {
      return;
    }

    const practicesUrl = this._getURL('BestPractices', props.editBestPracticesUrl);
    const dosUrl = this._getURL('Dos', props.editDosUrl);
    const dontsUrl = this._getURL('Donts', props.editDontsUrl);

    return (
      <div className="ComponentPage-bestPracticesSection" id="BestPractices">
        {bestPractices && (
          <div className="ComponentPage-usage">
            <div className="ComponentPage-usageHeader">
              <h2 className="ComponentPage-subHeading">Best Practices</h2>
              {practicesUrl && <EditSection title={title} section="BestPractices" url={practicesUrl} />}
            </div>
            {bestPractices}
          </div>
        )}
        {!!(dos && donts) && (
          <div className="ComponentPage-doSections">
            <div className="ComponentPage-doSection">
              <div className="ComponentPage-doSectionHeader">
                <h3>Do</h3>
                {dosUrl && <EditSection title={title} section="Dos" url={dosUrl} />}
              </div>
              <hr className="ComponentPage-doSectionLine" />
              {dos}
            </div>
            <div className="ComponentPage-doSection ComponentPage-doSection--dont">
              <div className="ComponentPage-doSectionHeader">
                <h3>Don&rsquo;t</h3>
                {dontsUrl && <EditSection title={title} section="Donts" url={dontsUrl} />}
              </div>
              <hr className="ComponentPage-doSectionLine" />
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
      return (
        <div className="ComponentPage-variantsSection">
          <h2 className="ComponentPage-subHeading ComponentPage-variantsTitle" id="Variants">
            {headerText}
          </h2>
          {exampleCards}
        </div>
      );
    }
  }

  private _getImplementationExamples(): JSX.Element | undefined {
    if (this.props.implementationExampleCards) {
      return (
        <div className="ComponentPage-implementationExamplesSection">
          <h2 className="ComponentPage-subHeading ComponentPage-variantsTitle" id="ImplementationExamples">
            Implementation Examples
          </h2>
          {this.props.implementationExampleCards}
        </div>
      );
    }
  }

  private _getFeedback(): JSX.Element | undefined {
    if (this.props.isFeedbackVisible) {
      return (
        <div className="ComponentPage-feedbackSection">
          <h2 className="ComponentPage-subHeading ComponentPage-variantsTitle" id="Feedback">
            Feedback
          </h2>
          {this.props.feedback}
        </div>
      );
    }
  }

  private _getComponentStatusBadges(): JSX.Element | undefined {
    if (this.props.componentStatus && this.props.areBadgesVisible) {
      return <div className="ComponentPage-componentStatusSection">{this.props.componentStatus}</div>;
    }
  }

  private _getOverview(): JSX.Element | undefined {
    if (this.props.overview) {
      const overviewUrl = this._getURL('Overview', this.props.editOverviewUrl);
      return (
        <div className="ComponentPage-overviewSection">
          <div className="ComponentPage-overviewSectionHeader">
            <h2 className="ComponentPage-subHeading" id="Overview">
              Overview
            </h2>
            {overviewUrl && <EditSection title={this.props.title} section="Overview" url={overviewUrl} />}
          </div>
          <div className="ComponentPage-overviewSectionContent">
            <div className="ComponentPage-overview">{this.props.overview}</div>
            {this._getRelatedComponents()}
          </div>
        </div>
      );
    }

    return undefined;
  }

  private _getSection = (componentPageSection: IComponentPageSection): JSX.Element => {
    return (
      <div className="ComponentPage-variantsSection" key={componentPageSection.title}>
        <h2 className="ComponentPage-subHeading ComponentPage-variantsTitle" id={componentPageSection.title}>
          {componentPageSection.title}
        </h2>
        {componentPageSection.section}
      </div>
    );
  };

  private _getURL(section: string, url?: string): string | undefined {
    if (url) {
      return url;
    }
    const componentName = (this.props.title || this.props.componentName).replace(/\s/g, '');
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
