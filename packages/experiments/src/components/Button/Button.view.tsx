import * as React from 'react';
import { IButtonProps, IButtonViewProps, IButtonStyles } from './Button.types';
import { IViewComponentProps } from '../../Foundation';
import { Text } from '../../Text';
import { HorizontalStack } from '../../Stack';
import { Icon, IIconProps } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';

/**
 * @deprecated
 * This is a dummy export used to avoid the "Exported variable X has or is using name Y from eternal module but cannot be named"
 * error. Importing Y is enough to eliminate the export error but generates an unused import error. This dummy export eliminates
 * the unused error. This export and its associated imports should be removed once we upgrade past TS 2.8.
 */
// tslint:disable-next-line:no-any
export type __TYPESCRIPT_2_8_WORKAROUND_ = IButtonProps;

export const ButtonView = (props: IViewComponentProps<IButtonViewProps, IButtonStyles>): JSX.Element => {
  const {
    classNames,
    as: RootType = _deriveRootType(props),
    menu: Menu,
    children,
    text,
    icon: IconProp,
    expanded,
    disabled,
    onMenuDismiss,
    menuTarget,
    ...rest
  } = props;

  const buttonProps = getNativeProps(rest, buttonProperties);

  return (
    <RootType
      type="button" // stack doesn't take in native button props
      role="button"
      {...buttonProps}
      aria-disabled={disabled}
      className={classNames.root}
    >
      <HorizontalStack className={classNames.stack} as="span" gap={8} verticalAlign="center" horizontalAlign="center">
        {IconProp && typeof IconProp === 'string' && <Icon className={classNames.icon} iconName={IconProp} />}
        {IconProp &&
          typeof IconProp === 'object' &&
          (React.isValidElement(IconProp) ? (
            IconProp
          ) : (
            <Icon
              className={classNames.icon}
              {
                // tslint:disable-next-line:no-any
                ...IconProp as IIconProps
              }
            />
          ))}
        {text && <Text className={classNames.text}>{text}</Text>}
        {children}
        {Menu && (
          <HorizontalStack.Item>
            <Icon className={classNames.menuIcon} iconName="ChevronDown" />
          </HorizontalStack.Item>
        )}
      </HorizontalStack>
      {expanded && Menu && <Menu target={menuTarget} onDismiss={onMenuDismiss} />}
    </RootType>
  );
};

function _deriveRootType(props: IButtonViewProps): React.ReactType {
  return !!props.href ? 'a' : 'button';
}
