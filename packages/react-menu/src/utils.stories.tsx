import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button as ReactButton, ButtonProps } from '@fluentui/react-button';
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  return <ReactButton ref={ref} {...props} />;
});

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

export const useMenuListContainerStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});
