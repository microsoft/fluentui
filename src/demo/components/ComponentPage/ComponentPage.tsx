import * as React from 'react';
import {
  Link
} from '../../../index';
import './ComponentPage.scss';
import { css } from '../../../utilities/css';

export interface IComponentPageProps {
  title: string;
  componentName: string;
  exampleCards: JSX.Element;
  propertiesTables?: JSX.Element;
  bestPractices?: JSX.Element;
  dos?: JSX.Element;
  donts?: JSX.Element;
  overview: JSX.Element;
  related?: JSX.Element;
  route: string;
  isHeaderVisible?: boolean;
  className?: string;
}

export class ComponentPage extends React.Component<IComponentPageProps, {}> {
  public static defaultProps = {
    isHeaderVisible: true
  };

  constructor(props: IComponentPageProps) {
    super(props);
  }

  public render() {
    let {
      componentName,
      exampleCards,
      overview,
      className
    } = this.props;

    return (
      <div className={ css('ComponentPage', className) }>
        <div className={ componentName }>
          { this._pageHeader() }
          <div className='ComponentPage-body'>
            <div className='ComponentPage-overviewSection'>
              <h2 className='ComponentPage-subHeading' id='Overview'>Overview</h2>
              <div className='ComponentPage-overviewSectionContent'>
                <div className='ComponentPage-overview'>
                  { overview }
                </div>
                { this._getRelatedComponents() }
              </div>
            </div>
            { this._getDosAndDonts() }
            <div className='ComponentPage-variantsSection'>
              <h2 className='ComponentPage-subHeading ComponentPage-variantsTitle' id='Variants'>Variants</h2>
              { exampleCards }
            </div>
            { this._getPropertiesTable() }
          </div>
        </div>
      </div>
    );
  }

  private _pageHeader(): JSX.Element {
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
      route
    } = this.props;

    if (bestPractices && dos && donts) {
      links.push(
        <div className='ComponentPage-navLink' key='nav-link'>
          <Link href={ route + '#Best Practices' }>Best Practices</Link>
        </div>
      );
    }

    return (
      <div className='ComponentPage-navigation'>
        <div className='ComponentPage-navLink'>
          <Link href={ route + '#Overview' }>Overview</Link>
        </div>
        { links }
        <div className='ComponentPage-navLink'>
          <Link href={ route + '#Variants' }>Variants</Link>
        </div>
        <div className='ComponentPage-navLink'>
          <Link href={ route + '#Implementation' }>Implementation</Link>
        </div>
      </div>
    );
  }

  private _getRelatedComponents(): JSX.Element {
    if (this.props.related) {
      return (
        <div className='ComponentPage-related'>
          <span className='ComponentPage-relatedTitle'>Also available in</span>
          { this.props.related }
        </div>
      );
    }
  }

  private _getPropertiesTable(): JSX.Element {
    if (this.props.propertiesTables) {
      return (
        <div className='ComponentPage-implementationSection'>
          <h2 className='ComponentPage-subHeading' id='Implementation'>Implementation</h2>
          { this.props.propertiesTables }
        </div>
      );
    }
  }

  private _getDosAndDonts(): JSX.Element {
    let dosAndDonts: Array<JSX.Element> = [];

    if (this.props.bestPractices) {
      dosAndDonts.push(
        <div className='ComponentPage-usage' id='Best Practices' key='best-practices'>
          <h2 className='ComponentPage-subHeading'>Best practices</h2>
          { this.props.bestPractices }
        </div>
      );
    }

    if (this.props.dos && this.props.donts) {
      dosAndDonts.push(
        <div className='ComponentPage-doSections' key='do-sections'>
          <div className='ComponentPage-doSection'>
            <h3>Do</h3>
            { this.props.dos }
          </div>
          <div className='ComponentPage-doSection ComponentPage-doSection--dont'>
            <h3>Don&rsquo;t</h3>
            { this.props.donts }
          </div>
        </div>
      );
    }

    if (this.props.bestPractices || (this.props.dos && this.props.donts)) {
      return(
        <div className='ComponentPage-bestPracticesSection'>
          { dosAndDonts }
        </div>
      );
    }
  }
}
