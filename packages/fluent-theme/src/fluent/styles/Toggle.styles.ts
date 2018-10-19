import { IToggleProps } from '../../../../office-ui-fabric-react/lib';
import { CommunicationColors, NeutralColors } from '../FluentColors';

export const ToggleStyles = (props: IToggleProps) => {
  const { disabled, checked } = props;
  return {
    pill: [
      {
        width: '40px',
        height: '20px',
        borderRadius: '10px',
        padding: '0 4px'
      },
      !disabled && [
        checked && {
          selectors: {
            ':hover': [
              {
                backgroundColor: CommunicationColors.shade20
              }
            ]
          }
        },
        !checked && {
          selectors: {
            ':hover .ms-Toggle-thumb': {
              backgroundColor: NeutralColors.gray160
            }
          }
        }
      ]
    ],
    thumb: [
      {
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        borderColor: 'transparent'
      },
      !disabled &&
        !checked && {
          backgroundColor: NeutralColors.gray130
        }
    ]
  };
};
