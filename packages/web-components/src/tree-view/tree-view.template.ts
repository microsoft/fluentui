// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { children, elements, html } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import type { TreeView } from './tree-view.js';

export const template = html<TreeView>`
  <template
    role="tree"
    tabindex="0"
    @click="${(x, c) => x.handleClick(c.event)}"
    @focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
    @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @selected-change="${(x, c) => x.handleSelectedChange(c.event)}"
    ${children({
      property: 'childTreeItems',
      filter: elements(`${FluentDesignSystem.prefix}-tree-item`),
    })}
  >
    <slot></slot>
  </template>
`;
