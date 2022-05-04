import * as React from 'react';
import { useOptionGroup_unstable } from './useOptionGroup';
import { renderOptionGroup_unstable } from './renderOptionGroup';
import { useOptionGroupStyles_unstable } from './useOptionGroupStyles';
import type { OptionGroupProps } from './OptionGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * OptionGroup component: allows grouping of Option components within a Combobox
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> & { fluentComponentType?: string } = React.forwardRef(
  (props, ref) => {
    const state = useOptionGroup_unstable(props, ref);

    useOptionGroupStyles_unstable(state);
    return renderOptionGroup_unstable(state);
  },
);

OptionGroup.fluentComponentType = 'OptionGroup';

OptionGroup.displayName = 'OptionGroup';
