import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const subtitle1ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Subtitle1' };
export const useSubtitle1Styles = (): Record<'root', string> => ({ root: styles.subtitle1 });
