import * as React from 'react';

export interface ILayerHostProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Optional boolean specifying that the host is the default layer host. This controls some
   * basic css rules to set the host to position: fixed so that the the content within will be placed
   * relative to the page regardless of scroll position, and with a large z-index (1000000) so that it
   * will render on top of the rendered DOM markup.
   */
  isDefault?: boolean;
}
