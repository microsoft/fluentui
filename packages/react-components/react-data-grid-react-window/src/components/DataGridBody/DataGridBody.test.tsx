import { DataGridBody } from './DataGridBody';
import { DataGridBodyProps } from './DataGridBody.types';
import { isConformant } from '../../testing/isConformant';

describe('DataGridBody', () => {
  isConformant<DataGridBodyProps>({
    Component: DataGridBody,
    displayName: 'DataGridBody',
    disabledTests: ['component-has-static-classnames-object'],
    requiredProps: {
      height: 50,
      itemSize: 1000,
    },
  });
});
