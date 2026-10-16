import { renderDrawerFooter as renderDrawerFooterBase } from '@fluentui/react-headless-components-preview/drawer';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DrawerFooterState } from './DrawerFooter.types';

export const renderDrawerFooter = renderDrawerFooterBase as (state: DrawerFooterState) => JSXElement;
