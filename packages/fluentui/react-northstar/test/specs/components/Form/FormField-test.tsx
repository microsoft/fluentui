import * as React from 'react';

import { isConformant, implementsShorthandProp } from 'test/specs/commonTests';
import { createTestContainer, mountWithProvider } from 'test/utils';
import { Button } from 'src/components/Button/Button';
import { RadioGroup } from 'src/components/RadioGroup/RadioGroup';
import { Input } from 'src/components/Input/Input';
import { Text } from 'src/components/Text/Text';
import { FormField, formFieldMessageClassName } from 'src/components/Form/FormField';
import { Box } from 'src/components/Box/Box';
import { PresenceAvailableIcon } from '@fluentui/react-icons-northstar';

const inputIconClassName = '.ui-input__icon';

const formFieldImplementsShorthandProp = implementsShorthandProp(FormField);

const getFormField = (control: React.ComponentType<any> | string) =>
  mountWithProvider(<FormField control={{ as: control }} name="firstName" />).find('FormField');

describe('FormField', () => {
  isConformant(FormField, { testPath: __filename, constructorName: 'FormField' });
  formFieldImplementsShorthandProp('label', Text);
  formFieldImplementsShorthandProp('message', Text);
  formFieldImplementsShorthandProp('control', Box, { mapsValueToProp: 'children' });

  let testContainerInfo: ReturnType<typeof createTestContainer> | undefined;

  afterEach(() => {
    if (testContainerInfo) {
      testContainerInfo.removeTestContainer();
      testContainerInfo = undefined;
    }
  });

  it('renders the component control provided in the control shorthand prop', () => {
    const controls = [Button, Input, RadioGroup];
    controls.forEach(control => {
      const formField = getFormField(control);
      const controlElement = formField.find(control);
      expect(controlElement.length).toEqual(1);
    });
  });

  it('renders the primitive control provided in the control shorthand prop', () => {
    const formField = getFormField('input');
    const controlElement = formField.find('input');

    expect(controlElement.length).toEqual(1);
  });

  it('renders with icon and error message', () => {
    const formField = mountWithProvider(
      <FormField
        {...{
          label: 'First name',
          name: 'firstName',
          id: 'first-name-shorthand',
          key: 'first-name',
          errorMessage: 'ERROR',
          required: true,
        }}
      />,
    );

    expect(formField.find(inputIconClassName)).toBeDefined();
    expect(formField.find(`.${formFieldMessageClassName}`).at(0).getDOMNode().textContent).toBe('ERROR');
  });

  it('renders satisfactory indicator', () => {
    testContainerInfo = createTestContainer();
    const formField = mountWithProvider(
      <FormField
        {...{
          label: 'First name',
          name: 'firstName',
          id: 'first-name-shorthand',
          key: 'first-name',
          required: true,
          control: {
            as: Input,
            successIndicator: <PresenceAvailableIcon />,
          },
        }}
      />,
      // toBeVisible requires that the element be in the document
      { attachTo: testContainerInfo.testContainer },
    );

    expect(formField.find('PresenceAvailableIcon').length).toBe(0);
    formField.find('input').simulate('change', { target: { value: 'abc' } });
    expect(formField.find('PresenceAvailableIcon').length).toBe(1);
    expect(formField.find('PresenceAvailableIcon').getDOMNode()).toBeVisible();
  });

  it('should pass id to control', () => {
    const id = 'first-name-shorthand';
    const formField = mountWithProvider(
      <FormField
        {...{
          label: 'First name',
          name: 'firstName',
          id,
          key: 'first-name',
          required: true,
          control: {
            as: Input,
            successIndicator: <PresenceAvailableIcon />,
          },
        }}
      />,
    );

    expect(formField.find('input').prop('id')).toBe(id);
  });
});
