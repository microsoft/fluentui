import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { setWarningCallback } from '@uifabric/utilities';

import { ComboBox, IComboBoxState } from './ComboBox';
import { IComboBoxOption, IComboBoxProps } from './ComboBox.types';

const DEFAULT_OPTIONS: IComboBoxOption[] = [{ key: '1', text: '1' }, { key: '2', text: '2' }, { key: '3', text: '3' }];

type InputElementWrapper = ReactWrapper<React.InputHTMLAttributes<any>, any>;

let wrapper: ReactWrapper<IComboBoxProps, IComboBoxState, ComboBox> | undefined;

describe('ComboBox', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('Renders ComboBox correctly', () => {
    const createNodeMock = (el: React.ReactElement<{}>) => {
      return {
        __events__: {}
      };
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} value={'testValue'} />, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders a default value with options', () => {
    wrapper = mount(<ComboBox value="1" options={DEFAULT_OPTIONS} />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('1');
  });

  it('Renders a default value with no options', () => {
    wrapper = mount(<ComboBox options={[]} value="1" />);

    const inputElement: InputElementWrapper = wrapper.find('.ms-ComboBox input');
    expect(inputElement.props().value).toEqual('1');
  });
});
