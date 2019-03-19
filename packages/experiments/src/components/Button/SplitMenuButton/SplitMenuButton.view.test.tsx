import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { SplitMenuButton } from './SplitMenuButton';
import { ISplitMenuButtonProps } from './SplitMenuButton.types';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: ISplitMenuButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

describe('SplitMenuButton view', () => {
  it('renders a  SplitMenuButton correctly', () => {
    const component = renderer.create(<SplitMenuButton icon="Add" content="Default  button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled  SplitMenuButton correctly', () => {
    const component = renderer.create(<SplitMenuButton disabled icon="Add" content="Disabled  button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary  SplitMenuButton correctly', () => {
    const component = renderer.create(<SplitMenuButton primary icon="Add" content="Primary  button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary  SplitMenuButton correctly', () => {
    const component = renderer.create(<SplitMenuButton disabled primary icon="Add" content="Disabled primary  button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a  SplitMenuButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitMenuButton primaryActionDisabled icon="Add" content="First action disabled  button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary  SplitMenuButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitMenuButton primaryActionDisabled primary icon="Add" content="First action disabled primary  button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });
});
