// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="./axe-extension.ts" />
import * as axe from 'axe-core';

import { DictionaryStringTo } from './dictionary-types';

export type ImageCodedAs = 'Decorative' | 'Meaningful';

export function getMatchesFromRule(ruleId: string): (node: any, virtualNode: any) => boolean {
  // @ts-ignore
  return axe._audit.defaultConfig.rules.filter(rule => rule.id === ruleId)[0].matches;
}

export function getEvaluateFromCheck(checkId: string): (node: any, options: any, virtualNode: any, context: any) => boolean {
  return axe._audit.defaultConfig.checks.filter(check => check.id === checkId)[0].evaluate;
}

export function getAccessibleText(node: HTMLElement, isLabelledByContext: boolean): string {
  return axe.commons.text.accessibleText(node, isLabelledByContext);
}

export function getAccessibleDescription(node: HTMLElement): string {
  return axe.commons.dom
    .idrefs(node, 'aria-describedby')
    .filter(ref => ref !== null)
    .map(ref => axe.commons.text.accessibleText(ref))
    .join(' ');
}

export function getPropertyValuesMatching(node: HTMLElement, regex: RegExp): DictionaryStringTo<string> {
  const dictionary: DictionaryStringTo<string> = {};
  if (node.hasAttributes()) {
    const attrs = node.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const name = attrs[i].name;
      if (regex.test(name)) {
        // @ts-ignore
        dictionary[name] = node.getAttribute(name);
      }
    }
  }
  return dictionary;
}

export function getAttributes(node: HTMLElement, attributes: string[]): DictionaryStringTo<string> {
  const retDict: DictionaryStringTo<string> = {};
  attributes
    .filter(atributeName => node.hasAttribute(atributeName))
    .forEach((attributeName: string) => {
      const attributeValue = node.getAttribute(attributeName);

      // @ts-ignore
      retDict[attributeName] = attributeValue || null;
    });

  return retDict;
}

export function hasCustomWidgetMarkup(node: HTMLElement): boolean {
  const tabIndex = node.getAttribute('tabindex');
  const ariaValues = getPropertyValuesMatching(node, /^aria-/);
  const hasRole = node.hasAttribute('role');
  // empty and invalid roles can be filtered out using 'valid-role-if-present' check if needed
  return tabIndex === '-1' || Object.keys(ariaValues).length > 0 || hasRole;
}

export function getImageCodedAs(node: HTMLElement): ImageCodedAs {
  const role = node.getAttribute('role');
  const alt = node.getAttribute('alt');
  if (role === 'none' || role === 'presentation' || alt === '') {
    return 'Decorative';
  }

  // @ts-ignore
  if (getAccessibleText(node, false) !== '' || isWhiteSpace(alt)) {
    return 'Meaningful';
  }

  // @ts-ignore
  return null;
}

export function isWhiteSpace(text: string): boolean {
  // @ts-ignore
  return text && text.length > 0 && text.trim() === '';
}

export function hasBackgoundImage(node: HTMLElement): boolean {
  const computedBackgroundImage: string = window.getComputedStyle(node).getPropertyValue('background-image');
  return computedBackgroundImage !== 'none';
}

export function getImageType(node: HTMLElement): string {
  let imageType: string;
  if (node.tagName.toLowerCase() === 'img') {
    imageType = '<img>';
  } else if (node.tagName.toLowerCase() === 'i') {
    imageType = 'icon fonts (empty <i> elements)';
  } else if (node.getAttribute('role') === 'img') {
    imageType = 'Role="img"';
  } else if (hasBackgoundImage(node)) {
    imageType = 'CSS background-image';
  }

  // @ts-ignore
  return imageType;
}
