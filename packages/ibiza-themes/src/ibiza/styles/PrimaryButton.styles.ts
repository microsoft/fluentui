import { borderRadius } from './styleConstants';
import { CommunicationColors, NeutralColors } from '../IbizaColors';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const PrimaryButtonStyles: Partial<IButtonStyles> = {
  root: {
    borderRadius: borderRadius,
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
