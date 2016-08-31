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
  propertiesTables: Array<JSX.Element>;
  bestPractices?: JSX.Element;
  do?: JSX.Element;
  dont?: JSX.Element;
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
            <div className='ComponentPage-bestPracticesSection'>
              { this._getUsage() }
              { this._getDosAndDonts() }
            </div>
            <div className='ComponentPage-variantsSection'>
              <h2 className='ComponentPage-subHeading ComponentPage-variantsTitle' id='Variants'>Variants</h2>
              { this.props.exampleCards }
            </div>
            <div className='ComponentPage-implementationSection'>
              <h2 className='ComponentPage-subHeading' id='Implementation'>Implementation</h2>
              { this.props.propertiesTables }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _navigationLinks(): JSX.Element {
    let links: Array<JSX.Element> = [];

    if (this.props.bestPractices && this.props.do && this.props.dont) {
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

  private _getDosAndDonts(): JSX.Element {
    let doAndDont: Array<JSX.Element>;
    let doSection: JSX.Element;

    if (this.props.do && this.props.dont) {
      return (
        <div className='ComponentPage-doSections'>
          <div className='ComponentPage-doSection'>
            <h3>Do</h3>
            { this.props.do }
          </div>
          <div className='ComponentPage-doSection ComponentPage-doNotSection'>
            <h3>Do not</h3>
            { this.props.dont }
          </div>
        </div>
      );
    }
  }

  private _getUsage(): JSX.Element {
    if (this.props.bestPractices) {
      return (
        <div class='ComponentPage-usage' id='Best Practices'>
          <h2 className='ComponentPage-subHeading'>Best Practices</h2>
          { this.props.bestPractices }
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