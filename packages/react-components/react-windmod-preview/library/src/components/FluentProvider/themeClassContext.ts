'use client';

import * as React from 'react';

/**
 * The theme class governing the current subtree: the nearest FluentProvider's `theme` prop,
 * or — when a nested provider omits it — the value inherited from the provider above.
 * `undefined` means no themed FluentProvider encloses the consumer (the class may still sit
 * on `<html>` or another ancestor, which this context cannot see).
 *
 * Private-internal. ScaleRegion is the consumer: it re-stamps this class on the region
 * element so theme-owned token formulas (the type ramp, shadows) re-substitute there and
 * follow the region's scale.
 */
export const ThemeClassContext: React.Context<string | undefined> = React.createContext<string | undefined>(undefined);
