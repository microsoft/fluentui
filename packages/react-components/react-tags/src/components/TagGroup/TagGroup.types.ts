import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagSize } from '../Tag/Tag.types';
import { TagGroupContextValue } from '../../contexts/TagGroupContext';

export type TagGroupContextValues = {
  tagGroup: TagGroupContextValue;
};

export type TagGroupSlots = {
  root: Slot<'div'>;
};

/**
 * TagGroup Props
 */
export type TagGroupProps = ComponentProps<TagGroupSlots> & {
  size?: TagSize;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState = ComponentState<TagGroupSlots> & Required<Pick<TagGroupProps, 'size'>>;
