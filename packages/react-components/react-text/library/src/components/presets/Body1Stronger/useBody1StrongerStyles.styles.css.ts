import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const body1StrongerClassNames: SlotClassNames<TextSlots> = { root: 'fui-Body1Stronger' };
export const useBody1StrongerStyles = (): Record<'root', string> => ({ root: styles.body1Stronger });
