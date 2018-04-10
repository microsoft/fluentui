import * as React from 'react';
import {
  css,
  getDocument
} from 'office-ui-fabric-react/lib/Utilities';
import {
  Link
} from 'office-ui-fabric-react/lib/Link';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import './ComponentPage.scss';

export interface IComponentPageSection {
  title: string;
  section: JSX.Element;
}

export interface IComponentPageProps {
  title: string;
  componentName: string;
  exampleCards?: JSX.Element;
  implementationExampleCards?: JSX.Element;
  propertiesTables?: JSX.Element;
  bestPractices?: JSX.Element;
  dos?: JSX.Element;
  donts?: JSX.Element;
  overview: JSX.Element;
  related?: JSX.Element;
  isHeaderVisible?: boolean;
  areBadgesVisible?: boolean;
  className?: string;
  componentStatus?: JSX.Element;
  otherSections?: IComponentPageSection[];
  allowNativeProps?: boolean | string;
  nativePropsElement?: string | string[] | undefined;

  /**
   * Link to the Component on GitHub.
   * Enables 'View On GitHub' and all 'Edit' buttons.
   */
  componentUrl?: string;

  /**
   * Link to the Donts markdown file on GitHub.
   * Enables the 'Edit Don'ts' button.
   * Overrides URL from componentUrl.
   */
  editDontsUrl?: string;

  /**
   * Link to the Dos markdown file on GitHub.
   * Enables the 'Edit Dos' button.
   * Overrides URL from componentUrl.
   */
  editDosUrl?: string;

  /**
   * Link to the Overview markdown file on GitHub.
   * Enables the 'Edit Overview' button.
   * Overrides URL from componentUrl.
   */
  editOverviewUrl?: string;
}

export enum ComponentPageSection {
  Dos = 0,
  Donts = 1,
  Overview = 2,
}

export class ComponentPage extends React.Component<IComponentPageProps, {}> {
  public static defaultProps: Partial<IComponentPageProps> = {
    isHeaderVisible: true,
    areBadgesVisible: false
  };

  private _baseUrl: string;

  constructor(props: IComponentPageProps) {
    super(props);

    let doc = getDocument();
    this._baseUrl = doc ? document.location.href : '';
  }

  public render(): JSX.Element {
    let {
      componentName,
      overview,
      className
    } = this.props;

    return (
      <div className={ css('ComponentPage', className) }>
        <div className={ componentName }>
          { this._pageHeader() }
          <div className='ComponentPage-body'>
            { this._getComponentStatusBadges() }
            <div className='ComponentPage-overviewSection'>
              <div className='ComponentPage-overviewSectionHeader'>
                <h2 className='ComponentPage-subHeading' id='Overview'>Overview</h2>
                { this._editButton(ComponentPageSection.Overview, this.props.editOverviewUrl) }
              </div>
              <div className='ComponentPage-overviewSectionContent'>
                <div className='ComponentPage-overview'>
                  { overview }
                </div>
                { this._getRelatedComponents() }
              </div>
            </div>
            { this._getDosAndDonts() }
            { this._getVariants() }
            { this._getImplementationExamples() }
            { this._getPropertiesTable() }
            { this.props.otherSections && this.props.otherSections.map((componentPageSection: IComponentPageSection) => {
              return this._getSection(componentPageSection);
            }) }
          </div>
        </div >
      </div >
    );
  }

  private _pageHeader(): JSX.Element | undefined {
    if (this.props.isHeaderVisible) {
      return (
        <div className='ComponentPage-header'>
          <h1 className='ComponentPage-title'>{ this.props.title }</h1>
          { this._navigationLinks() }
        </div>
      );
    }
  }

