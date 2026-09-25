import { renderDrawer as renderDrawerBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerState } from './Drawer.types';

export const renderDrawer = renderDrawerBase as (state: DrawerState) => JSXElement;
