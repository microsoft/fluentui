import * as React from 'react';
import { NavItem, NavItemProps } from '@fluentui/react-nav-preview';

export const Default = (props: Partial<NavItemProps>) => <NavItem value={'someValue'} {...props} />;
