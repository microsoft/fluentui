import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { resetIds } from '@fluentui/utilities';
import { people } from '@fluentui/example-data';
import { NormalPeoplePicker } from './PeoplePicker';
import { isConformant } from '../../../common/isConformant';
import type { IBasePicker } from '../BasePicker.types';
import type { IPersonaProps } from '../../Persona/Persona.types';

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
      <NormalPeoplePicker onResolveSuggestions={onResolveSuggestions} defaultSelectedItems={people.splice(0, 1)} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can search for, select people and remove them', () => {
    jest.useFakeTimers();
    const root = document.createElement('div');
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<IPersonaProps>>();

    ReactDOM.render(<NormalPeoplePicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />, root);

    const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
    input.focus();
    input.value = 'Valentyna';

    ReactTestUtils.Simulate.input(input);
    ReactTestUtils.act(() => {
      jest.runAllTimers();
    });

    const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;
    expect(suggestions).toBeTruthy();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(1);

    ReactTestUtils.Simulate.click(suggestionOptions[0]);
    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].text).toEqual('Valentyna Lovrique');

    const removeButton = document.querySelector('.ms-PickerItem-removeButton') as HTMLButtonElement;
    expect(removeButton).toBeTruthy();

    ReactTestUtils.Simulate.click(removeButton);
    const currentPickerAfterRemove = picker.current!.items;
    expect(currentPickerAfterRemove).toHaveLength(0);

    ReactDOM.unmountComponentAtNode(root);
  });

  it('cannot remove people when disabled', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const picker = React.createRef<IBasePicker<IPersonaProps>>();
    const selectedPeople = people.splice(0, 1);
    ReactDOM.render(
      <NormalPeoplePicker
        onResolveSuggestions={onResolveSuggestions}
        componentRef={picker}
        disabled={true}
        defaultSelectedItems={selectedPeople}
      />,
      root,
    );

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);

    const removeButton = document.querySelector('.ms-PickerItem-removeButton') as HTMLButtonElement;
    expect(removeButton).toBeTruthy();

    ReactTestUtils.Simulate.click(removeButton);
    const currentPickerAfterClick = picker.current!.items;
    expect(currentPickerAfterClick).toHaveLength(1);

    ReactDOM.unmountComponentAtNode(root);
  });

  isConformant({
    Component: NormalPeoplePicker,
    displayName: 'NormalPeoplePicker',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['has-top-level-file', 'name-matches-filename', 'component-has-root-ref', 'component-handles-ref'],
  });
});
