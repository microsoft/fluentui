import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const caption1StrongClassNames: SlotClassNames<TextSlots> = { root: 'fui-Caption1Strong' };
export const useCaption1StrongStyles = (): Record<'root', string> => ({ root: styles.caption1Strong });
