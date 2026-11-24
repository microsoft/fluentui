import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const body1ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Body1' };
export const useBody1Styles = (): Record<'root', string> => ({ root: styles.body1 });
