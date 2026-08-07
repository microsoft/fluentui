// .spec.tsx test file — matches /(spec|test|cy)\.[jt]sx?$/ and MUST be excluded.
// If this file were in the inspection set it would introduce a duplicate
// `ButtonState` key and throw a duplicate-key error.

import * as React from 'react';

/** Duplicate that must never reach the extractor. */
export type ButtonState = { root: { 'data-spec'?: 'true' } };

export const ButtonSpec: React.FC = () => <button />;
