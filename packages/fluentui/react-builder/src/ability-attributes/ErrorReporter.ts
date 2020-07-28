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

// Will be replaced with ErrorReporter.css by utils/babel-plugin-error-reporter-css.js.
declare function getErrorReporterCSS(): string;

interface ErrorMetadata {
  id: string;
  element: ValidatedHTMLElement;
  error: AbilityAttributesError;
  visible: boolean;
  shouldRerender?: boolean;
  rendered?: HTMLDivElement;
  locator?: string;
}

interface ValidatedHTMLElement extends HTMLElement {
  __aaError?: ErrorMetadata;
}

let _lastId = 0;
let _errors: { [id: string]: ErrorMetadata } = {};

export class ErrorReporter extends ErrorReporterBase {
  private _window: WindowWithDevEnv;
  private _renderTimer: number | undefined;
  private _isCollapsed = true;

  private _styles: HTMLStyleElement | undefined;
  private _container: HTMLDivElement | undefined;
  private _toggle: HTMLButtonElement | undefined;
  private _expanded: HTMLDivElement | undefined;

  constructor(w: Window) {
    super();

    this._window = w as WindowWithDevEnv;

    if (this._window.__abilityAttributesDev) {
      return (this._window.__abilityAttributesDev.error as any) as ErrorReporter;
    }

    this._initUI(false);
  }

  report(element: HTMLElement, error: AbilityAttributesError): void {
    let meta = (element as ValidatedHTMLElement).__aaError;

    if (meta) {
      if (meta.error.message !== error.message) {
        meta.visible = true;
        meta.shouldRerender = true;
        meta.error.message = error.message;
        delete _errors[meta.id];
        _errors[meta.id] = meta;
      }
    } else {
      meta = (element as ValidatedHTMLElement).__aaError = {
        id: `${++_lastId}`,
        element,
        error,
        visible: true,
      };

      _errors[meta.id] = meta;
    }

    element.setAttribute(ATTRIBUTE_NAME_ERROR_ID, meta.id);
    element.setAttribute(ATTRIBUTE_NAME_ERROR_MESSAGE, meta.error.message);

    if (meta.visible) {
      meta.locator = `\$('[${ATTRIBUTE_NAME_ERROR_ID}="${meta.id}"]')`;

      this._render();

      console.error(`${error.message}, ${meta.locator}`);
    }
  }

  remove(element: HTMLElement): void {
    const meta = (element as ValidatedHTMLElement).__aaError;

    if (meta) {
      delete _errors[meta.id];
      delete (element as ValidatedHTMLElement).__aaError;
      delete meta.element;

      element.removeAttribute(ATTRIBUTE_NAME_ERROR_ID);
      element.removeAttribute(ATTRIBUTE_NAME_ERROR_MESSAGE);

      this._removeErrorView(meta);
      this._render();
    }
  }

  dismiss(element: HTMLElement): void {
    const meta = (element as ValidatedHTMLElement).__aaError;

    if (meta) {
      meta.visible = false;

      this._removeErrorView(meta);
      this._render();
    }
  }

  toggle = (): void => {
    this._isCollapsed = !this._isCollapsed;

    if (this._isCollapsed) {
      Object.keys(_errors).forEach(id => {
        const meta = _errors[id];

        if (meta.visible) {
          this.dismiss(meta.element);
        }
      });
    } else {
      Object.keys(_errors).forEach(id => {
        _errors[id].visible = true;
      });
    }

    this._render();
  };

  private _initUI(append: boolean): void {
    if (!this._styles) {
      this._styles = document.createElement('style');

      this._styles.appendChild(document.createTextNode(getErrorReporterCSS()));

      this._container = document.createElement('div');
      this._expanded = document.createElement('div');
      this._toggle = document.createElement('button');

      this._container.className = 'aa-error-container';
      this._expanded.className = 'aa-error-expanded';
      this._toggle.className = 'aa-error-toggle';

      this._container.style.display = 'none';
      this._expanded.style.display = 'none';

      this._container.appendChild(this._expanded);
      this._container.appendChild(this._toggle);

      this._toggle.addEventListener('click', this.toggle);
    }

    if (append) {
      if (!this._styles.parentNode) {
        this._window.document.head.appendChild(this._styles);
      }

      this._window.document.body.appendChild(this._container!);
    }
  }

  private _render(): void {
    if (this._renderTimer) {
      return;
    }

    this._renderTimer = this._window.setTimeout(() => {
      this._renderTimer = undefined;
      this._reallyRender();
    }, 0);
  }

  private _reallyRender(): void {
    let hasVisible = false;
    const ids = Object.keys(_errors);

    ids.forEach(id => {
      const e = _errors[id];

      if (e.visible) {
        hasVisible = true;
      }
    });

    this._initUI(true);

    if (ids.length > 0 && (this._isCollapsed || !hasVisible)) {
      this._isCollapsed = true;
      this._showCounter(ids.length);
    } else if (!this._isCollapsed && hasVisible) {
      this._showExpanded();
    } else {
      this._hide();
    }
  }

  private _showCounter(count: number): void {
    this._toggle!.innerText = `Show ${count} accessibility error${count !== 1 ? 's' : ''}`;

    this._expanded!.style.display = 'none';
    this._container!.style.display = 'flex';
  }

  private _showExpanded() {
    this._toggle!.innerText = `Collapse errors`;

    Object.keys(_errors).forEach(id => {
      const meta = _errors[id];

      if (meta.visible) {
        if (meta.shouldRerender) {
          delete meta.shouldRerender;
          this._removeErrorView(meta);
        }

        if (!meta.rendered) {
          meta.rendered = this._createErrorView(meta);
        }

        this._expanded!.insertBefore(meta.rendered, this._expanded!.firstChild || null);
      }
    });

    this._expanded!.style.display = null;
    this._container!.style.display = 'flex';
  }

  private _hide() {
    this._container!.style.display = 'none';
  }

  private _createErrorView(meta: ErrorMetadata): HTMLDivElement {
    const div = this._window.document.createElement('div');
    div.className = 'aa-error-message';

    const dismiss = this._window.document.createElement('button');
    dismiss.className = 'aa-error-dismiss';
    dismiss.setAttribute('aria-label', `Dismiss error ${meta.id}`);
    dismiss.innerText = 'X';
    dismiss.addEventListener('click', () => {
      this.dismiss(meta.element);
    });
    div.appendChild(dismiss);

    const text = this._window.document.createElement('span');
    text.className = 'aa-error-text';
    text.innerText = meta.error.message;
    div.appendChild(text);

    if (meta.locator) {
      const locator = this._window.document.createElement('div');
      locator.className = 'aa-error-locator';
      locator.innerText = meta.locator;
      div.appendChild(locator);
    }

    div.addEventListener('dblclick', () => {
      this.dismiss(meta.element);
    });

    return div;
  }

  private _removeErrorView(meta: ErrorMetadata): void {
    if (meta.rendered) {
      if (meta.rendered.parentNode) {
        meta.rendered.parentNode.removeChild(meta.rendered);
      }

      delete meta.rendered;
    }
  }
}
