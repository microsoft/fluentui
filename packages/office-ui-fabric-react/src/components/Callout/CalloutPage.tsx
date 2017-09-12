import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { items } from '../CommandBar/examples/data';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutNestedExample } from './examples/Callout.Nested.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const CalloutNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx') as string;
const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

export class CalloutPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    let cmdBarParamsTextAndIcons: any = { items: items, farItems: null };

    return (
      <ComponentPage
        title='Callout'
        componentName='CalloutExample'
        exampleCards={
          <div>
            <ExampleCard title='Simple callout' code={ CalloutBasicExampleCode }>
              <CalloutBasicExample />
            </ExampleCard>
            <ExampleCard title='Nested callout... Callout with a commandbar with a sub menu' code={ CalloutNestedExampleCode }>
              <CalloutNestedExample { ...cmdBarParamsTextAndIcons } />
            </ExampleCard>
            <ExampleCard title='Callout directional example' code={ CalloutDirectionalExampleCode }>
              <CalloutDirectionalExample />
            </ExampleCard>
            <ExampleCard title='Callout cover example' code={ CalloutCoverExampleCode }>
              <CalloutCoverExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.Props.ts')
              ] }
            />
            <p>Besides the above properties, the <code>Callout</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
          </div>
        }
        overview={
          <div>
            <p>Callouts are a powerful way to simplify a user interface. They host tips and other information users need when they need it, with minimal effort on their part. Callouts can help you use screen space more effectively and reduce screen clutter. However, poorly designed Callouts can be annoying, distracting, unhelpful, overwhelming, or in the way.</p>

            <p>Use a Callout for displaying additional contextual information about an item on the screen. Callouts also have a tail that identifies their source. A common use for Callout is the introduction of a new feature or capability of an app or site. Alternate usages include pairing the Callout with a button or clickable element for on-demand presentation of additional or supporting content.</p>

            <p>Real-world examples of this implementation can be seen in administrative interfaces where a particularly difficult-to-understand concept is paired with the iconClassNames.info "i" icon. In this example, Callout - with its tip text - is opened when the user clicks on or hovers over the icon.</p>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Callout/Callout.html'>Fabric JS</a>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use Callouts to introduce new concepts in an experience where highlighting specific pieces of the UI is necessary.</li>
              <li>Do be concise with the information you provide inside of a Callout. Short sentences or sentence fragments are best.</li>
              <li>Do be helpful with the tip text inside of your Callout.</li>
              <li>Do limit the information inside of a Callout to supplemental information that users don't have to read.</li>
              <li>Callouts should be placed near the object being described, usually at the pointer's tail or head if possible.</li>
              <li>When additional context - or more advanced description - is necessary, consider placing a link to "Learn more" at the bottom of the Callout and opening the additional content in a new window or Panel when clicked.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t overuse Callout without putting the user in control. Too many Callouts which open automatically can be perceived as interrupting workflow and are a bad user experience.</li>
              <li>Don't use large, unformatted blocks of text in your Callout, they are difficult to read and overwhelming.</li>
              <li>Don't put obvious tip text, or text that simply repeats what is already on the screen in your Callout.</li>
              <li>Because the content inside of a Callout isn't always visible, don't put important or required information in a Callout.</li>
              <li>Don’t block important UI with the placement of your Callout, it is a poor user experience that will lead to frustration.</li>
              <li>Don’t open Callout from within another Callout.</li>
              <li>Don’t use Callout to ask the user to confirm an action, use a Dialog instead.</li>
              <li>Don’t show Callouts on hidden elements.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
