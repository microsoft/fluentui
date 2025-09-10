import * as React from 'react';

import { SuggestionsControl } from './SuggestionsControl';
import { render } from '@testing-library/react';

const doNothing = () => {
  return;
};

const renderNothing = () => <></>;

describe('Pickers', () => {
  describe('SuggestionsControl', () => {
    it('renders header/footer items with the provided className', () => {
      const { container } = render(
        <SuggestionsControl
          headerItemsProps={[
            {
              className: 'header-item-wrapper',
              renderItem: () => <div className="header-item-inner" />,
              shouldShow: () => true,
            },
          ]}
          footerItemsProps={[
            {
              className: 'footer-item-wrapper',
              renderItem: () => <div className="footer-item-inner" />,
              shouldShow: () => true,
            },
          ]}
          onCurrentlySelectedSuggestionChosen={doNothing}
          suggestions={[]}
          shouldLoopSelection={true}
          onSuggestionClick={doNothing}
          onRenderSuggestion={renderNothing}
        />,
      );

      expect(container.querySelector('.header-item-wrapper .header-item-inner')).not.toBe(null);
      expect(container.querySelector('.footer-item-wrapper .footer-item-inner')).not.toBe(null);
    });
  });
});
