import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { KeytipData } from '../../KeytipData';
import { classNamesFunction } from '../../Utilities';
import { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';
import { useLink } from './useLink';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>({ useStaticStyles: true });

export const LinkBase = compose<'a', ILinkProps, ILinkProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useLink(props, composeOptions);

    const { className, disabled, href, styles, theme } = props;
    const classNames = getClassNames(styles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!,
    });

    return (
      <slots.keytipData {...slotProps.keytipData}>
        {(keytipAttributes: any): JSX.Element => (
          <slots.root {...keytipAttributes} ref={ref} {...slotProps.root} className={classNames.root} />
        )}
      </slots.keytipData>
    );
  },
  {
    slots: {
      keytipData: KeytipData,
    },
    displayName: 'LinkBase',
  },
);

LinkBase.defaultProps = {};
