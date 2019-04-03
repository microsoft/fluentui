// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export class DocumentUtils {
  private dom?: Document;

  constructor(dom?: Document) {
    this.dom = dom;
  }

  public title(): string {
    return '';
  }
}
