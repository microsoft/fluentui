import { _isSSR } from './setSSR';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';

/**
 * Helper to get the document object. Note that in popup window cases, document
 * might be the wrong document, which is why we look at ownerDocument for the
 * truth. Also note that the SSR flag is used to test ssr scenarios even if
 * document is defined (from JSDOM for example.)
 *
 * @public
 */
export function getDocument(rootElement?: HTMLElement | Component | null): Document | undefined {
  if (_isSSR || typeof document === 'undefined') {
    return undefined;
  } else {
    if (rootElement && !(rootElement as Element).ownerDocument) {
      // tslint:disable-next-line:no-any
      rootElement = findDOMNode(rootElement) as any;
    }
    const el = rootElement as Element;

    return el && el.ownerDocument ? el.ownerDocument : document;
  }
}
