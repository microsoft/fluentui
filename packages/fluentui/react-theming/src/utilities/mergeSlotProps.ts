import cx from 'classnames';

export interface IStandardProps {
  id?: string;
  name?: string;
  className?: string;
  style?: string;
  classes?: any;
  slotProps?: any;
  slots?: any;
}

export const mergeSlotProps = <TUserProps extends IStandardProps>(
  userProps: TUserProps = {} as any,
  baseSlotProps: TUserProps['slotProps'],
) => {
  const userSlotProps: any = userProps.slotProps || {};
  const { id, className, style, classes = {} } = userProps;

  // First distribute standard userProps.
  for (const name in baseSlotProps) {
    const isRoot = name === 'root';

    baseSlotProps[name] = {
      ...(isRoot && {
        id,
        name,
        style,
      }),
      ...baseSlotProps[name],
      ...userSlotProps[name],
      className: cx(isRoot && className, (classes as any)[name], baseSlotProps[name].className),
    };
  }

  return baseSlotProps;
};
