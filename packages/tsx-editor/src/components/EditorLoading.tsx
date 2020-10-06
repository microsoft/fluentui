import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';

export interface IEditorLoadingProps {
  /** Container height */
  height: number | string;
}

/**
 * Renders a loading spinner and message.
 */
export const EditorLoading: React.FunctionComponent<IEditorLoadingProps> = props => {
  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: props.height } }}>
      <Spinner size={SpinnerSize.large} label="Loading editor..." />
    </Stack>
  );
};
