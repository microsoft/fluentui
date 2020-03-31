import { PivotBase } from './Pivot.base';
import { IPivotProps } from './Pivot.types';
import * as classes from './Pivot.scss';

export const Pivot = (props: IPivotProps) => PivotBase({ ...props, classes });
