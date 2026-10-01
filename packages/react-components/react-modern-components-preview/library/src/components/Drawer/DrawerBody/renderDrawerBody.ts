import { renderDrawerBody as renderDrawerBodyBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerBodyState } from './DrawerBody.types';

export const renderDrawerBody = renderDrawerBodyBase as (state: DrawerBodyState) => JSXElement;
