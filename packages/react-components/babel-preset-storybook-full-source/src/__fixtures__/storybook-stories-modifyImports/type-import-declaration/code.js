import { Button } from '@fluentui/react-button';
import type { ButtonProps } from '@fluentui/react-button';
import { Menu, type MenuProps } from '@fluentui/react-menu';

export const config: ButtonProps & MenuProps = { component: Button, menu: Menu };
