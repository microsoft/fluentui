import { ILinkStyleProps, ILinkStyles } from 'office-ui-fabric-react';

export const LinkStyles = (props: ILinkStyleProps): Partial<ILinkStyles> => {
  const { isDisabled } = props;

  return {
    root: [
      !isDisabled && {
        selectors: {
          '&:active, &:hover, &:active:hover': {
            textDecoration: 'underline'
          }
        }
      }
    ]
  };
};
