import { CommunicationColors, NeutralColors } from '../FluentColors';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const IconButtonStyles: Partial<IButtonStyles> = {
  root: {
    backgroundColor: NeutralColors.white,
    color: CommunicationColors.primary
  },
  rootHovered: {
    backgroundColor: NeutralColors.gray20,
    color: CommunicationColors.shade10
  },
  rootPressed: {
    backgroundColor: NeutralColors.gray30,
    color: CommunicationColors.shade20
  },
  rootChecked: {
    backgroundColor: NeutralColors.gray30,
    color: CommunicationColors.shade20
  },
  rootDisabled: {
    backgroundColor: NeutralColors.white,
    color: NeutralColors.gray90
  }
};
