/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/* eslint-disable */

import {
  AbilityAttributesError,
  ATTRIBUTE_NAME_ERROR_ID,
  ATTRIBUTE_NAME_ERROR_MESSAGE,
  ErrorReporter as ErrorReporterBase,
  WindowWithDevEnv,
} from './DevEnvTypes';

interface ErrorMetadata {
  id: string;
  element: ValidatedHTMLElement;
  error: AbilityAttributesError;
  locator?: string;
}

interface ValidatedHTMLElement extends HTMLElement {
  __aaError?: ErrorMetadata;
}

let _lastId = 0;
let _errors: { [id: string]: ErrorMetadata } = {};

export class ErrorReporter extends ErrorReporterBase {
  private _window: WindowWithDevEnv;

  constructor(w: Window) {
    super();

    this._window = w as WindowWithDevEnv;

    if (this._window.__abilityAttributesDev) {
      return (this._window.__abilityAttributesDev.error as any) as ErrorReporter;
    }
  }

  report(element: HTMLElement, error: AbilityAttributesError): void {
    let meta = (element as ValidatedHTMLElement).__aaError;

    if (meta) {
      if (meta.error.message !== error.message) {
        meta.error.message = error.message;
        delete _errors[meta.id];
        _errors[meta.id] = meta;
      }
    } else {
      meta = (element as ValidatedHTMLElement).__aaError = {
        id: `${++_lastId}`,
        element,
        error,
      };

      _errors[meta.id] = meta;
    }

    element.setAttribute(ATTRIBUTE_NAME_ERROR_ID, meta.id);
    element.setAttribute(ATTRIBUTE_NAME_ERROR_MESSAGE, meta.error.message);
  }

  remove(element: HTMLElement): void {
    const meta = (element as ValidatedHTMLElement).__aaError;

    if (meta) {
      delete _errors[meta.id];
      delete (element as ValidatedHTMLElement).__aaError;
      delete meta.element;

      element.removeAttribute(ATTRIBUTE_NAME_ERROR_ID);
      element.removeAttribute(ATTRIBUTE_NAME_ERROR_MESSAGE);
    }
  }
}
