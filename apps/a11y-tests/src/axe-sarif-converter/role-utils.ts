// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as axe from 'axe-core';

export class RoleUtils {
  public static isValidRoleIfPresent(node: HTMLElement, options?: any, virtualNode?: any, context?: any): boolean {
    const role = node.getAttribute('role');
    if (role === null) {
      return true;
    }
    return axe.commons.aria.lookupTable.role[role] !== undefined;
  }
}
