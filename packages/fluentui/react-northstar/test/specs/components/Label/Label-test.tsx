import { isConformant, implementsShorthandProp } from 'test/specs/commonTests';

import Label from 'src/components/Label/Label';
import Box from 'src/components/Box/Box';
import Image from 'src/components/Image/Image';

const labelImplementsShorthandProp = implementsShorthandProp(Label);

describe('Label', () => {
  isConformant(Label, { constructorName: 'Label' });
  labelImplementsShorthandProp('icon', Box);
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' });
});
