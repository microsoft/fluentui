import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const subtitle2StrongerClassNames: SlotClassNames<TextSlots> = { root: 'fui-Subtitle2Stronger' };
export const useSubtitle2StrongerStyles = (): Record<'root', string> => ({ root: styles.subtitle2Stronger });
