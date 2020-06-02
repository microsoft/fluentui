import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { create, act } from 'react-test-renderer';
import { mru } from '@uifabric/example-data';
import { BaseFloatingSuggestions } from './FloatingSuggestions';
import * as ReactDOM from 'react-dom';
import {
  IFloatingSuggestionItem,
  IFloatingSuggestionOnRenderItemProps,
  IFloatingSuggestionItemProps,
} from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';
import * as ReactTestUtils from 'react-dom/test-utils';

export interface ISimple {
  key: string;
  name: string;
}

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
  }
  container = null;
});

export type TypedFloatingSimpleSuggestionsProps = Omit<IBaseFloatingSuggestionsProps<ISimple>, 'onRenderSuggestion'>;

describe('FloatingSuggestions', () => {
  const renderNothing = () => <></>;
  const isSuggestionsVisible = false;
  const _onSuggestionSelected = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    item: IFloatingSuggestionItemProps<ISimple>,
  ) => {
    console.log(item);
  };

  const _onSuggestionRemoved = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestionToRemove: IFloatingSuggestionItemProps<ISimple>,
  ) => {
    console.log(suggestionToRemove);
  };
  it('renders FloatingSuggestions correctly', () => {
    const component = create(
      <BaseFloatingSuggestions
        onRenderNoResultFound={renderNothing}
        isSuggestionsVisible={isSuggestionsVisible}
        suggestions={[]}
        targetElement={null}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FloatingSuggestions with suggestions visible false', () => {
    const _suggestions = ([
      {
        key: '3',
        id: '3',
        displayText: 'Suggestion 3',
        item: mru[2],
        isSelected: false,
        showRemoveButton: true,
      },
    ] as unknown) as IFloatingSuggestionItem<ISimple>[];

    const component = create(
      <BaseFloatingSuggestions
        isSuggestionsVisible={isSuggestionsVisible}
        suggestions={_suggestions}
        targetElement={null}
      />,
    );

    expect(component).toBeTruthy();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FloatingSuggestions with suggestions visible true', () => {
    const _suggestions = ([
      {
        key: '3',
        id: '3',
        displayText: 'Suggestion 3',
        item: mru[2],
        isSelected: false,
        showRemoveButton: true,
        name: 'Alexa',
      },
      {
        key: '1',
        id: '1',
        displayText: 'Suggestion 1',
        item: mru[1],
        isSelected: false,
        showRemoveButton: true,
        name: 'Alexis',
      },
    ] as unknown) as IFloatingSuggestionItem<ISimple>[];

    const root = document.createElement('div');
    document.body.appendChild(root);

    const picker = React.createRef<HTMLDivElement>();
    // Our functional tests need to run against actual DOM for callouts to work,
    // since callout mount a new react root with ReactDOM.
    //
    // see https://github.com/facebook/react/pull/12895
    act(() => {
      (ReactDOM.render(
        <BaseFloatingSuggestions
          suggestions={_suggestions}
          isSuggestionsVisible={true}
          componentRef={picker}
          targetElement={null}
          suggestionsHeaderText={'People suggestions'}
          noResultsFoundText={'No suggestions'}
          onFloatingSuggestionsDismiss={undefined}
          showSuggestionRemoveButton={true}
          onSuggestionSelected={_onSuggestionSelected}
          onRemoveSuggestion={_onSuggestionRemoved}
        />,
        container,
      ) as unknown) as IBaseFloatingSuggestionsProps<ISimple>;
    });

    const baseFloatingPicker = document.querySelector('.ms-BaseFloatingPicker') as HTMLInputElement;
    expect(baseFloatingPicker).toBeTruthy();

    const floatingSuggestions = document.querySelector('.ms-FloatingSuggestions') as HTMLInputElement;
    expect(floatingSuggestions).toBeTruthy();

    const callout = container?.getElementsByClassName('.ms-FloatingSuggestions-callout');
    expect(callout).toBeTruthy();

    const firstElement = container?.getElementsByClassName('ms-FloatingSuggestionsList-container');
    expect(firstElement).toBeTruthy();

    const allDivs = container?.querySelector('div');
    ReactDOM.unmountComponentAtNode(root);
  });
});
