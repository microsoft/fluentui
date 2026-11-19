import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const displayClassNames: SlotClassNames<TextSlots> = { root: 'fui-Display' };
export const useDisplayStyles = (): Record<'root', string> => ({ root: styles.display });
