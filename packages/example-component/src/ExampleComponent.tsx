/**
* ExampleComponent.tsx
* Author:
* Copyright: Microsoft 2016
*
* Type definitions to support the plugin.
*/

import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { IExampleComponentProps } from './ExampleComponent.Props';

let styles = require<any>('./ExampleComponent.scss');

/**
 * ExampleComponent implementation for web.
 *
 * @export
 * @class ExampleComponent
 * @extends {BaseComponent<IExampleComponentProps, {}>}
 */
export class ExampleComponent extends BaseComponent<IExampleComponentProps, {}> {

  public render() {
    return (
      <div className={ styles.root }>

        <div>I am ExampleComponent</div>
        { this.props.children }
      </div>
    );
  }
}
