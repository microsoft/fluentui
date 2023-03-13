import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { PersonaCoinExample } from './PersonaCoin.Example';
import { PersonaCoinSizeAndColorExample } from './PersonaCoinSizeAndColor.Example';

const PersonaCoinExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/PersonaCoin/PersonaCoin.Example.tsx') as string;
const PersonaCoinSizeAndColorExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/PersonaCoin/PersonaCoinSizeAndColor.Example.tsx') as string;

export const PersonaCoinPage = (props: IComponentDemoPageProps) => {
  return (
    <ComponentPage
      title=" PersonaCoin"
      componentName=" PersonaCoin"
      exampleCards={
        <div>
          <ExampleCard title="PersonaCoin basic usage" code={PersonaCoinExampleCode}>
            <PersonaCoinExample />
          </ExampleCard>

          <ExampleCard title="PersonaCoin sizes and colors" code={PersonaCoinSizeAndColorExampleCode}>
            <PersonaCoinSizeAndColorExample />
          </ExampleCard>
        </div>
      }
      propertiesTables={
        <PropertiesTableSet
          sources={[
            require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/PersonaCoin/PersonaCoin.types.ts'),
          ]}
        />
      }
      overview={
        <div>
          <p>
            The PersonaCoin component is generally used as a building block for other components like
            Persona/FacePile/VerticalPersona.
          </p>
          <p>In case you need to render just a PersonaCoin you can use this component directly.</p>
        </div>
      }
      dos={
        <div>
          <ul>
            <li>Provide as few props as needed to render the coin</li>
            <li>
              Use the <code>text</code> prop instead of the <code>initials</code> prop
            </li>
          </ul>
        </div>
      }
      donts={
        <div>
          <ul>
            <li>
              Change the colors of the initials or the coin unless you have a well grounded reason. (For consistency
              across products)
            </li>
          </ul>
        </div>
      }
      isHeaderVisible={props.isHeaderVisible}
    />
  );
};
