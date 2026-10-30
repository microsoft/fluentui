import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const body1StrongClassNames: SlotClassNames<TextSlots> = { root: 'fui-Body1Strong' };
export const useBody1StrongStyles = (): Record<'root', string> => ({ root: styles.body1Strong });
