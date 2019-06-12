import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { SplitButton } from './SplitButton';
import { ISplitButtonProps } from './SplitButton.types';

const menuProps: ISplitButtonProps['menu'] = {
  items: [
    {
      key: 'a',
      name: 'Item a'
    },
    {
      key: 'b',
      name: 'Item b'
    }
  ]
};

describe('SplitButton', () => {
  it('renders a SplitButton correctly', () => {
    const component = renderer.create(<SplitButton icon="Add" content="Default button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled icon="Add" content="Disabled button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton primary icon="Add" content="Primary button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled primary icon="Add" content="Disabled primary button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled icon="Add" content="First action disabled button" menu={menuProps} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled primary icon="Add" content="First action disabled primary button" menu={menuProps} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });
});
