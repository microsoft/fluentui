/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, DevOnlyStoryHeader } from '../utilities';
import { Suggestions, ISuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

type Province = {
  name: string;
  id: string;
};

const provinceData: Province[] = [
  {
    name: 'Imaginary Province With An Incredibly Long Name That Will Overflow The View',
    id: 'fake-long-province'
  },
  { name: 'Ontario', id: 'ON' },
  { name: 'Quebec', id: 'QC' },
  { name: 'Nova Scotia', id: 'NS' },
  { name: 'New Brunswick', id: 'NB' },
  { name: 'Manitoba', id: 'MB' },
  { name: 'British Columbia', id: 'BC' },
  { name: 'Prince Edward Island', id: 'PE' },
  { name: 'Saskatchewan', id: 'SK' },
  { name: 'Alberta', id: 'AB' },
  { name: 'Newfoundland and Labrador', id: 'NL' }
];

type ProvincesMap = { [key: string]: Province };

const getProvincesMap = () => {
  const provincesObj: ProvincesMap = {};
  provinceData.forEach(province => {
    provincesObj[province.id] = province;
  });
  return provincesObj;
};

const makeProvinceIntoSuggestion = (Province: Province) => ({
  item: Province,
  selected: false,
  ariaLabel: Province.name
});

const ProvinceSuggestionItem = ({ name, id }: Province) => (
  <div
    id={`province-${id}`}
    style={{
      minWidth: 0,
      flexShrink: 1
    }}
    data-is-focusable={true}
  >
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // Fix for text alignment in one line overflow contexts in webkit
        textAlign: 'justify'
      }}
    >
      {name}
    </div>
  </div>
);
const NoResultFound = () => <div>No Result Found ¯\_(ツ)_/¯</div>;

export class SimpleSuggestionsExample extends React.Component<{}, { Provinces: ProvincesMap }> {
  ProvinceSuggestions: new (props: ISuggestionsProps<Province>) => Suggestions<
    Province
  > = Suggestions;

  constructor(props: {}) {
    super(props);
    this.state = {
      Provinces: getProvincesMap()
    };
  }

  private removeProvince(removedProvince: Province) {
    this.setState(() => {
      delete this.state.Provinces[removedProvince.id];
      return { Provinces: this.state.Provinces };
    });
  }

  public render(): JSX.Element {
    return (
      <div
        className="testRoot"
        style={{
          height: '80vh',
          position: 'relative',
          maxHeight: 'inherit',
          width: '400px'
        }}
      >
        <Fabric>
          <DevOnlyStoryHeader>
            This story tests that wide dynamically-sized custom SuggestionItems shrink to fit the
            available space when the Close button appears on hover.
          </DevOnlyStoryHeader>

          <this.ProvinceSuggestions
            showRemoveButtons={true}
            suggestions={Object.keys(this.state.Provinces).map(key =>
              makeProvinceIntoSuggestion(this.state.Provinces[key])
            )}
            onSuggestionClick={(_: any, Province: Province) => {
              alert(`clicked ${Province.name} `);
            }}
            onRenderNoResultFound={NoResultFound}
            onRenderSuggestion={ProvinceSuggestionItem}
            // TODO (ajective-object) update this once I fix the Suggestions
            // typedef for onSuggestionRemove.
            onSuggestionRemove={(_ev?: any, removedProvince?: any, _index?: any) =>
              removedProvince && this.removeProvince(removedProvince as Province)
            }
          />
        </Fabric>
      </div>
    );
  }
}

storiesOf('(Dev-Only) Suggestions', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testRoot' })
        .hover('#province-fake-long-province')
        .snapshot('Hovering over a wide suggestion element', { cropTo: '.testRoot' })
        .hover('#sug-0 .ms-Suggestions-closeButton')
        .snapshot('Hovering over the X button on a wide suggestion element', {
          cropTo: '.testRoot'
        })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Test of closeButton with overflowing wide custom element', () => (
    <SimpleSuggestionsExample />
  ));
