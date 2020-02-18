import { PrimitiveBase } from './Primitive.base';
import styles from './Box.styles';
import { compose } from '../../compose';

export const Box = compose(PrimitiveBase, { name: 'Box', styles });
