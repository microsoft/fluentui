import * as React from 'react';
import { create } from 'react-test-renderer';
import { BaseFloatingSuggestions } from './FloatingSuggestions';
import { render, fireEvent } from '@testing-library/react';
import type { IFloatingSuggestionItem } from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import type { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';

export interface ISimple {
  key: string;
  name: string;
}

let _suggestions: IFloatingSuggestionItem<ISimple>[];

const items: ISimple[] = [
  { key: '1', name: 'a' },
  { key: '2', name: 'b' },
];

const _onSuggestionSelected = jest.fn();
const _onSuggestionRemoved = jest.fn();

const picker = React.createRef<HTMLDivElement>();

beforeEach(() => {
  _suggestions = [
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
  ] as unknown as IFloatingSuggestionItem<ISimple>[];
});

afterEach(() => {
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
    // Using React Testing Library instead of ReactDOM
    render(
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
    );

    const floatingSuggestions = document.querySelector('.ms-FloatingSuggestions') as HTMLElement;
    expect(floatingSuggestions).toBeTruthy();

    const callout = document.querySelector('.ms-FloatingSuggestions-callout');
    expect(callout).toBeTruthy();

    const suggestionsList = document.querySelectorAll('div[id^=FloatingSuggestionsItemId]');
    expect(suggestionsList.length).toEqual(2);

    // Right suggestions should be displayed
    const suggestionDisplayText = document.querySelectorAll('div[class^=ms-FloatingSuggestionsItem-displayText]');
    expect(suggestionDisplayText.length).toEqual(2);
    expect(suggestionDisplayText[0].textContent).toEqual('Suggestion 1');
    expect(suggestionDisplayText[1].textContent).toEqual('Suggestion 2');
  });

  it('renders FloatingSuggestions and updates when suggestions are removed', () => {
    render(
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
    );

    const suggestionListButtons = document.querySelectorAll('.ms-FloatingSuggestionsItem-itemButton');
    expect(suggestionListButtons.length).toEqual(2);
    fireEvent.click(suggestionListButtons[0]);
    fireEvent.click(suggestionListButtons[1]);
    expect(_onSuggestionSelected).toHaveBeenCalledTimes(2);

    const closeButtons = document.querySelectorAll('.ms-FloatingSuggestionsItem-closeButton');
    // There should be 2 close buttons for each suggestion.
    expect(closeButtons.length).toEqual(2);

    fireEvent.click(closeButtons[0]);
    // On closing, suggestion removed should be called once.
    expect(_onSuggestionRemoved).toHaveBeenCalledTimes(1);
  });

  it('shows no suggestions when no suggestions are provided', () => {
    _suggestions = [];
    render(
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
    );

    const suggestionsList = document.querySelectorAll('div[id^=FloatingSuggestionsItemId]');
    expect(suggestionsList.length).toEqual(0);

    const componentHeader = document.querySelectorAll('.ms-FloatingSuggestionsList-title');
    expect(componentHeader.length).toEqual(1);
    expect(componentHeader[0].textContent).toEqual('People Test Suggestions');

    const noResultText = document.querySelectorAll('.ms-FloatingSuggestionsList-noSuggestions');
    expect(noResultText.length).toEqual(1);
    expect(noResultText[0].textContent).toEqual('No Test Suggestions');
  });
});