  private _navigationLinks(): JSX.Element {
    let links: Array<JSX.Element> = [];
    let {
      bestPractices,
      dos,
      donts,
    } = this.props;

    if (bestPractices && dos && donts) {
      links.push(
        <div className='ComponentPage-navLink' key='nav-link'>
          <Link { ...{ href: this._baseUrl + '#BestPractices' } }>Best Practices</Link>
        </div>
      );
    }

    return (
      <div className='ComponentPage-navigation'>
        <div className='ComponentPage-navLink'>
          <Link { ...{ href: this._baseUrl + '#Overview' } }>Overview</Link>
        </div>
        { links }
        { this.props.exampleCards && <div className='ComponentPage-navLink'>
          <Link { ...{ href: this._baseUrl + '#Variants' } }>Variants</Link>
        </div> }
        { this.props.implementationExampleCards && <div className='ComponentPage-navLink'>
          <Link { ...{ href: this._baseUrl + '#ImplementationExamples' } }>Implementation Examples</Link>
        </div> }
        { this.props.propertiesTables && <div className='ComponentPage-navLink'>
          <Link { ...{ href: this._baseUrl + '#Implementation' } }>Implementation</Link>
        </div> }
        { this.props.componentUrl && <div className='ComponentPage-navLink'>
          <Link href={ this.props.componentUrl } target='_blank' rel='noopener noreferrer'>View On Github</Link>
        </div> }
        { this.props.otherSections && this.props.otherSections.map((componentPageSection: IComponentPageSection, index: number) => {
          return <div key={ index + 'class' } className='ComponentPage-navLink'>
            <Link
              key={ index + componentPageSection.title }
              { ...{ href: this._baseUrl + '#' + componentPageSection.title } }
            >
              { componentPageSection.title }
            </Link>
          </div>;
        }) }
      </div >
    );
  }

  private _editButton(sectionIndex: ComponentPageSection, url?: string): JSX.Element | undefined {
    // Get section string for URLs and IDs.
    const section = ComponentPageSection[sectionIndex];

    // Generate edit URL from componentURL
    let mdUrl: string | undefined = undefined;
    if (this.props.componentUrl) {
      mdUrl = `${this.props.componentUrl}/docs/${this.props.componentName}${section}.md`;
    }

    // Allow generated URL fallback.
    let editUrl = url || mdUrl;

    if (editUrl) {
      // Replace /tree/ or /blob/ with /edit/ to get straight to GitHub editor.
      if (editUrl.includes('/tree/')) {
        editUrl = editUrl.replace('/tree/', '/edit/');
      } else if (editUrl.includes('/blob/')) {
        editUrl = editUrl.replace('/blob/', '/edit/');
      }

      // Get make section readable for tooltip. Add apostrophe to Don't
      let readableSection = section;
      if (sectionIndex === ComponentPageSection.Donts) {
        readableSection = 'Don\'ts';
      }
      return (
        <TooltipHost
          content={ `Edit ${this.props.componentName} ${readableSection} on GitHub` }
          id={ `${this.props.componentName}-${section}-editButtonHost` }
        >
          <IconButton
            key={ `${this.props.componentName}-${section}-editButton` }
            aria-describedby={ `${this.props.componentName}-${section}-editButtonHost` }
            iconProps={ {
              iconName: 'Edit'
            } }
            href={ editUrl }
            target='_blank'
            rel='noopener noreferrer'
          />
        </TooltipHost>
      );
    }

    return undefined;
  }

  private _getRelatedComponents(): JSX.Element | undefined {
    if (this.props.related) {
      return (
        <div className='ComponentPage-related'>
          <span className='ComponentPage-relatedTitle'>Also available in</span>
          { this.props.related }
        </div>
      );
    }
  }

  private _getNativePropsInfo(): JSX.Element | undefined {
    if (this.props.allowNativeProps) {
      let elementString: string | string[] | JSX.Element = this.props.nativePropsElement || 'div',
        componentString: JSX.Element | undefined;
      if (typeof elementString === 'object' && elementString.length > 1) {
        const elementArr = elementString.slice();
        for (let _i = 0; _i < elementArr.length; _i++) {
          if (_i === 0) {
            elementString = <><code>{ '<' }{ elementArr[_i] }{ '>' }</code></>;
          } else {
            elementString = <>{ elementString } and <code>{ '<' }{ elementArr[_i] }{ '>' }</code></>;
          }
        }
        elementString = <>{ elementString } tags</>;
      } else {
        elementString = <><code>{ '<' }{ elementString }{ '>' }</code> tag</>;
      }

      if (typeof this.props.allowNativeProps === 'string') {
        componentString = <> <code>{ this.props.allowNativeProps }</code></>;
      }

      return (
        <MessageBar>
          <strong>Native Props Allowed{ componentString }</strong> - all HTML attributes native to the { elementString },
          including all aria and custom data attributes, can be applied as native props on{ componentString || <> this component</> }.
        </MessageBar>
      );
    }
  }

