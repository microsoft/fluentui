import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { InteractionTag } from '../InteractionTag/InteractionTag';
import { InteractionTagPrimary } from '../InteractionTagPrimary/InteractionTagPrimary';
import { InteractionTagSecondary } from '../InteractionTagSecondary/InteractionTagSecondary';
import { TagGroup } from './TagGroup';
import { TagGroupProps } from './TagGroup.types';
import { Tag } from '../Tag/Tag';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const initialTags = [
  {
    value: '1',
    children: (
      <Tag dismissible value={'1'} key={'1'} id="tag-1">
        Tag 1
      </Tag>
    ),
  },
  {
    value: '2',
    children: (
      <InteractionTag value={'2'} key={'2'} id="tag-2">
        <InteractionTagPrimary id="tag-2-primary" hasSecondaryAction>
          Interaction Tag 2
        </InteractionTagPrimary>
        <InteractionTagSecondary id="tag-2-secondary" />
      </InteractionTag>
    ),
  },
  {
    value: '3',
    children: (
      <Tag dismissible value={'3'} key={'3'} id="tag-3">
        Tag 3
      </Tag>
    ),
  },
];
const DismissExample = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };

  return <TagGroup onDismiss={removeItem}>{visibleTags.map(({ children }) => children)}</TagGroup>;
};

describe('TagGroup', () => {
  describe('Dismiss', () => {
    beforeEach(() => {
      mount(<DismissExample />);
    });

    it('click Tag should dismiss it and focus on the next focusable', () => {
      cy.get('#tag-1').realClick();
      cy.get('#tag-2-primary').should('have.focus');
      cy.get('#tag-1').should('not.exist');
    });

    it('backspace keydown on last Tag should dismiss it and focus on the prev focusable', () => {
      cy.get('#tag-3').focus().realPress('Backspace');
      cy.get('#tag-2-secondary').should('have.focus');
      cy.get('#tag-3').should('not.exist');
    });

    it('delete keydown on InteractionTag secondary should dismiss it and focus on the next focusable', () => {
      cy.get('#tag-2-secondary').focus().realPress('Delete');
      cy.get('#tag-3').should('have.focus');
      cy.get('#tag-2').should('not.exist');
    });
  });
});
