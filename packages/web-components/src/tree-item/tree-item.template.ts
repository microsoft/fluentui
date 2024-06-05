// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { children, elements, html, when } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import type { TreeItem } from './tree-item.js';

// We don't put the icon into the icons/index.ts file because
// this icon is the default chevron icon of the tree-item component,
// it would be contributed to the upstream later.
const chevronIcon = html`
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path
      d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"
    ></path>
  </svg>
`;

export const template = html<TreeItem>`
  <template
    role="treeitem"
    tabindex="-1"
    slot="${x => (x.isNestedItem ? 'item' : void 0)}"
    class="${x => x.calculatedClassName}"
    aria-disabled="${x => x.disabled}"
    aria-selected="${
      // The value of the x could be null due to a bug in the FAST itself...
      x => !!x?.selected
    }"
    aria-expanded="${x => (x?.childTreeItems?.length ? x.expanded : void 0)}"
    @focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
    ${children({
      property: 'childTreeItems',
      filter: elements(`${FluentDesignSystem.prefix}-tree-item`),
    })}
  >
    <div class="positioning-region" part="positioning-region">
      <div class="content-region" part="content-region">
        <span class="selection-region" part="selection-region"></span>
        ${when(
          // Not sure what's going on, sometimes the x will be null, and an error will appear saying
          // cannot read properties of null (read 'childTreeItems'), so we use ?. here
          x => x?.childTreeItems?.length,
          html`
            <span aria-hidden="true" class="chevron-region" part="chevron-region">
              <slot name="chevron">${chevronIcon}</slot>
            </span>
          `,
        )}
        <span class="start-region" part="start-region">
          <slot name="start"></slot>
        </span>
        <div class="middle-region" part="middle-region">
          <slot></slot>
        </div>
        <span class="end-region" part="end-region">
          <slot name="end"></slot>
        </span>
      </div>
      <div class="badging-region" part="badging-region">
        <slot name="badging"></slot>
      </div>
      <div class="toolbar-region" part="toolbar-region">
        <slot name="toolbar"></slot>
      </div>
    </div>
    ${when(
      x => x?.childTreeItems?.length > 0 && x.expanded,
      html<TreeItem>`
        <div role="group" class="items" part="items">
          <slot name="item"></slot>
        </div>
      `,
    )}
  </template>
`;
