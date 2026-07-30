import * as React from 'react';
import { DocsContainer, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

import { isDocsEnabled } from './utils';

interface FluentDocsContainerProps {
  context: DocsContextProps;
  children: React.ReactNode;
}

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  if (isDocsEnabled(context)) {
    return (
      <>
        {/** TODO add table of contents */}
        <FluentProvider className="sb-unstyled" style={{ backgroundColor: 'transparent' }} theme={webLightTheme}>
          <DocsContainer context={context}>{children}</DocsContainer>
        </FluentProvider>
      </>
    );
  }

  /**
   * Fall back to Storybook's default DocsContainer — but keep the `sb-unstyled` wrapper.
   *
   * Storybook's docs view injects an UNLAYERED emotion reset over the docs container:
   *
   *   .css-… :where(div:not(.sb-anchor, .sb-unstyled, .sb-unstyled div)) { margin: 0 }
   *
   * (plus the same rule for `span`). It carves out `.sb-unstyled` and everything under it, so an
   * ancestor carrying that class is the sanctioned way to opt a subtree out. Without it, every
   * margin declared by a converted package's `*.module.css` is zeroed in docs mode: the module
   * sheets sit in `@layer fui.components.*` (layered always loses to unlayered), and dropping the
   * layer does not help either, because `style-loader` injects them at import time — i.e. BEFORE
   * emotion's — so they also lose on document order at equal specificity. Griffel only won this
   * by appending an unlayered rule to `<head>` at render time.
   *
   * The `isDocsEnabled` branch above has always wrapped in `.sb-unstyled`, and so does
   * `FluentDocsPage`, so the four docsite-style apps and every autodocs page were already carved
   * out. What was not: MDX docs pages in the ~76 per-package storybooks, which render their
   * content straight into this fallback. Measured there (theme-designer `TokenList.module.css`,
   * whose header records the full evidence trail): `.menu` margin-top 4px → 0px, Persona's
   * `.spacing-after` margin-inline-end 8px → 0px. Applying the class here makes the fallback
   * match the enabled path instead of diverging from it.
   *
   * Not fixable from `react-storybook-addon/src/styles.css`: CSS cannot add the class the reset
   * carves out, and a specificity bump inside the modules is not a sanctioned authoring pattern
   * (`TokenList.module.css` refused it, correctly).
   */
  return (
    <div className="sb-unstyled">
      <DocsContainer context={context}>{children}</DocsContainer>
    </div>
  );
};
