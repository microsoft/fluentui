import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Stack, Text } from 'office-ui-fabric-react';
import { MenuButton } from './MenuButton';
import { IMenuButtonProps } from './MenuButton.types';

const menuProps: IMenuButtonProps['menu'] = {
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

describe('MenuButton', () => {
  it('renders a MenuButton correctly', () => {
    const component = renderer.create(<MenuButton content="Menu button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary MenuButton correctly', () => {
    const component = renderer.create(<MenuButton primary content="Menu primary button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled MenuButton correctly', () => {
    const component = renderer.create(<MenuButton disabled content="Menu disabled button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a multiline MenuButton correctly', () => {
    const component = renderer.create(
      <MenuButton icon="Share" menu={menuProps}>
        <Stack as="span" horizontalAlign="start" tokens={{ padding: '8px 0' }}>
          <Text>I am a compound multiline button.</Text>
          <Text variant="small">I can have a caption.</Text>
        </Stack>
      </MenuButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('focuses correctly when focus is triggered via IMenuButton interface', () => {
    const wrapper = mount(
      <div>
        <MenuButton content="Menu Button 1" />
        <MenuButton content="Menu Button 2" />
        <MenuButton content="Menu Button 3" />
      </div>
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('button.ms-MenuButton') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    buttons[0].focus();
    expect(document.activeElement!.children[0].children[0].textContent).toEqual('Menu Button 1');

    buttons[1].focus();
    expect(document.activeElement!.children[0].children[0].textContent).toEqual('Menu Button 2');

    buttons[2].focus();
    expect(document.activeElement!.children[0].children[0].textContent).toEqual('Menu Button 3');
  });
});
