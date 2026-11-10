'use client';

import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { useDialogTrigger } from './useDialogTrigger';
import { renderDialogTrigger } from './renderDialogTrigger';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../../utils/composeComponent';
import type { DialogTriggerProps } from './DialogTrigger.types';

/**
 * `DialogTrigger` clones its single child element and attaches click handling
 * to open or close the parent `Dialog`.
 *
 * When placed outside `DialogSurface`, it defaults to `action="open"`.
 * When placed inside `DialogSurface`, it defaults to `action="close"`.
 */
export const DialogTrigger: ComponentWithoutRef<DialogTriggerProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'DialogTrigger',
  useDialogTrigger,
  renderDialogTrigger,
);

/**
 * Marks the DialogTrigger component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(DialogTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
