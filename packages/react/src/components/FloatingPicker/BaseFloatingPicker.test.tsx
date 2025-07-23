import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, act } from '@testing-library/react';
import { BaseFloatingPicker } from './BaseFloatingPicker';
import { SuggestionsStore } from './Suggestions/SuggestionsStore';
import type { IBaseFloatingPickerProps } from './BaseFloatingPicker.types';

function onResolveSuggestions(text: string): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan',
    'green',
    'magenta',
    'mauve',
    'orange',
    'pink',
    'purple',
    'red',
    'rose',
    'violet',
    'white',
    'yellow',
  ]
    .filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map((item: string) => ({ key: item, name: item }));
}

function onZeroQuerySuggestion(): ISimple[] {
  return ['black', 'blue', 'brown', 'cyan'].map((item: string) => ({ key: item, name: item }));
}

const basicSuggestionRenderer = (props: ISimple) => {
  return <div key={props.key}> {props.name} </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBaseFloatingPicker = BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BaseFloatingPicker', () => {
    const BaseFloatingPickerWithType = BaseFloatingPicker as new (
      props: IBaseFloatingPickerProps<ISimple>,
    ) => BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

    it('renders BaseFloatingPicker correctly', () => {
      const component = renderer.create(
        <BaseFloatingPickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          suggestionsStore={new SuggestionsStore<ISimple>()}
        />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('shows zero query options on empty input', () => {
      const input = document.createElement('input');
      const pickerRef = React.createRef<TypedBaseFloatingPicker>();

      render(
        <BaseFloatingPickerWithType
          componentRef={pickerRef}
          onResolveSuggestions={onResolveSuggestions}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          suggestionsStore={new SuggestionsStore<ISimple>()}
          onZeroQuerySuggestion={onZeroQuerySuggestion}
          inputElement={input}
        />,
      );

      const picker = pickerRef.current!;

      input.value = 'a';
      act(() => {
        picker.onQueryStringChanged('a');
      });

      input.value = '';
      act(() => {
        picker.onQueryStringChanged('');
      });

      expect(picker.suggestions.length).toEqual(4);
    });

    it('updates suggestions on query string changed', () => {
      jest.useFakeTimers();
      const input = document.createElement('input');
      const pickerRef = React.createRef<TypedBaseFloatingPicker>();

      render(
        <BaseFloatingPickerWithType
          componentRef={pickerRef}
          onResolveSuggestions={onResolveSuggestions}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          suggestionsStore={new SuggestionsStore<ISimple>()}
          inputElement={input}
        />,
      );

      const picker = pickerRef.current!;

      input.value = 'b';
      act(() => {
        picker.onQueryStringChanged('b');
        jest.runAllTimers();
      });

      expect(picker.suggestions.length).toEqual(3);
    });
  });
});
