// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { getAttributes } from './axe-utils';
import { DictionaryStringTo } from './dictionary-types';

const htmlCues = ['readonly', 'disabled', 'required'];
const ariaCues = ['aria-readonly', 'aria-disabled', 'aria-required'];

export function generateHTMLCuesDictionary(node: HTMLElement): DictionaryStringTo<string> {
  return getAttributes(node, htmlCues);
}

export function generateARIACuesDictionary(node: HTMLElement): DictionaryStringTo<string> {
  return getAttributes(node, ariaCues);
}