  private _getPropertiesTable(): JSX.Element | undefined {
    if (this.props.propertiesTables) {
      return (
        <div className='ComponentPage-implementationSection'>
          <h2 className='ComponentPage-subHeading' id='Implementation'>Implementation</h2>
          { this._getNativePropsInfo() }
          { this.props.propertiesTables }
        </div>
      );
    }
  }

  private _getDosAndDonts(): JSX.Element | undefined {
    let dosAndDonts: Array<JSX.Element> = [];

    if (this.props.bestPractices) {
      dosAndDonts.push(
        <div className='ComponentPage-usage' id='BestPractices' key='best-practices'>
          <h2 className='ComponentPage-subHeading'>Best Practices</h2>
          { this.props.bestPractices }
        </div>
      );
    }

    if (this.props.dos && this.props.donts) {
      dosAndDonts.push(
        <div className='ComponentPage-doSections' key='do-sections'>
          <div className='ComponentPage-doSection'>
            <div className='ComponentPage-doSectionHeader'>
              <h3>Do</h3>
              { this._editButton(ComponentPageSection.Dos, this.props.editDosUrl) }
            </div>
            <hr className='ComponentPage-doSectionHr' />
            { this.props.dos }
          </div>
          <div className='ComponentPage-doSection ComponentPage-doSection--dont'>
            <div className='ComponentPage-doSectionHeader'>
              <h3>Don&rsquo;t</h3>
              { this._editButton(ComponentPageSection.Donts, this.props.editDontsUrl) }
            </div>
            <hr className='ComponentPage-doSectionHr' />
            { this.props.donts }
          </div>
        </div>
      );
    }

    if (this.props.bestPractices || (this.props.dos && this.props.donts)) {
      return (
        <div className='ComponentPage-bestPracticesSection'>
          { dosAndDonts }
        </div>
      );
    }
  }

  private _getVariants(): JSX.Element | undefined {
    if (this.props.exampleCards) {
      return (
        <div className='ComponentPage-variantsSection'>
          <h2 className='ComponentPage-subHeading ComponentPage-variantsTitle' id='Variants'>Variants</h2>
          { this.props.exampleCards }
        </div>
      );
    }

    return undefined;
  }

  private _getImplementationExamples(): JSX.Element | undefined {
    if (this.props.implementationExampleCards) {
      return (
        <div className='ComponentPage-implementationExamplesSection'>
          <h2 className='ComponentPage-subHeading ComponentPage-variantsTitle' id='ImplementationExamples'>Implementation Examples</h2>
          { this.props.implementationExampleCards }
        </div>
      );
    }

    return undefined;
  }

  private _getComponentStatusBadges(): JSX.Element | undefined {
    if (this.props.componentStatus && this.props.areBadgesVisible) {
      return (
        <div className='ComponentPage-componentStatusSection'>
          { this.props.componentStatus }
        </div>
      );
    }

    return undefined;
  }

  private _getSection(componentPageSection: IComponentPageSection): JSX.Element | undefined {
    if (this.props.otherSections) {
      return (
        <div key={ componentPageSection.title + '-key' }>
          <div className='ComponentPage-variantsSection'>
            <h2
              className='ComponentPage-subHeading ComponentPage-variantsTitle'
              id={ componentPageSection.title }
            >
              { componentPageSection.title }
            </h2>
            { componentPageSection.section }
          </div>
        </div>
      );
    }

    return undefined;
  }
}
