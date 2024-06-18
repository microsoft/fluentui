import * as React from 'react';
import { Option } from '../Option';

type ComboboxOption = { children: React.ReactNode; value: string }

type UseComboboxFilterConfig<T extends ComboboxOption | string> = {
  /** Provides a custom filter for the option. */
  filter?: (optionText: string, query: string) => boolean;

  /** Provides a custom message to display when there are no options. */
  noOptionsMessage?: React.ReactNode;

  /** Provides a way to map an option object to a React key. By default, "value" is used. */
  optionToReactKey?: (option: T) => string;

  /** Provides a way to map an option object to a text used for search. By default, "value" is used. */
  optionToText?: (option: T) => string;

  /** Provides a custom render for the option. */
  renderOption?: (option: T) => JSX.Element;
};

function defaultFilter(optionText: string, query: string) {
  if (query === '') {
    return true;
  }

  return optionText.toLowerCase().includes(query.toLowerCase());
}

function defaultToString(option: string | ComboboxOption) {
  if (typeof option === 'string') {
    return option;
  }

  return option.children && typeof option.children === 'string' ? option.children : option.value;
}

/**
 * @internal
 */
export function useComboboxFilter<T extends ComboboxOption | string>(
  query: string,
  options: T[],
  config: UseComboboxFilterConfig<T>,
) {
  const {
    filter = defaultFilter,
    noOptionsMessage = "We couldn't find any matches.",
    optionToReactKey = defaultToString,
    optionToText = defaultToString,

    renderOption = (option: T) => {
      if (typeof option === 'string') {
        return <Option key={option}>{option}</Option>;
      }

      return (
        <Option {...option} key={optionToReactKey(option)} text={optionToText(option)} value={option.value}>
          {option.children}
        </Option>
      );
    },
  } = config;

  const filteredOptions = React.useMemo(() => {
    const searchValue = query.trim();

    return options.filter(option => filter(optionToText(option), searchValue));
  }, [options, optionToText, filter, query]);

  if (filteredOptions.length === 0) {
    return [
      <Option aria-disabled="true" key="no-results" text="">
        {noOptionsMessage}
      </Option>,
    ];
  }

  return filteredOptions.map(option => renderOption(option));
}
