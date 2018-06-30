import { styled } from '../../Utilities';

import { IDetailsRowProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';

import { DetailsRowBase } from './DetailsRow.base';
import { getStyles } from './DetailsRow.styles';

export const Slider = styled<IDetailsRowProps, IDetailsRowStyleProps, IDetailsRowStyles>(DetailsRowBase, getStyles);
