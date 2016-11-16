import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';
import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';
const ProgressIndicatorBasicExampleCode = require('./examples/ProgressIndicator.Basic.Example.tsx');

export class ProgressIndicatorPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'ProgressIndicator');
  }

  public render() {
    return (
     <ComponentPage
        title='ProgressIndicator'
        componentName='ProgressIndicatorExample'
        exampleCards={
          <ExampleCard title='ProgressIndicator' code={ ProgressIndicatorBasicExampleCode }>
            <ProgressIndicatorBasicExample />
          </ExampleCard>
        }
        propertiesTables={
            <PropertiesTableSet componentName='ProgressIndicator' />
        }
        overview={
          <div>
            <p>
              ProgressIndicators are used to show the completion status of an operation lasting more than 2 seconds. If the state of progress cannot be determined, use a Spinner instead. ProgressIndicators can appear in a new panel, a flyout, under the UI initiating the operation, or even replacing the initiating UI, as long as the UI can return if the operation is canceled or is stopped.
            </p>
            <p>
              ProgressIndicators feature a bar showing total units to completion, and total units finished. The description of the operation appears above the bar, and the status in text appears below. The description should tell someone exactly what the operation is doing. Examples of formatting include:
            </p>
            <ul>
              <li>
                <strong>[Object]</strong> is being <strong>[operation name]</strong>, or
              </li>
              <li>
                <strong>[Object]</strong> is being <strong>[operation name]</strong> to <strong>[destination name]</strong> or
              </li>
              <li>
                <strong>[Object]</strong> is being <strong>[operation name]</strong> from <strong>[source name]</strong> to <strong>[destination name]</strong>
              </li>
            </ul>
            <p>
              Status text is generally in units elapsed and total units. If the operation can be canceled, an “X” icon is used and should be placed in the upper right, aligned with the baseline of the operation name. When an error occurs, replace the status text with the error description using ms-fontColor-redDark.
            </p>
            <p>
              Real-world examples include copying files to a storage location, saving edits to a file, and more. Use units that are informative and relevant to give the best idea to users of how long the operation will take to complete. Avoid time units as they are rarely accurate enough to be trustworthy. Also, combine steps of a complex operation into one total bar to avoid “rewinding” the bar. Instead change the operation description to reflect the change if necessary. Bars moving backwards reduce confidence in the service.
            </p>

          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
            <li>Use a ProgressIndicator when the total units to completion is known</li>
            <li>Display operation description</li>
            <li>Show text above and/or below the bar</li>
            <li>Combine steps of a single operation into one bar</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use a ProgressIndicator when the total units to completion is indeterminate</li>
              <li>Use only a single word description</li>
              <li>Show text to the right or left of the bar</li>
              <li>Cause progress to “rewind” to show new steps</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ProgressIndicator.md'>Fabric JS</a>
        }
        route={ this._url }
         isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
