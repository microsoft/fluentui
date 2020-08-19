import * as React from 'react';
import { Stylesheet } from '@uifabric/merge-styles';
import { JSONTreeElement } from '../components/types';

/**
 * Use global window state to track of child windows that we're projecting to.
 */
const global = typeof window !== 'undefined' ? window : ({} as any);
const MERGE_STYLES_ATTRIBUTE = 'data-merge-styles';
const ACTIVE_STYLE_ATTRIBUTE = 'data-merge-styles-active';

/**
 * Gets a style element to insert into for the given child window.
 * @param childWindow Target child window.
 */
function getStyleElement(childWindow: Window): HTMLStyleElement {
  const childDocument = childWindow.document;
  let styleElement: HTMLStyleElement = childDocument.head.querySelector(`[${ACTIVE_STYLE_ATTRIBUTE}]`);

  if (!styleElement) {
    styleElement = childDocument.head.appendChild(childDocument.createElement('style'));
    styleElement.setAttribute(MERGE_STYLES_ATTRIBUTE, 'true');
    styleElement.setAttribute(ACTIVE_STYLE_ATTRIBUTE, 'true');

    // We remove the active tag to allow a new one to be created.
    childWindow.requestAnimationFrame(() => styleElement.removeAttribute(ACTIVE_STYLE_ATTRIBUTE));
  }

  return styleElement;
}

/**
 * Projects an individual rule to all child windows.
 * @param rule Rule to inject.
 */
function _projectRule(rule: string): void {
  const childWindows: Window[] = global.__childWindows__;

  if (childWindows && childWindows.length) {
    for (let i = 0; i < childWindows.length; i++) {
      const childWindow = childWindows[i];
      const styleElement = getStyleElement(childWindow);

      const sheet = styleElement.sheet as CSSStyleSheet;
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {}
    }
  }
}

/**
 * Manages tracking the child window and pushing styling changes from the main window to the child.
 * When the child unloads, we will remove references appropriately avoiding memory leaks.
 * @param childWindow Child window to project parent window styling to.
 * @returns A dispose function for manually disposing; will disconnect on child window unload as well.
 */
export function projectStyles(childWindow: Window): () => void {
  console.log('projecting styles', childWindow);

  let childWindows: Window[] = global.__childWindows__;
  // If necessary, initialize child window tracking and listen for styles being registered.
  if (!childWindows) {
    global.__childWindows__ = [];
    childWindows = [];
    Stylesheet.getInstance().setConfig({
      onInsertRule: _projectRule,
    });
  }
  // Add the child window to the tracking list.
  childWindows.push(childWindow);

  const targetStyleElement = getStyleElement(childWindow);
  const targetSheet = targetStyleElement.sheet as CSSStyleSheet;

  // Clone parent window styling into the child.
  window.document.head.querySelectorAll('[data-merge-styles]').forEach((sourceStyleElement: HTMLStyleElement) => {
    const { cssRules: sourceCssRules } = sourceStyleElement.sheet as CSSStyleSheet;

    Array.from(sourceCssRules).forEach(rule => {
      targetSheet.insertRule(rule.cssText, targetSheet.cssRules.length);
    });
  });

  const dispose = () => {
    console.log('disposing projecting styles', childWindow);

    childWindows.splice(childWindows.indexOf(childWindow), 1);
  };

  // When the child window closes, clean up.
  childWindow.addEventListener('unload', dispose);

  return dispose;
}

export const useProjectedStyles = (childWindow: Window, tree: JSONTreeElement) => {
  React.useEffect(() => {
    return childWindow ? projectStyles(childWindow) : undefined;
  }, [childWindow, tree]);
};

export const StyleProvider: React.FunctionComponent<{ childWindow: Window; tree: JSONTreeElement }> = props => {
  console.log('styleprovider', props.childWindow);
  useProjectedStyles(props.childWindow, props.tree);

  return <>{props.children}</>;
};
