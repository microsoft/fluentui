import { compose, createClassResolver } from '@fluentui/react-compose';
import { ChevronDownIcon } from '@fluentui/react-icons';
import { ContextualMenu } from 'office-ui-fabric-react';
import { SplitButtonBase } from './SplitButtonBase';
import { SplitButtonProps } from './SplitButton.types';
import * as classes from './SplitButton.scss';

export const SplitButton = compose<'button', SplitButtonProps, SplitButtonProps, {}, {}>(SplitButtonBase, {
  classes: createClassResolver(classes),
  displayName: 'SplitButton',
  slots: {
    menu: ContextualMenu,
    menuIcon: ChevronDownIcon,
  },
});
