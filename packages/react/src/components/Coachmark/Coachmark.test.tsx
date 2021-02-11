import * as path from 'path';
import { Coachmark } from './Coachmark';
import { isConformant } from '../../common/isConformant';

describe('Coachmark', () => {
  isConformant({
    Component: Coachmark,
    displayName: 'Coachmark',
    componentPath: path.join(__dirname, 'Coachmark.ts'),
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });
});
