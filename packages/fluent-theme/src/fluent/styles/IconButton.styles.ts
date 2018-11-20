import { CommunicationColors, NeutralColors } from '../FluentColors';

export const IconButtonStyles = {
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
