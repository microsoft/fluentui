import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { FacepileAddFaceExample } from './examples/Facepile.AddFace.Example';
import { FacepileBasicExample } from './examples/Facepile.Basic.Example';
import { FacepileOverflowExample } from './examples/Facepile.Overflow.Example';
import { FontClassNames } from '../../Styling';

const FacepileAddFaceExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.AddFace.Example.tsx') as string;
const FacepileBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Basic.Example.tsx') as string;
const FacepileOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Overflow.Example.tsx') as string;

export class FacepilePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Facepile'
        componentName='FacepileExample'
        exampleCards={
          <div>
            <ExampleCard title='Facepile with Extras' code={ FacepileBasicExampleCode }>
              <FacepileBasicExample />
            </ExampleCard>
            <ExampleCard title='Facepile with Overflow' code={ FacepileOverflowExampleCode }>
              <FacepileOverflowExample />
            </ExampleCard>
            <ExampleCard title='Facepile with Add Face' code={ FacepileAddFaceExampleCode }>
              <FacepileAddFaceExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/Facepile.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person. Many times this component is used when sharing who has access to a specific view or file or when assigning a user to a task within a workflow.
            </p>

            <h2 className={ FontClassNames.xLarge }>Adding people</h2>
            <p>
              The component can include an add button which can be used for quickly adding a person to the list.
            </p>

            <h2 className={ FontClassNames.xLarge }>Empty state</h2>
            <p>
              The empty state of the Facepile should include only an add button. Another variant is to use an input field with placeholder text instructing the user to add a person. See the PeoplePicker component for the menu used to add people to the Facepile list.
            </p>

            <h2 className={ FontClassNames.xLarge }>One person</h2>
            <p>
              When there is only one person in the Facepile, consider using their name next to the face or initials.
            </p>

            <h2 className={ FontClassNames.xLarge }>Expanding the list when there is no overflow</h2>

            <p>
              When there is a need to show the Facepile expanded into a vertical list, include a downward chevron button. Clicking or tapping on the chevron would open a standard list view of personas.
            </p>

            <h2 className={ FontClassNames.xLarge }>Overflow</h2>

            <p>
              When the Facepile exceeds a max number of 5 people, show a button at the end of the list indicating how many are not being shown. Clicking or tapping on the overflow would open a standard list view of personas.
            </p>

          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use if looking for a way to represent who has access to an area and need to show that as a people representation.</li>
              <li>Only show the Add button if a user has access to do so.</li>
              <li>Allow a way for the user to understand who the person is. Many common ways to do this are with a tooltip or adding the ability to open up a PeopleCard Experience.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use for things other than people.</li>
              <li>Overwhelm users by listing every single person as a circle but truncate and provide a way to see the full list.</li>
              <li>Don’t use this control for experiences where you need to manage details of hundreds of users, you are better off using a list control.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}