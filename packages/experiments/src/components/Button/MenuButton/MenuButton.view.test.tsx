import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Stack, Text } from 'office-ui-fabric-react';
import { MenuButton } from './MenuButton';
import { IMenuButtonProps } from './MenuButton.types';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IMenuButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

describe('MenuButton view', () => {
  it('renders a MenuButton correctly', () => {
    const component = renderer.create(<MenuButton content="Menu button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary MenuButton correctly', () => {
    const component = renderer.create(<MenuButton primary content="Menu primary button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled MenuButton correctly', () => {
    const component = renderer.create(<MenuButton disabled content="Menu disabled button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a multiline MenuButton correctly', () => {
    const component = renderer.create(
      <MenuButton icon="Share" menu={buttonMenu}>
        <Stack padding="8px 0" as="span" horizontalAlign="start">
          <Text>I am a compound multiline button.</Text>
          <Text variant="small">I can have a caption.</Text>
        </Stack>
      </MenuButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });
});
