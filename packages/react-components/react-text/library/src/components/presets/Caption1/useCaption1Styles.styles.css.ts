import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const caption1ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Caption1' };
export const useCaption1Styles = (): Record<'root', string> => ({ root: styles.caption1 });
