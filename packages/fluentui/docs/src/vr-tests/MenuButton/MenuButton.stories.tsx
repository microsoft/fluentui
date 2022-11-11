// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { MenuButton } from '@fluentui/react-northstar';
import MenuButtonOpenExample from '../../examples/components/MenuButton/State/MenuButtonExampleOpen.shorthand';
import MenuButtonOnElement from '../../examples/components/MenuButton/Usage/MenuButtonExampleContextMenu.shorthand';
import MenuButtonExampleOn from '../../examples/components/MenuButton/Usage/MenuButtonExampleOn.shorthand';

export default { component: MenuButton, title: 'MenuButton' } as ComponentMeta<typeof MenuButton>;

export { MenuButtonOpenExample, MenuButtonOnElement, MenuButtonExampleOn };
