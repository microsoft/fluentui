import { isConformant } from 'test/specs/commonTests';
import { ButtonGroup } from 'src/components/Button/ButtonGroup';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { Button } from 'src/components/Button/Button';

const buttonGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(ButtonGroup);

describe('ButtonGroup', () => {
  isConformant(ButtonGroup, { constructorName: 'ButtonGroup' });
  buttonGroupImplementsCollectionShorthandProp('buttons', Button);
});
