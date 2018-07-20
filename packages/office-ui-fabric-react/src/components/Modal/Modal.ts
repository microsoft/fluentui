import { styled } from '../../Utilities';
import { IModalProps, IModalStyleProps, IModalStyles } from './Modal.types';
import { ModalBase } from './Modal.base';
import { getStyles } from './Modal.styles';

export const Modal = styled<IModalProps, IModalStyleProps, IModalStyles>(ModalBase, getStyles, undefined, {
  scope: 'Modal'
});
