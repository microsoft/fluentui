import * as React from 'react';
import { styled } from '../../../Utilities';
import { INewHeaderProps, INewHeaderStyleProps, INewHeaderStyles } from './NewHeader.types';
import { NewHeaderBase } from './NewHeader.base';
import { getStyles } from './NewHeader.styles';

/**
 * NewHeader description
 */
export const NewHeader: React.StatelessComponent<INewHeaderProps> = styled<INewHeaderProps, INewHeaderStyleProps, INewHeaderStyles>(
  NewHeaderBase,
  getStyles,
  undefined,
  {
    scope: 'NewHeader'
  }
);
