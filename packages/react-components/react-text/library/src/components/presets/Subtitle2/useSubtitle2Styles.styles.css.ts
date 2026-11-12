import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const subtitle2ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Subtitle2' };
export const useSubtitle2Styles = (): Record<'root', string> => ({ root: styles.subtitle2 });
