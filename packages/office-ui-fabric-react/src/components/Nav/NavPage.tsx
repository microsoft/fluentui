import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { NavBasicExample } from './examples/Nav.Basic.Example';
import { NavFabricDemoAppExample } from './examples/Nav.FabricDemoApp.Example';
import { NavNestedExample } from './examples/Nav.Nested.Example';
import { NavByKeysExample } from './examples/Nav.ByKeys.Example';

const NavBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx') as string;
const NavFabricDemoAppExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.FabricDemoApp.Example.tsx') as string;
const NavNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Nested.Example.tsx') as string;
const NavByKeysExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.ByKeys.Example.tsx') as string;

export class NavPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Nav'
        componentName='NavExample'
        exampleCards={
          <div>
            <ExampleCard title='Basic Nav bar with sample links' code={ NavBasicExampleCode }>
              <NavBasicExample />
            </ExampleCard>
            <ExampleCard title='Navigation menu used in this Fabric React demo app' code={ NavFabricDemoAppExampleCode }>
              <NavFabricDemoAppExample />
            </ExampleCard>
            <ExampleCard title='Nested navigation menu (without group header)' code={ NavNestedExampleCode }>
              <NavNestedExample />
            </ExampleCard>
            <ExampleCard title='Nav bar of links each with unique keys and empty urls' code={ NavByKeysExampleCode }>
              <NavByKeysExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/Nav.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Navs (also called "left nav" or "navigation pane") provide links to the main areas of an app or a site. In larger configurations, the Nav is always on-screen, usually on the left of the view. In smaller configurations, the Nav may collapse into a skinnier version or be completely hidden until the user taps an icon.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use Nav for apps with many top-level navigation items that are of similar type. For example, a sports app with categories like Football, Baseball, Basketball, Soccer, and so on.</li>
              <li>Keep the names of the navigation items brief and clear, rather than trying to be overly specific.</li>
              <li>Use the word that feels right for the navigation. For example, some items may make better sense as nouns (e.g. “Files”), others as adjectives (“Shared”). Use what makes sense for users, and keep it short! </li>
              <li>Try to keep your app’s nav in a consistent order across platforms. This sort of consistency increases predictability which drives user confidence, thus retaining and engaging them.</li>
              <li>UseNav for an app with a medium to high number of top-level views or categories. If your app is very simple, you may prefer a simpler hub-and-spoke layout.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Overload your Nav. Too many items in the Nav is indicative of an app that is poorly organized or trying to do too much.</li>
              <li>Include actions. You may reserve a space for actions, if you keep them well separated from the main Nav and their appearance makes it obvious that tapping them will execute a command instead of navigating.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
