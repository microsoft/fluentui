import { isConformant } from 'test/specs/commonTests';

import { Form } from 'src/components/Form/Form';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { FormField } from 'src/components/Form/FormField';

const formImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Form);

describe('Form', () => {
  isConformant(Form, { testPath: __filename, constructorName: 'Form' });
  formImplementsCollectionShorthandProp('fields', FormField, { mapsValueToProp: 'label' });
});
