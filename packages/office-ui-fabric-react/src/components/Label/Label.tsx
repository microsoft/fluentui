import * as React from 'react';
import { styled, css } from '../../Utilities';
import { LabelBase } from './Label.base';
import { ILabelProps, ILabelStyleProps, ILabelStyles } from './Label.types';
import * as classes from './Label.scss';

const getStaticStyles = (props: ILabelStyleProps): ILabelStyles => {
  const { className, disabled, required } = props;
  return {
    root: css(className, classes.root, disabled && classes.rootDisabled, required && classes.rootRequired),
  };
};

export const Label: React.FunctionComponent<ILabelProps> = styled<ILabelProps, ILabelStyleProps, ILabelStyles>(
  LabelBase,
  getStaticStyles,
  undefined,
  {
    scope: 'Label',
  },
);
