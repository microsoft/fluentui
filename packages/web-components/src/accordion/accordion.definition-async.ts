import { type PartialFASTElementDefinition } from '@microsoft/fast-element';
import { tagName } from './accordion.options.js';

export const declarativeDefinition: PartialFASTElementDefinition = {
  name: tagName,
  templateOptions: 'defer-and-hydrate',
} as const;
