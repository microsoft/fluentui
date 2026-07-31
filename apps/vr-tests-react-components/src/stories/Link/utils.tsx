import * as React from 'react';
import { BackgroundAppearanceProvider } from '@fluentui/react-shared-contexts';
import { Steps } from 'storywright';

import styles from './utils.module.css';

export const InvertedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.invertedBackground}>
      <BackgroundAppearanceProvider value="inverted">{children}</BackgroundAppearanceProvider>
    </div>
  );
};

export const BrandBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.brandBackground}>
      <BackgroundAppearanceProvider value="brand">{children}</BackgroundAppearanceProvider>
    </div>
  );
};

/**
 * Link's public identity class is now its Tailwind named-group marker, `group/fui-link` —
 * the `fui-Link` BEM static is no longer rendered (DECISIONS.md D16.1 / D16.5).
 *
 * Two spellings are needed, and the difference is not cosmetic:
 *
 * - `LINK_SELECTOR` escapes the `/`, because inside a SELECTOR an unescaped `/` terminates
 *   the class name. This is what `fuiSelector()` produces for the same token.
 * - `LINK_CLASS_TOKEN` is the raw token, for the token-taking DOM APIs
 *   (`getElementsByClassName`, `classList.contains`), which must NOT be given the escaped
 *   form. Those are used inside `executeScript`, where the argument is a JS SOURCE string
 *   evaluated in the browser: an escaped selector would have to survive two rounds of string
 *   parsing, and the token form removes that hazard entirely.
 */
const LINK_SELECTOR = '.group\\/fui-link';
const LINK_CLASS_TOKEN = 'group/fui-link';

export const steps = new Steps()
  .snapshot('default')
  .hover(LINK_SELECTOR)
  .snapshot('hover')
  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.getElementsByClassName('${LINK_CLASS_TOKEN}')[0].setAttribute('data-fui-focus-visible', '')`)
  .focus(LINK_SELECTOR)
  .snapshot('focused')
  .executeScript(`document.getElementsByClassName('${LINK_CLASS_TOKEN}')[0].removeAttribute('data-fui-focus-visible')`)
  .mouseDown(LINK_SELECTOR)
  .snapshot('pressed')
  .mouseUp(LINK_SELECTOR)
  .end();

// Disabled stories use steps without focus so they do not error out on the focused step.
export const disabledUnfocusableSteps = new Steps()
  .snapshot('default')
  .hover(LINK_SELECTOR)
  .snapshot('hover')
  .mouseDown(LINK_SELECTOR)
  .snapshot('pressed')
  .mouseUp(LINK_SELECTOR)
  .end();
