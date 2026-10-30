import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const title2ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Title2' };
export const useTitle2Styles = (): Record<'root', string> => ({ root: styles.title2 });
