import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { SplitButton } from './SplitButton';
import { ISplitButtonProps } from './SplitButton.types';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: ISplitButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

describe('SplitButton view', () => {
  it('renders a SplitButton correctly', () => {
    const component = renderer.create(<SplitButton icon="Add" content="Default button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled icon="Add" content="Disabled button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton primary icon="Add" content="Primary button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled primary icon="Add" content="Disabled primary button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled icon="Add" content="First action disabled button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled primary icon="Add" content="First action disabled primary button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });
});
