import { renderDrawerHeaderTitle as renderDrawerHeaderTitleBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

export const renderDrawerHeaderTitle = renderDrawerHeaderTitleBase as (state: DrawerHeaderTitleState) => JSXElement;
