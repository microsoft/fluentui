import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { TagButtonProps, TagButtonState } from './TagButton.types';
import { useTag_unstable } from '../Tag/index';

/**
 * Create the state required to render TagButton.
 *
 * The returned state can be modified with hooks such as useTagButtonStyles_unstable,
 * before being passed to renderTagButton_unstable.
 *
 * @param props - props from this instance of TagButton
 * @param ref - reference to root HTMLElement of TagButton
 */
export const useTagButton_unstable = (props: TagButtonProps, ref: React.Ref<HTMLElement>): TagButtonState => {
  const content = resolveShorthand(props.content, { required: true, defaultProps: { tabIndex: 0 } });
  return useTag_unstable({ ...props, content }, ref);
};
