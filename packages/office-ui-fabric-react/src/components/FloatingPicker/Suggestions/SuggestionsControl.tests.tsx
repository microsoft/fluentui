import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SuggestionsControl } from './SuggestionsControl';

const doNothing = () => {
  return;
};

describe('Pickers', () => {
  describe('SuggestionsControl', () => {
    it('renders header/footer items with the provided className', () => {
      const root = document.createElement('div');
      ReactDOM.render(
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
          completeSuggestion={doNothing}
          suggestions={[]}
          shouldLoopSelection={true}
          onSuggestionClick={doNothing}
        />,
        root,
      );

      expect(root.querySelector('.header-item-wrapper .header-item-inner')).not.toBe(null);
      expect(root.querySelector('.footer-item-wrapper .footer-item-inner')).not.toBe(null);

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});
