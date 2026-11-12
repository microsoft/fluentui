import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const title1ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Title1' };
export const useTitle1Styles = (): Record<'root', string> => ({ root: styles.title1 });
