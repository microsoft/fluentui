import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = { root: 'fui-Caption1Stronger' };
export const useCaption1StrongerStyles = (): Record<'root', string> => ({ root: styles.caption1Stronger });
