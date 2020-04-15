import * as React from 'react';

import Loader from 'src/components/Loader/Loader';
import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';

describe('Loader', () => {
  isConformant(Loader);

  describe('delay', () => {
    it('is "0" by default', () => {
      const wrapper = mountWithProvider(<Loader />);

      expect(wrapper.find(Loader).prop('delay')).toBe(0);
    });

    it('renders children only when "delay" is passed', () => {
      jest.useFakeTimers();

      const selector = `.${Loader.deprecated_className}`;
      const wrapper = mountWithProvider(<Loader delay={500} />);

      expect(wrapper.find(selector).exists()).toBe(false);

      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find(selector).exists()).toBe(true);
    });
  });
});
