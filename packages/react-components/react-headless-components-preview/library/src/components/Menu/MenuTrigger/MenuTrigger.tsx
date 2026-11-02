'use client';

import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { useMenuTrigger } from './useMenuTrigger';
import { renderMenuTrigger } from './renderMenuTrigger';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';

/**
 * Headless MenuTrigger component.
 *
 * Clones its single child and applies the menu trigger props (ARIA, event
 * handlers, ref merging) needed to drive the parent Menu's open state.
 */
export const MenuTrigger = /*#__PURE__*/ composeComponentWithoutRef('MenuTrigger', useMenuTrigger, renderMenuTrigger);

/**
 * Marks the MenuTrigger component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(MenuTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
