import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { PersonaCardBasicExample } from './examples/PersonaCard.Basic.Example';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PersonaCardBasicExampleCode = require('./examples/PersonaCard.Basic.Example.tsx');

export class PersonaCardPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'PersonaCard');
  }

  public render() {
    return (
       <ComponentPage
        title='PersonaCard'
        componentName='PersonaCardExample'
        exampleCards={
          [
            <ExampleCard title='PersonaCard' code={ PersonaCardBasicExampleCode }>
              <PersonaCardBasicExample />
            </ExampleCard>
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/PersonaCard'>PersonaCards</Link>
            <span> render a details for an individual.</span>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/PersonaCard.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
