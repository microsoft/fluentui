// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { css } from '@microsoft/fast-element';
import { spacingHorizontalNone } from '../theme/design-tokens.js';

export const styles = css`
  :host {
    /* Set the font size of the tree view to 0 so we can calculate the indentation based on it */
    font-size: 0;
    outline: none;
  }
  /* The direct child treeitems of the tree-view component should not get the padding */
  ::slotted([role='treeitem']) {
    padding-inline-start: ${spacingHorizontalNone};
  }
`;
