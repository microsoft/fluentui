import * as React from 'react';
import { keyboardKey } from '@fluentui/keyboard-key';

import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';
import { HierarchicalTree } from 'src/components/HierarchicalTree/HierarchicalTree';
import { hierarchicalTreeTitleClassName } from 'src/components/HierarchicalTree/HierarchicalTreeTitle';
import { hierarchicalTreeItemClassName } from 'src/components/HierarchicalTree/HierarchicalTreeItem';
import { ReactWrapper, CommonWrapper } from 'enzyme';

const items = [
  {
    key: '1',
    title: '1',
    items: [
      {
        key: '11',
        title: '11',
      },
      {
        key: '12',
        title: '12',
        items: [
          {
            key: '121',
            title: '121',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '2',
    items: [
      {
        key: '21',
        title: '21',
        items: [
          {
            key: '211',
            title: '211',
          },
        ],
      },
      {
        key: '22',
        title: '22',
      },
    ],
  },
  {
    key: '3',
    title: '3',
  },
];

const getTitles = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${hierarchicalTreeTitleClassName}`).filterWhere(n => typeof n.type() === 'string');
const getItems = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${hierarchicalTreeItemClassName}`).filterWhere(n => typeof n.type() === 'string');

const checkOpenTitles = (wrapper: ReactWrapper, expected: string[]): void => {
  const titles = getTitles(wrapper);
  expect(titles.length).toEqual(expected.length);

  expected.forEach((expectedTitle, index) => {
    expect(titles.at(index).getDOMNode().textContent).toEqual(expectedTitle);
  });
};

describe('HierarchialTree', () => {
  isConformant(HierarchicalTree, {
    constructorName: 'HierarchicalTree',
    autoControlledProps: ['activeIndex'],
  });

  describe('activeIndex', () => {
    it('should contain index of item open at click', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3']);

      getTitles(wrapper)
        .at(3) // title 2
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3']);
    });

    it('should have index of item removed when closed at click', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} defaultActiveIndex={[0, 1]} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3']);
    });

    it('should contain only one index at a time if exclusive', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} exclusive />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3']);

      getTitles(wrapper)
        .at(3) // title 2
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3']);
    });

    it('should contain index of item open by ArrowRight', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowRight });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3']);
    });

    it('should have index of item removed if closed by ArrowLeft', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} defaultActiveIndex={[0, 1]} />);

      getItems(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowLeft });
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3']);
    });

    it('should have all TreeItems with a subtree open on asterisk key', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3']);
    });

    it('should expand subtrees only on current level on asterisk key', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} defaultActiveIndex={[0]} />);

      getTitles(wrapper)
        .at(1) // title 11
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '121', '2', '3']);
    });

    it('should not be changed on asterisk key if all siblings are already expanded', () => {
      const wrapper = mountWithProvider(<HierarchicalTree items={items} defaultActiveIndex={[0, 1, 2]} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3']);
    });
  });
});
