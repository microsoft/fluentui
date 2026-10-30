import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const caption2ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Caption2' };
export const useCaption2Styles = (): Record<'root', string> => ({ root: styles.caption2 });
