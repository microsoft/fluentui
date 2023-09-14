import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TimePickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/TimePicker/TimePicker.doc';

export const TimePickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
