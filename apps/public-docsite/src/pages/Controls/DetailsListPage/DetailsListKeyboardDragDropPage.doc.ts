import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListKeyboardAccessibleResizeAndReorderProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListKeyboardDragDropPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Keyboard Column Reorder & Resize',
  },
};
