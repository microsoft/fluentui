'use client';

import * as React from 'react';

/**
 * Fluent-owned CSP-nonce context (Griffel → Tailwind + CSS Modules migration, D20).
 *
 * Griffel's `useRenderer_unstable().styleElementAttributes` used to be the channel through
 * which a consumer-configured CSP nonce reached the theme-variables `<style>` element that
 * FluentProvider creates. With the Griffel renderer gone, the nonce is now a first-class
 * `nonce` prop on FluentProvider; this context propagates it so NESTED FluentProviders
 * inherit the app-root nonce without repeating the prop — the same "set it once at the root"
 * ergonomics the old `RendererProvider(createDOMRenderer(document, { styleElementAttributes:
 * { nonce } }))` wrapper provided.
 *
 * Internal on purpose: the theme style tag is the only style element Fluent creates at
 * runtime (component CSS ships as static css-modules assets, which a CSP covers via
 * `style-src` source lists, not nonces). Export it only if another Fluent-created style
 * element ever appears.
 */
export const StyleNonceContext = React.createContext<string | undefined>(undefined);

export const StyleNonceProvider = StyleNonceContext.Provider;

/**
 * Returns the inherited CSP nonce for Fluent-created style elements.
 *
 * @internal
 */
export const useStyleNonce = (): string | undefined => React.useContext(StyleNonceContext);
