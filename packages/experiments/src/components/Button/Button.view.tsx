import * as React from 'react';
import { IButtonComponent, IButtonViewProps } from './Button.types';
import { Text } from '../../Text';
import { HorizontalStack } from '../../Stack';
import { Icon, IIconProps } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';

export const ButtonView: IButtonComponent['view'] = props => {
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
