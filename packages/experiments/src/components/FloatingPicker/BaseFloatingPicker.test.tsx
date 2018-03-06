/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { IBaseFloatingPickerProps } from './BaseFloatingPicker.types';
import { BaseFloatingPicker } from './BaseFloatingPicker';
import { SuggestionsController } from 'office-ui-fabric-react/lib/Pickers';

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
    'yellow'
  ].filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0).map(item => ({ key: item, name: item }));
}

function onZeroQuerySuggestion(): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan'].map(item => ({ key: item, name: item }));
}

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> { props.name } </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBasePicker = BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BasePickerWithType = BaseFloatingPicker as new (props: IBaseFloatingPickerProps<ISimple>) => BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

    it('renders BaseFloatingPicker correctly', () => {
      const component = renderer.create(
        <BasePickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          suggestionsController={ new SuggestionsController() }
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('shows zero query options on empty input', () => {
      let root = document.createElement('div');
      let input = document.createElement('input');
      document.body.appendChild(input);
      document.body.appendChild(root);

      let picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          suggestionsController={ new SuggestionsController() }
          onZeroQuerySuggestion={ onZeroQuerySuggestion }
          inputElement={ input }
        />,
        root
      ) as TypedBasePicker;

      picker.onQueryStringChanged('a');

      // Change input to be empty string
      picker.onQueryStringChanged('');
      debugger

      expect(picker.suggestions.length).toEqual(4);

      ReactDOM.unmountComponentAtNode(root);
    });
  })});
