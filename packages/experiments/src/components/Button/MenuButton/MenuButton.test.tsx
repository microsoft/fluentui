import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Stack, Text } from 'office-ui-fabric-react';
import { MenuButton } from './MenuButton';
import { IMenuButton, IMenuButtonProps } from './MenuButton.types';

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
    const button1 = React.createRef<IMenuButton>();
    const button2 = React.createRef<IMenuButton>();
    const button3 = React.createRef<IMenuButton>();

    const wrapper = mount(
      <div>
        <MenuButton content="Button 1" componentRef={button1} />
        <MenuButton content="Button 2" componentRef={button2} />
        <MenuButton content="Button 3" componentRef={button3} />
      </div>
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('button.ms-MenuButton') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    button1.current!.focus();
    expect(document.activeElement!).toBe(buttons[0]);

    button2.current!.focus();
    expect(document.activeElement!).toBe(buttons[1]);

    button3.current!.focus();
    expect(document.activeElement!).toBe(buttons[2]);
  });
});
