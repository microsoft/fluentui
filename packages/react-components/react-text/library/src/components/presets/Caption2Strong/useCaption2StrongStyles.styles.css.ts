import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const caption2StrongClassNames: SlotClassNames<TextSlots> = { root: 'fui-Caption2Strong' };
export const useCaption2StrongStyles = (): Record<'root', string> => ({ root: styles.caption2Strong });
