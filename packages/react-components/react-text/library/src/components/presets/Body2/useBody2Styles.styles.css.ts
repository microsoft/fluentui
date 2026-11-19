import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const body2ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Body2' };
export const useBody2Styles = (): Record<'root', string> => ({ root: styles.body2 });
