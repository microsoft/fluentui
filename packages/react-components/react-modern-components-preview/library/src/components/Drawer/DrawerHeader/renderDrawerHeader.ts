import { renderDrawerHeader as renderDrawerHeaderBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerHeaderState } from './DrawerHeader.types';

export const renderDrawerHeader = renderDrawerHeaderBase as (state: DrawerHeaderState) => JSXElement;
