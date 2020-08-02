import { FlexItemState, FlexItemProps } from './FlexItem.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';

export const useFlexItem = (
  props: FlexItemProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): FlexItemState => {
  return {
    ...props,
    style: getStyleFromPropsAndOptions(props, options, '--flexitem'),
  };
};
