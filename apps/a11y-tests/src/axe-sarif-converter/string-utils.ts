// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export class StringUtils {
  public static isNotEmpty(str: string): boolean {
    str = str ? str.trim() : '';

    return str.length > 0;
  }
}
