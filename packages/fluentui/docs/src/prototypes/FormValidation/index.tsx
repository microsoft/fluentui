import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import FormValidateFormik from './Formik';
import FormValidateHooks from './FormHooks';

const FormValidationPrototype: React.FC = () => {
  return (
    <>
      <PrototypeSection title="Formik">
        <ComponentPrototype
          title="List with context menu"
          description="Context menu can be opened by clicking on the more button or by right mouse button"
        >
          <FormValidateFormik />
        </ComponentPrototype>
      </PrototypeSection>
      <PrototypeSection title="Hooks">
        <ComponentPrototype
          title="List with context menu"
          description="Context menu can be opened by clicking on the more button or by right mouse button"
        >
          <FormValidateHooks />
        </ComponentPrototype>
      </PrototypeSection>
    </>
  );
};

export default FormValidationPrototype;
