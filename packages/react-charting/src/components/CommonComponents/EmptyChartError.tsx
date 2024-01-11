import { getId } from '@fluentui/react/lib/Utilities';
import * as React from 'react';

class EmptyChartError extends React.Component {
  render() {
    return (
      <div id={getId('_Chart_empty')} role={'alert'} aria-label={'Graph has no data to display'}>
        <img src={'https://upload.wikimedia.org/wikipedia/commons/f/f0/Error.svg'} />
      </div>
    );
  }
}

export default EmptyChartError;
