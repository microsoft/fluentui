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
let _suggestions: IFloatingSuggestionItem<ISimple>[];

const items: ISimple[] = [
  { key: '1', name: 'a' },
  { key: '2', name: 'b' },
];

const _onSuggestionSelected = jest.fn();
const _onSuggestionRemoved = jest.fn();

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  _suggestions = ([
    {
      key: '1',
      id: '1',
      displayText: 'Suggestion 1',
      item: items[0],
      isSelected: false,
      showRemoveButton: true,
      name: 'Alexa',
    },
    {
      key: '2',
      id: '2',
      displayText: 'Suggestion 2',
      item: items[1],
      isSelected: false,
      showRemoveButton: true,
      name: 'Alexis',
    },
  ] as unknown) as IFloatingSuggestionItem<ISimple>[];
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
    ReactDOM.unmountComponentAtNode(container);
    container = null;
  }
  jest.clearAllMocks();
});

export type TypedFloatingSimpleSuggestionsProps = Omit<IBaseFloatingSuggestionsProps<ISimple>, 'onRenderSuggestion'>;

describe('FloatingSuggestions', () => {
  const renderNothing = () => <></>;
  const isSuggestionsVisible = false;
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
          suggestionsHeaderText={'People Test Suggestions'}
          noResultsFoundText={'No Test Suggestions'}
          onFloatingSuggestionsDismiss={undefined}
          showSuggestionRemoveButton={true}
          onSuggestionSelected={_onSuggestionSelected}
          onRemoveSuggestion={_onSuggestionRemoved}
        />,
        container,
      ) as unknown) as IBaseFloatingSuggestionsProps<ISimple>;
    });

    const floatingSuggestions = document.querySelector('.ms-FloatingSuggestions') as HTMLInputElement;
    expect(floatingSuggestions).toBeTruthy();

    const callout = container?.getElementsByClassName('.ms-FloatingSuggestions-callout');
    expect(callout).toBeTruthy();

    const suggestionsList = document.querySelectorAll('div[id^=FloatingSuggestionsItemId]');
    expect(suggestionsList.length).toEqual(2);

    const suggestionListButtons = document.querySelectorAll('.ms-FloatingSuggestionsItem-itemButton');
    expect(suggestionListButtons.length).toEqual(2);
    ReactTestUtils.Simulate.click(suggestionListButtons[0]);
    ReactTestUtils.Simulate.click(suggestionListButtons[1]);
    expect(_onSuggestionSelected).toHaveBeenCalledTimes(2);

    const closeButtons = document.querySelectorAll('.ms-FloatingSuggestionsItem-closeButton');
    // There should be 2 close buttons for each suggestion.
    expect(closeButtons.length).toEqual(2);

    ReactTestUtils.Simulate.click(closeButtons[0]);
    // On closing, suggestion removed should be called once.
    expect(_onSuggestionRemoved).toHaveBeenCalledTimes(1);
  });

  it('shows no suggestions when no suggestions are provided', () => {
    const picker = React.createRef<HTMLDivElement>();
    // Our functional tests need to run against actual DOM for callouts to work,
    // since callout mount a new react root with ReactDOM.
    //
    // see https://github.com/facebook/react/pull/12895
    _suggestions = [];
    act(() => {
      (ReactDOM.render(
        <BaseFloatingSuggestions
          suggestions={_suggestions}
          isSuggestionsVisible={true}
          componentRef={picker}
          targetElement={null}
          suggestionsHeaderText={'People Test Suggestions'}
          noResultsFoundText={'No Test Suggestions'}
          onFloatingSuggestionsDismiss={undefined}
          showSuggestionRemoveButton={true}
          onSuggestionSelected={_onSuggestionSelected}
          onRemoveSuggestion={_onSuggestionRemoved}
        />,
        container,
      ) as unknown) as IBaseFloatingSuggestionsProps<ISimple>;
    });

    const floatingSuggestions = document.querySelector('.ms-FloatingSuggestions') as HTMLInputElement;
    expect(floatingSuggestions).toBeTruthy();

    const suggestionsList = document.querySelectorAll('div[id^=FloatingSuggestionsItemId]');
    expect(suggestionsList.length).toEqual(0);

    const componentHeader = document.querySelectorAll('.ms-FloatingSuggestionsList-title');
    expect(componentHeader).toEqual(1);
    expect(componentHeader[0].textContent).toEqual('People Test Suggestions');

    const noResultText = document.querySelectorAll('.ms-FloatingSuggestionsList-noSuggestions');
    expect(noResultText).toEqual(1);
    expect(componentHeader[0].textContent).toEqual('No Test Suggestions');
  });
});
