import * as React from 'react';

/**
 * issues:
 * 1) do we really need slots prop
 */
interface IBaseButtonProps extends React.AllHTMLAttributes<any> {
  slots?: any;
  slotProps?: any;
}

export const ButtonText: React.FunctionComponent<any> = props => <span {...props}>my button</span>;

export const BaseButton: React.FunctionComponent<IBaseButtonProps> = props => {
  const { slots, children, slotProps, ...rest } = props;
  const { root: Root = 'button', icon: Icon, primaryText: PrimaryText, secondaryText: SecondaryText } = slots || {};
  const { root = {}, icon = {}, primaryText = {}, secondaryText = {} } = slotProps || {};

  const rootClassName = `${root.className || ''}${` ${rest.className}` || ''}`;
  const content = children ? (
    children
  ) : (
    <>
      {Icon && <Icon {...icon} />}
      {PrimaryText && <PrimaryText {...primaryText} />}
      {SecondaryText && <SecondaryText {...secondaryText} />}
    </>
  );

  return (
    <Root {...root} {...rest} className={rootClassName}>
      {content}
    </Root>
  );
};
