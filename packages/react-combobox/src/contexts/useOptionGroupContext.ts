import { useMemo } from 'react';
import { OptionGroupContextValues } from './OptionGroupContext';
import { OptionValue, OptionGroupValue, OrderedGroupState } from '../utils/OrderedGroup.types';

export function useOptionGroupContextValues(state: OrderedGroupState): OptionGroupContextValues {
  const { options } = state;

  const { registerOption, unRegisterOption } = useMemo(() => {
    const register = (option: OptionValue | OptionGroupValue) => {
      // id is currently duplicated in the key and option data. Keeping it as-is for now to test.
      if (option && option.id) {
        options[option.id] = option;
      }
    };

    const unRegister = (id: string) => {
      delete options[id];
    };

    return { registerOption: register, unRegisterOption: unRegister };
  }, [options]);

  const optionGroup = {
    registerOption,
    unRegisterOption,
  };

  return { optionGroup };
}
