import { isConformant, implementsShorthandProp } from 'test/specs/commonTests';

import { Label } from 'src/components/Label/Label';
import { Image } from 'src/components/Image/Image';

const labelImplementsShorthandProp = implementsShorthandProp(Label);

describe('Label', () => {
  isConformant(Label, { testPath: __filename, constructorName: 'Label' });
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' });
});
