import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { NavExample } from './examples/Nav.Example';
const NavExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Nav/examples/Nav.Example.tsx') as string;

export class NavPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Nav"
        componentName="NavToggler"
        exampleCards={
          <ExampleCard title="Nav" isOptIn={true} code={NavExampleCode} isScrollable={false}>
            <NavExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Nav/Nav.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Nav/NavLink.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Nav/NavGroup.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Nav/NavLinkGroup.types.ts')
            ]}
            renderOnly={[
              'INavProps',
              'INavState',
              'INavStyleProps',
              'INavStyles',
              'INavGroupProps',
              'INavGroupStyles',
              'INavLinkProps',
              'INavLinkStyles',
              'INavLinkStyleProps',
              'INavLinkGroupProps',
              'INavLinkGroupStates',
              'INavLinkGroupStyleProps',
              'INavLinkGroupStyles'
            ]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use the hamburger icon at the top to switch between expanded and collapsed state</li>
              <li>Use the optional named second menu group if needed to split/categorize the menu items.</li>
              <li>
                Use only supported actions on leaf nodes - expand if there is child menu or script execution through onClick props or open
                url (includes hashtag) based on target property
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Provide script or url for the parent node. Parent node is used to expand/collapse it's child nodes.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
