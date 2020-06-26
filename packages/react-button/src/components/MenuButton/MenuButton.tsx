import { compose, createClassResolver } from '@fluentui/react-compose';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { ContextualMenu } from 'office-ui-fabric-react';
import { MenuButtonBase } from './MenuButtonBase';
import { MenuButtonProps } from './MenuButton.types';
import * as classes from './MenuButton.scss';

export const MenuButton = compose<'button', MenuButtonProps, MenuButtonProps, {}, {}>(MenuButtonBase, {
  classes: createClassResolver(classes),
  displayName: 'MenuButton',
  slots: {
    menu: ContextualMenu,
    menuIcon: ChevronDownIcon,
  },
});
