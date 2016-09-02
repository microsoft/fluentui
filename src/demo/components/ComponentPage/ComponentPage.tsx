import * as React from 'react';
import { Button, ButtonType } from '../../../Button';
import { css } from '../../../utilities/css';
import {
  Link
} from '../../../index';
import './ComponentPage.scss';

export interface IComponentPageProps {
  title: string;
  componentName: string;
  exampleCards: Array<JSX.Element>;
  propertiesTables?: Array<JSX.Element>;
  bestPractices?: JSX.Element;
  dos?: JSX.Element;
  donts?: JSX.Element;
  overview: JSX.Element;
  route: string;
}

export interface IComponentPageState {
}

export class ComponentPage extends React.Component<IComponentPageProps, IComponentPageState> {

  constructor(props: IComponentPageProps) {
    super(props);
  }

  public render() {

    return (
      <div className='ComponentPage'>
        <div className={ this.props.componentName }>
          <div className='ComponentPage-header'>
            <h1 className='ComponentPage-title'>{ this.props.title }</h1>
            { this._navigationLinks() }
          </div>
          <div className='ComponentPage-body'>
            <div className='ComponentPage-overviewSection'>
                <h2 className='ComponentPage-subHeading' id='Overview'>Overview</h2>
                <div className='ComponentPage-overview'>
                  { this.props.overview }
                </div>
            </div>
            { this._getDosAndDonts() }
            <div className='ComponentPage-variantsSection'>
              <h2 className='ComponentPage-subHeading ComponentPage-variantsTitle' id='Variants'>Variants</h2>
              { this.props.exampleCards }
            </div>
            { this._getPropertiesTable() }
          </div>
        </div>
      </div>
    );
  }

  private _navigationLinks(): JSX.Element {
    let links: Array<JSX.Element> = [];

    if (this.props.bestPractices && this.props.dos && this.props.donts) {
      links.push(
        <div className='ComponentPage-navLink'>
          <a href={ this.props.route + '#Best Practices' }>Best Practices</a>
        </div>
      );
    }

    return (
      <div className='ComponentPage-navigation'>
        <div className='ComponentPage-navLink'>
          <a href={ this.props.route + '#Overview' }>Overview</a>
        </div>
        { links }
        <div className='ComponentPage-navLink'>
          <a href={ this.props.route + '#Variants' }>Variants</a>
        </div>
        <div className='ComponentPage-navLink'>
          <a href={ this.props.route + '#Implementation' }>Implementation</a>
        </div>
      </div>
    );
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
        <div class='ComponentPage-usage' id='Best Practices'>
          <h2 className='ComponentPage-subHeading'>Best Practices</h2>
          { this.props.bestPractices }
        </div>
      );
    }

    if (this.props.dos && this.props.donts) {
      dosAndDonts.push(
        <div className='ComponentPage-doSections'>
          <div className='ComponentPage-doSection'>
            <h3>Do</h3>
            { this.props.dos }
          </div>
          <div className='ComponentPage-doSection ComponentPage-doNotSection'>
            <h3>Do not</h3>
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

  private _renderExamples(): Array<JSX.Element> {
    return this.props.exampleCards.map((value) => {
      return value;
    });
  }
}