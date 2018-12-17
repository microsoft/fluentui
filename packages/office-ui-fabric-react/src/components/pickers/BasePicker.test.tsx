import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { TagPicker } from './TagPicker/TagPicker';
import { ITag } from './TagPicker/TagPicker.types';
import { IBasePickerProps, IBasePicker } from './BasePicker.types';
import { BasePicker } from './BasePicker';
import { IPickerItemProps } from './PickerItem.types';
import { resetIds } from '@uifabric/utilities';

function onResolveSuggestions(text: string): ITag[] {
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
  ]
    .filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map(item => ({ key: item, name: item }));
}

export interface ISimple {
  key: string;
  name: string;
}

const basicRenderer = (props: IPickerItemProps<ISimple>) => {
  return <div> {props.item.name} </div>;
};

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> {props.name} </div>;
};

describe('Pickers', () => {
  describe('BasePicker', () => {
    beforeEach(() => {
      resetIds();
    });
    const BasePickerWithType = BasePicker as new (props: IBasePickerProps<ISimple>) => BasePicker<ISimple, IBasePickerProps<ISimple>>;
    const onRenderItem = (props: IPickerItemProps<ISimple>): JSX.Element => <div key={props.item.name}>{basicRenderer(props)}</div>;

    it('renders BasePicker correctly', () => {
      const component = renderer.create(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders BasePicker with inputProps supply classnames correctly', () => {
      const component = renderer.create(
        <BasePickerWithType
          inputProps={{
            placeholder: 'Bitte einen Benutzer angeben...',
            id: 'pckSelectedUser',
            className: 'testclass '
          }}
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can provide custom renderers', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
        root
      );

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;
      expect(suggestions).toBeDefined();

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      expect(suggestionOptions.length).toEqual(2);
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      const currentPicker = picker.current!.items;
      expect(currentPicker).toHaveLength(1);
      expect(currentPicker![0].name).toEqual('black');

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can will not render input when items reach itemLimit', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={1}
          componentRef={picker}
        />,
        root
      );

      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      const currentPicker = picker.current!.items;
      expect(currentPicker).toHaveLength(1);

      input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('will still render with itemLimit set to 0', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={0}
        />,
        root
      );

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can be set with selectedItems and a lower itemLimit', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(
        <BasePickerWithType
          selectedItems={[{ key: '1', name: 'blue' }, { key: '2', name: 'black' }]}
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={0}
          componentRef={picker}
        />,
        root
      );

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();

      const currentPicker = picker.current!.items;
      expect(currentPicker).toHaveLength(2);

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can render MRU when input is focused', () => {
      const root = document.createElement('div');
      const resolveSuggestions = () => onResolveSuggestions('');
      document.body.appendChild(root);

      const picker = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onEmptyInputFocus={resolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          componentRef={picker}
        />,
        root
      );

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;
      expect(suggestions).toBeDefined();

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      expect(suggestionOptions.length).toEqual(15);

      const currentPicker = picker.current!.items;
      expect(currentPicker).toHaveLength(0);

      ReactDOM.unmountComponentAtNode(root);
    });
  });

  describe('TagPicker', () => {
    beforeEach(() => {
      resetIds();
    });

    it('renders TagPicker correctly', () => {
      const component = renderer.create(<TagPicker onResolveSuggestions={onResolveSuggestions} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can search for and select tags', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />, root);

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';

      ReactTestUtils.Simulate.input(input);

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).toBeDefined();
      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      expect(suggestionOptions.length).toEqual(2);
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      const currentPicker = picker.current!.items;
      expect(currentPicker).toHaveLength(1);
      expect(currentPicker![0].name).toEqual('black');

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can be a controlled component', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const pickerBeforeUpdate = React.createRef<IBasePicker<ISimple>>();
      const pickerAfterUpdate = React.createRef<IBasePicker<ISimple>>();

      ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} componentRef={pickerBeforeUpdate} />, root);
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      const currentPicker = pickerBeforeUpdate.current!.items;
      expect(currentPicker).toHaveLength(0);

      ReactDOM.render(
        <TagPicker
          onResolveSuggestions={onResolveSuggestions}
          selectedItems={[{ key: 'testColor', name: 'testColor' }]}
          componentRef={pickerAfterUpdate}
        />,
        root
      );

      const updatedPicker = pickerAfterUpdate.current!.items;
      expect(updatedPicker).toHaveLength(1);
      expect(updatedPicker![0].name).toEqual('testColor');

      ReactDOM.unmountComponentAtNode(root);
    });
    it('fires change events correctly for controlled components', done => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const onChange = (items: ITag[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('black');
        done();
      };

      ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} onChange={onChange} />, root);
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});
