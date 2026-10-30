import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import styles from '../TextPresets.module.css';

export const title3ClassNames: SlotClassNames<TextSlots> = { root: 'fui-Title3' };
export const useTitle3Styles = (): Record<'root', string> => ({ root: styles.title3 });
