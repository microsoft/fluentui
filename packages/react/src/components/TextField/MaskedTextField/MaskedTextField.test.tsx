import * as React from 'react';
import { mount } from 'enzyme';
import { KeyCodes } from '../../../Utilities';
import { mockEvent } from '../../../common/testUtilities';
import { resetIds } from '@fluentui/utilities';
import { act } from 'react-dom/test-utils';
import { MaskedTextField } from './MaskedTextField';
import { safeCreate } from '@fluentui/test-utilities';
import { isConformant } from '../../../common/isConformant';

describe('MaskedTextField', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    safeCreate(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: MaskedTextField,
    displayName: 'MaskedTextField',
    disabledTests: ['has-top-level-file'],
  });

  it('Moves caret on focus', () => {
    const component = mount(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);

    const input = component.find('input');
    act(() => {
      input.simulate('focus');
    });
    expect((input.getDOMNode() as HTMLInputElement).selectionStart).toEqual(7);
  });

  it('can change single character', () => {
    const component = mount(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');
    });

    // Simulate pressing the '1' key
    act(() => {
      input.simulate('keyDown', { keyCode: KeyCodes.one });
      inputDOM.setSelectionRange(8, 8);
      input.simulate('change', mockEvent('mask: (1___) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (1__) ___ - ____');

    // Simulate pressing the '2' key
    act(() => {
      input.simulate('keyDown', { keyCode: KeyCodes.two });
      inputDOM.setSelectionRange(9, 9);
      input.simulate('change', mockEvent('mask: (12__) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (12_) ___ - ____');
  });

  it('can replace single character', () => {
    const component = mount(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate pressing the '1' key
      input.simulate('keyDown', { keyCode: KeyCodes.one });
      inputDOM.setSelectionRange(8, 8);
      input.simulate('change', mockEvent('mask: (1___) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (1__) ___ - ____');

    // Replacing a character
    act(() => {
      input.simulate('keyDown', { keyCode: KeyCodes.two });
      inputDOM.setSelectionRange(8, 8);
      input.simulate('change', mockEvent('mask: (21__) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (2__) ___ - ____');
  });

  it('should ignore incorrect format characters', () => {
    const component = mount(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate pressing the '1' key
      input.simulate('keyDown', { keyCode: KeyCodes.one });
      inputDOM.setSelectionRange(8, 8);
      input.simulate('change', mockEvent('mask: (1___) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (1__) ___ - ____');

    act(() => {
      // Simulate pressing the 'a' key
      input.simulate('keyDown', { keyCode: KeyCodes.a });
      inputDOM.setSelectionRange(9, 9);
      input.simulate('change', mockEvent('mask: (1a__) ___ - ____'));
    });
    expect(inputDOM.value).toEqual('mask: (1__) ___ - ____');
  });

  it('should backspace', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate backspacing the '2'
      inputDOM.setSelectionRange(9, 9);
      input.simulate('keyDown', { keyCode: KeyCodes.backspace });
      input.simulate('change', mockEvent('mask: (13) 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (1_3) 456 - 7890');
  });

  it('should delete', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate deleting the '3'
      inputDOM.setSelectionRange(9, 9);
      input.simulate('keyDown', { keyCode: KeyCodes.del });
      input.simulate('change', mockEvent('mask: (12) 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (12_) 456 - 7890');
  });

  it('should ctrl backspace', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate backspacing the '123'
      inputDOM.setSelectionRange(10, 10);
      input.simulate('keyDown', { keyCode: KeyCodes.backspace, ctrlKey: true });
      inputDOM.setSelectionRange(7, 7);
      input.simulate('change', mockEvent('mask: () 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (___) 456 - 7890');
  });

  it('should ctrl delete', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Simulate deleting the '123'
      inputDOM.setSelectionRange(7, 7);
      input.simulate('keyDown', { keyCode: KeyCodes.del, ctrlKey: true });
      input.simulate('change', mockEvent('mask: () 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (___) 456 - 7890');
  });

  it('should backspace and delete selections', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');
    });

    // Simulate selecting and backspacing the '123'
    // Also select the preceding '('
    act(() => {
      inputDOM.setSelectionRange(6, 10);
      input.simulate('keyDown', { keyCode: KeyCodes.backspace });
      input.simulate('change', mockEvent('mask:  456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (___) 456 - 7890');

    // Simulate selecting and deleting the '456'
    // also select the proceding ' '
    act(() => {
      inputDOM.setSelectionRange(12, 16);
      input.simulate('keyDown', { keyCode: KeyCodes.del });
      input.simulate('change', mockEvent('mask: (___) - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (___) ___ - 7890');
  });

  it('should paste characters', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Paste a 7777 into the start of the input
      inputDOM.setSelectionRange(0, 0);
      input.simulate('paste');
      input.simulate('change', mockEvent('7777mask: (123) 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (777) 756 - 7890');

    act(() => {
      // Paste a 9999 into the end
      inputDOM.setSelectionRange(22, 22);
      input.simulate('paste');
      input.simulate('change', mockEvent('mask: (777) 756 - 78909999'));
    });
    expect(inputDOM.value).toEqual('mask: (777) 756 - 7890');

    act(() => {
      // Paste invalid characters mixed with valid characters
      inputDOM.setSelectionRange(0, 0);
      input.simulate('paste');
      input.simulate('change', mockEvent('1a2b3cmask: (777) 756 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (123) 756 - 7890');
  });

  it('should paste over selected characters', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Paste a 000 over the '123'
      inputDOM.setSelectionRange(7, 10);
      input.simulate('paste');
      input.simulate('change', mockEvent('mask: (000) 456 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (000) 456 - 7890');

    // Replace all characters with a paste
    act(() => {
      inputDOM.setSelectionRange(0, 22);
      input.simulate('paste');
      input.simulate('change', mockEvent('98765'));
    });
    expect(inputDOM.value).toEqual('mask: (987) 65_ - ____');
  });

  it('should replace selected text a char added', () => {
    const component = mount(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="123-456-7890" />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Replace '23) 45' text with '6'
      inputDOM.setSelectionRange(8, 14);
      input.simulate('keyDown', { keyCode: KeyCodes.six });
      inputDOM.setSelectionRange(9, 9);
      input.simulate('change', mockEvent('mask: (166 - 7890'));
    });
    expect(inputDOM.value).toEqual('mask: (16_) __6 - 7890');

    // Replace all text with '9'
    act(() => {
      inputDOM.setSelectionRange(0, 22);
      input.simulate('keyDown', { keyCode: KeyCodes.nine });
      inputDOM.setSelectionRange(1, 1);
      input.simulate('change', mockEvent('9'));
    });
    expect(inputDOM.value).toEqual('mask: (9__) ___ - ____');
  });

  it('should ignore overflowed characters', () => {
    let onChangeValue;
    const component = mount(
      <MaskedTextField
        onChange={(ev, newValue) => (onChangeValue = newValue)}
        label="With input mask"
        mask="m\ask: (999) 999 - 9999"
        value="123-456-7890"
      />,
    );

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;
    act(() => {
      input.simulate('focus');

      // Add '1' to the end
      inputDOM.setSelectionRange(22, 22);
      input.simulate('keyDown', { keyCode: KeyCodes.one });
      inputDOM.setSelectionRange(23, 23);
      input.simulate('change', mockEvent('mask: (123) 456 - 78901'));
    });
    expect(inputDOM.value).toEqual('mask: (123) 456 - 7890');
    expect(onChangeValue).toEqual('mask: (123) 456 - 7890');
  });

  it('should update the value when props update', () => {
    const value = '';
    const component = mount(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value={value} />);

    const input = component.find('input');
    const inputDOM = input.getDOMNode() as HTMLInputElement;

    expect(inputDOM.value).toEqual('mask: (___) ___ - ____');

    component.setProps({ value: '1234567890' });
    expect(inputDOM.value).toEqual('mask: (123) 456 - 7890');
  });
});
