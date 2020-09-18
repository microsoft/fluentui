import * as React from 'react';
import { mountWithProvider as mount } from 'test/utils';
import { TextArea } from 'src/components/TextArea/TextArea';
import { isConformant } from 'test/specs/commonTests';
import * as faker from 'faker';

describe('TextArea', () => {
  isConformant(TextArea, { testPath: __filename, constructorName: 'TextArea', autoControlledProps: ['value'] });

  describe('defaultValue', () => {
    test('sets "defaultValue" as initial "value"', () => {
      const value = faker.lorem.words();
      const wrapper = mount(<TextArea defaultValue={value} />);

      expect(wrapper.find('textarea').prop('value')).toBe(value);
    });
  });

  describe('onChange', () => {
    test('is called with (e, data)', () => {
      const value = faker.lorem.words();
      const onChange = jest.fn();
      const wrapper = mount(<TextArea onChange={onChange} />);

      wrapper.simulate('change', { target: { value } });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(expect.objectContaining({ type: 'change' }), expect.objectContaining({ value }));
    });
  });
});
