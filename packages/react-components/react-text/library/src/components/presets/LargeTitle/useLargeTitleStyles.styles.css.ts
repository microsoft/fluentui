import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const largeTitleClassNames: SlotClassNames<TextSlots> = { root: 'fui-LargeTitle' };
export const useLargeTitleStyles = (): Record<'root', string> => ({ root: styles.largeTitle });
