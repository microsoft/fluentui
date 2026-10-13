'use client';

import type * as React from 'react';

import { useFieldBase } from '@fluentui/react-core-preview';
import type { FieldBaseProps, FieldBaseState } from './Field.types';

/**
 * Base hook for Field component, which manages state related to validation, ARIA attributes,
 * ID generation, and slot structure without design props.
 *
 * The implementation lives in `@fluentui/react-core-preview`.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the root
 */
export const useFieldBase_unstable: (props: FieldBaseProps, ref: React.Ref<HTMLDivElement>) => FieldBaseState =
  useFieldBase;
