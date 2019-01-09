import { fluentBorderRadius } from './styleConstants';
import { CommunicationColors, NeutralColors } from '../FluentColors';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const PrimaryButtonStyles: Partial<IButtonStyles> = {
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
