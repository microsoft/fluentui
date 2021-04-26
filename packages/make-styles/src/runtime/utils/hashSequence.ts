import { SEQUENCE_PREFIX } from '../../constants';
import { hashString } from './hashString';

export function hashSequence(classes: string, dir: 'ltr' | 'rtl') {
  return SEQUENCE_PREFIX + hashString(classes + dir);
}
