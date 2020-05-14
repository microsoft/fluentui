import * as React from 'react';
import * as keyboardKey from 'keyboard-key';

import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';
import Tree from 'src/components/Tree/Tree';
import { treeTitleClassName } from 'src/components/Tree/TreeTitle';
import { treeItemClassName } from 'src/components/Tree/TreeItem';
import { ReactWrapper, CommonWrapper } from 'enzyme';

const items = [
  {
    id: '1',
    title: '1',
    items: [
      {
        id: '11',
        title: '11',
      },
      {
        id: '12',
        title: '12',
        items: [
          {
            id: '121',
            title: '121',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: '2',
    items: [
      {
        id: '21',
        title: '21',
        items: [
          {
            id: '211',
            title: '211',
          },
        ],
      },
      {
        id: '22',
        title: '22',
      },
    ],
  },
  {
    id: '3',
    title: '3',
  },
];

const getTitles = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${treeTitleClassName}`).filterWhere(n => typeof n.type() === 'string');
const getItems = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${treeItemClassName}`).filterWhere(n => typeof n.type() === 'string');

const checkOpenTitles = (wrapper: ReactWrapper, expected: string[]): void => {
  const titles = getTitles(wrapper);

  expect(titles.length).toEqual(expected.length);

  expected.forEach((expectedTitle, index) => {
    expect(titles.at(index).getDOMNode().textContent).toEqual(expectedTitle);
  });
};

describe('Tree', () => {
  isConformant(Tree, { autoControlledProps: ['activeItemIds'] });

  describe('activeItemIds', () => {
    it('should contain index of item open at click', () => {
      const wrapper = mountWithProvider(<Tree items={items} />);

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
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['1', '2']} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('click');
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3']);
    });

    it('should contain only one index at a time if exclusive', () => {
      const wrapper = mountWithProvider(<Tree items={items} exclusive />);

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
      const wrapper = mountWithProvider(<Tree items={items} />);

      getItems(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowRight });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3']);
    });

    it('should have index of item removed if closed by ArrowLeft', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['1', '2']} />);

      getItems(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowLeft });
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3']);
    });

    it('should have all TreeItems with a subtree open on asterisk key', () => {
      const wrapper = mountWithProvider(<Tree items={items} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3']);
    });

    it('should expand subtrees only on current level on asterisk key', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['1']} />);

      getTitles(wrapper)
        .at(1) // title 11
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '121', '2', '3']);
    });

    it('should not be changed on asterisk key if all siblings are already expanded', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['1', '2', '3']} />);

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] });
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3']);
    });

    it('should have items expanded based on their expanded prop', () => {
      const itemsClone = JSON.parse(JSON.stringify(items));
      itemsClone[0]['expanded'] = true;
      itemsClone[0]['items'][1]['expanded'] = true;
      const wrapper = mountWithProvider(<Tree items={itemsClone} />);

      checkOpenTitles(wrapper, ['1', '11', '12', '121', '2', '3']);
    });

    it('should have multiple items on the same level expanded based on their expanded prop', () => {
      const itemsClone = JSON.parse(JSON.stringify(items));
      itemsClone[0]['expanded'] = true;
      itemsClone[0]['items'][1]['expanded'] = true;
      itemsClone[1]['expanded'] = true;
      const wrapper = mountWithProvider(<Tree items={itemsClone} />);

      checkOpenTitles(wrapper, ['1', '11', '12', '121', '2', '21', '22', '3']);
    });

    it('should have expanded prop from items overriden by controlling activeItemIds', () => {
      const itemsClone = JSON.parse(JSON.stringify(items));
      itemsClone[0]['expanded'] = true;
      itemsClone[0]['items'][1]['expanded'] = true;
      const wrapper = mountWithProvider(<Tree items={itemsClone} activeItemIds={['2', '21']} />);

      checkOpenTitles(wrapper, ['1', '2', '21', '211', '22', '3']);
    });
  });
});
