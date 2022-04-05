import * as React from 'react';
import { styled } from '../../Utilities';
import { ModalBase } from './Modal.base';
import { getStyles } from './Modal.styles';
import type { IModalProps, IModalStyleProps, IModalStyles } from './Modal.types';

export const Modal: React.FunctionComponent<IModalProps> = styled<IModalProps, IModalStyleProps, IModalStyles>(
  ModalBase,
  getStyles,
  undefined,
  {
    scope: 'Modal',
    fields: ['theme', 'styles', 'enableAriaHiddenSiblings'],
  },
);
Modal.displayName = 'Modal';
