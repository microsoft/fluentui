import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

// import { IBasePicker } from '../BasePicker.types';
import { resetIds } from '@uifabric/utilities';
import { people } from './examples/PeoplePickerExampleData';
import { NormalPeoplePicker } from './PeoplePicker';
import { IPersonaProps } from '../../Persona';

function onResolveSuggestions(text: string): IPersonaProps[] {
  return people.filter((person: IPersonaProps) => person.text!.toLowerCase().indexOf(text.toLowerCase()) === 0);
}

describe('PeoplePicker', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const component = renderer.create(<NormalPeoplePicker onResolveSuggestions={onResolveSuggestions} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with preselected items', () => {
    const component = renderer.create(
      <NormalPeoplePicker onResolveSuggestions={onResolveSuggestions} defaultSelectedItems={people.splice(0, 1)} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('can search for and select tags', () => {
  //   const root = document.createElement('div');
  //   document.body.appendChild(root);

  //   const picker = React.createRef<IBasePicker<ITag>>();

  //   ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />, root);

  //   const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
  //   input.focus();
  //   input.value = 'bl';

  //   ReactTestUtils.Simulate.input(input);

  //   const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

  //   expect(suggestions).toBeDefined();
  //   const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

  //   expect(suggestionOptions.length).toEqual(2);
  //   ReactTestUtils.Simulate.click(suggestionOptions[0]);

  //   const currentPicker = picker.current!.items;
  //   expect(currentPicker).toHaveLength(1);
  //   expect(currentPicker![0].name).toEqual('black');

  //   ReactDOM.unmountComponentAtNode(root);
  // });

  // it('can be a controlled component', () => {
  //   const root = document.createElement('div');
  //   document.body.appendChild(root);

  //   const pickerBeforeUpdate = React.createRef<IBasePicker<ITag>>();
  //   const pickerAfterUpdate = React.createRef<IBasePicker<ITag>>();

  //   ReactDOM.
  // render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} componentRef={pickerBeforeUpdate} />, root);
  //   const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

  //   input.focus();
  //   input.value = 'bl';
  //   ReactTestUtils.Simulate.input(input);

  //   const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

  //   ReactTestUtils.Simulate.click(suggestionOptions[0]);

  //   const currentPicker = pickerBeforeUpdate.current!.items;
  //   expect(currentPicker).toHaveLength(0);

  //   ReactDOM.render(
  //     <TagPicker
  //       onResolveSuggestions={onResolveSuggestions}
  //       selectedItems={[{ key: 'testColor', name: 'testColor' }]}
  //       componentRef={pickerAfterUpdate}
  //     />,
  //     root
  //   );

  //   const updatedPicker = pickerAfterUpdate.current!.items;
  //   expect(updatedPicker).toHaveLength(1);
  //   expect(updatedPicker![0].name).toEqual('testColor');

  //   ReactDOM.unmountComponentAtNode(root);
  // });
  // it('fires change events correctly for controlled components', done => {
  //   const root = document.createElement('div');
  //   document.body.appendChild(root);
  //   const onChange = (items: ITag[] | undefined): void => {
  //     expect(items!.length).toBe(1);
  //     expect(items![0].name).toBe('black');
  //     done();
  //   };

  //   ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} onChange={onChange} />, root);
  //   const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

  //   input.focus();
  //   input.value = 'bl';
  //   ReactTestUtils.Simulate.input(input);

  //   const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

  //   ReactTestUtils.Simulate.click(suggestionOptions[0]);

  //   ReactDOM.unmountComponentAtNode(root);
  // });
});
