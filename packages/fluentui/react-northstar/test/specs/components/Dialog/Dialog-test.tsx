import * as React from 'react';

import { Dialog, dialogSlotClassNames } from 'src/components/Dialog/Dialog';
import { Button } from 'src/components/Button/Button';
import { mountWithProvider, findIntrinsicElement } from 'test/utils';

describe('Dialog', () => {
  describe('content', () => {
    it('uses "id" if "content" with "id" is passed', () => {
      const contentId = 'element-id';

      const wrapper = mountWithProvider(<Dialog defaultOpen trigger={<Button />} content={{ id: contentId }} />);
      const content = findIntrinsicElement(wrapper, `.${dialogSlotClassNames.content}`);

      expect(content.prop('id')).toBe(contentId);
    });

    it('uses computed "id" if "content" is passed without "id"', () => {
      const wrapper = mountWithProvider(<Dialog defaultOpen trigger={<Button />} content="Welcome" />);
      const content = findIntrinsicElement(wrapper, `.${dialogSlotClassNames.content}`);

      expect(content.prop('id')).toMatch(/dialog-content-\d+/);
    });
  });

  describe('header', () => {
    it('uses "id" if "header" with "id" is passed', () => {
      const headerId = 'element-id';

      const wrapper = mountWithProvider(<Dialog defaultOpen trigger={<Button />} header={{ id: headerId }} />);
      const header = findIntrinsicElement(wrapper, `.${dialogSlotClassNames.header}`);

      expect(header.prop('id')).toBe(headerId);
    });

    it('uses computed "id" if "header" is passed without "id"', () => {
      const wrapper = mountWithProvider(<Dialog defaultOpen trigger={<Button />} header="Welcome" />);
      const header = findIntrinsicElement(wrapper, `.${dialogSlotClassNames.header}`);

      expect(header.prop('id')).toMatch(/dialog-header-\d+/);
    });

    it('uses "id" if "header" is React Element with "id" is passed', () => {
      const wrapper = mountWithProvider(<Dialog defaultOpen trigger={<Button />} header={<span id="header-id" />} />);
      const header = findIntrinsicElement(wrapper, `.${dialogSlotClassNames.header}`);

      expect(header.prop('id')).toBe('header-id');
    });
  });
});
