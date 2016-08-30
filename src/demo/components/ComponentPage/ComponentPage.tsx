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
  overview: JSX.Element;
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
            <div className='ComponentPage-overview'>

            </div>
          </div>
          <div className='ComponentPage-body'>
            <h2 className='ComponentPage-overviewTitle'>Overview</h2>
            <div className='ComponentPage-overview'>
              { this.props.overview }
            </div>
            <h2 className='ms-font-xl'>Examples</h2>
            { this.props.exampleCards }
            { this.props.propertiesTables }
          </div>
        </div>
      </div>
    );
  }

  private _renderExamples(): Array<JSX.Element> {
    return this.props.exampleCards.map((value) => {
      return value;
    });
  }
}