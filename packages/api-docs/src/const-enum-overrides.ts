/**
 * ☝️ NOTE:
 * Types in this file provide const enums replacement that will compile with isolatedModules
 */

import type { ApiItemKind as _ApiItemKind } from '@microsoft/api-extractor-model';

import type { DocNodeKind as _DocNodeKind } from '@microsoft/tsdoc';

export enum ApiItemKind {
  CallSignature = 'CallSignature',
  Class = 'Class',
  Constructor = 'Constructor',
  ConstructSignature = 'ConstructSignature',
  EntryPoint = 'EntryPoint',
  Enum = 'Enum',
  EnumMember = 'EnumMember',
  Function = 'Function',
  IndexSignature = 'IndexSignature',
  Interface = 'Interface',
  Method = 'Method',
  MethodSignature = 'MethodSignature',
  Model = 'Model',
  Namespace = 'Namespace',
  Package = 'Package',
  Property = 'Property',
  PropertySignature = 'PropertySignature',
  TypeAlias = 'TypeAlias',
  Variable = 'Variable',
  None = 'None',
}

export enum DocNodeKind {
  Block = 'Block',
  BlockTag = 'BlockTag',
  Excerpt = 'Excerpt',
  FencedCode = 'FencedCode',
  CodeSpan = 'CodeSpan',
  Comment = 'Comment',
  DeclarationReference = 'DeclarationReference',
  ErrorText = 'ErrorText',
  EscapedText = 'EscapedText',
  HtmlAttribute = 'HtmlAttribute',
  HtmlEndTag = 'HtmlEndTag',
  HtmlStartTag = 'HtmlStartTag',
  InheritDocTag = 'InheritDocTag',
  InlineTag = 'InlineTag',
  LinkTag = 'LinkTag',
  MemberIdentifier = 'MemberIdentifier',
  MemberReference = 'MemberReference',
  MemberSelector = 'MemberSelector',
  MemberSymbol = 'MemberSymbol',
  Paragraph = 'Paragraph',
  ParamBlock = 'ParamBlock',
  ParamCollection = 'ParamCollection',
  PlainText = 'PlainText',
  Section = 'Section',
  SoftBreak = 'SoftBreak',
}

// Following function is used to keep 3rd party types in sync with our custom ones. test on "type level"
// If anything will go wrong this will throw TSC error
//
// Why do we need this?
// To be able to use `isolateModules` we cannot use nor consume const enums.
// @ts-expect-error -  this function is only for type compat test

function _testEnumsCompatibility() {
  testApiItemKind();
  testDocNodeKind();

  function testDocNodeKind() {
    // @ts-expect-error - _DocNodeKind is const enum - cannot be used with isolateModules - this does the trick
    type Keys = keyof typeof _DocNodeKind;
    type Keys2 = keyof typeof DocNodeKind;

    let test = {} as Keys;
    let test2 = {} as Keys2;

    test = test2;
    test2 = test;

    // eslint-disable-next-line no-console
    console.log(test, test2);
  }

  function testApiItemKind() {
    // @ts-expect-error - _ApiItemKind is const enum - cannot be used with isolateModules - this does the trick
    type Keys = keyof typeof _ApiItemKind;
    type Keys2 = keyof typeof ApiItemKind;

    let test = {} as Keys;
    let test2 = {} as Keys2;

    test = test2;
    test2 = test;

    // eslint-disable-next-line no-console
    console.log(test, test2);
  }
}
