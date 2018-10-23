import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { fluentBorderRadius } from './styleConstants';
import { NeutralColors } from '../FluentColors';

export const DefaultButtonStyles = (props: IButtonProps) => {
  const { primary, theme } = props;
  const { palette, semanticColors } = theme!;

  return {
    root: {
      borderRadius: fluentBorderRadius,
      backgroundColor: primary ? semanticColors.primaryButtonBackground : palette.white,
      border: primary ? '' : `1px solid ${NeutralColors.gray110}`,
      color: primary ? semanticColors.buttonText : palette.white
    },
    rootHovered: {
      backgroundColor: primary ? palette.themeDarkAlt : NeutralColors.gray20,
      border: primary ? '' : `1px solid ${NeutralColors.gray110}`
    }
  };
};
