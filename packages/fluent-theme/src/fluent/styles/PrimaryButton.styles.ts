import { fluentBorderRadius } from './styleConstants';
import { CommunicationColors, NeutralColors } from '../FluentColors';

export const PrimaryButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius,
    border: 'none',
    backgroundColor: CommunicationColors.primary,
    color: NeutralColors.white
  },
  rootHovered: {
    backgroundColor: CommunicationColors.shade10
  },
  rootPressed: {
    backgroundColor: CommunicationColors.shade20
  },
  rootChecked: {
    backgroundColor: CommunicationColors.shade20
  }
};
