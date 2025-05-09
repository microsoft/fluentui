import * as React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
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
    const picker = React.createRef<IBasePicker<IPersonaProps>>();

    render(<NormalPeoplePicker onResolveSuggestions={onResolveSuggestions} componentRef={picker} />);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    act(() => {
      input.focus();
    });
    input.value = 'Valentyna';

    fireEvent.input(input);
    act(() => {
      jest.runAllTimers();
    });

    const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;
    expect(suggestions).toBeTruthy();

    const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
    expect(suggestionOptions.length).toEqual(1);

    fireEvent.click(suggestionOptions[0]);
    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);
    expect(currentPicker![0].text).toEqual('Valentyna Lovrique');

    const removeButton = document.querySelector('.ms-PickerItem-removeButton') as HTMLButtonElement;
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton);
    const currentPickerAfterRemove = picker.current!.items;
    expect(currentPickerAfterRemove).toHaveLength(0);
  });

  it('cannot remove people when disabled', () => {
    const picker = React.createRef<IBasePicker<IPersonaProps>>();
    const selectedPeople = people.splice(0, 1);

    render(
      <NormalPeoplePicker
        onResolveSuggestions={onResolveSuggestions}
        componentRef={picker}
        disabled={true}
        defaultSelectedItems={selectedPeople}
      />,
    );

    const currentPicker = picker.current!.items;
    expect(currentPicker).toHaveLength(1);

    const removeButton = document.querySelector('.ms-PickerItem-removeButton') as HTMLButtonElement;
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton);
    const currentPickerAfterClick = picker.current!.items;
    expect(currentPickerAfterClick).toHaveLength(1);
  });

  isConformant({
    Component: NormalPeoplePicker,
    displayName: 'NormalPeoplePicker',
    // Problem: Doesn't handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['has-top-level-file', 'name-matches-filename', 'component-has-root-ref', 'component-handles-ref'],
  });
});
