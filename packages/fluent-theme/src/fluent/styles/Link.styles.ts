import { ILinkStyleProps } from 'office-ui-fabric-react/lib/Link';

export const LinkStyles = (props: ILinkStyleProps) => {
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
