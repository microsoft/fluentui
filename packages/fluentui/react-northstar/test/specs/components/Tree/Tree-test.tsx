import * as React from 'react';
import { keyboardKey } from '@fluentui/accessibility';

import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';
import { Tree } from 'src/components/Tree/Tree';
import { treeTitleClassName } from 'src/components/Tree/TreeTitle';
import { treeItemClassName } from 'src/components/Tree/TreeItem';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { TriangleDownIcon, TriangleEndIcon, svgIconClassName } from '@fluentui/react-icons-northstar';

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
        title: {
          content: '21',
          children: (Component, { content, expanded, hasSubtree, ...restProps }) => (
            <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
              {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}
              {content}
            </Component>
          ),
        },
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
  isConformant(Tree, {
    testPath: __filename,
    constructorName: 'Tree',
    autoControlledProps: ['activeItemIds', 'selectedItemIds'],
    skipAsPropTests: 'as-component',
  });

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

    it('should propagate correct items through onActiveItemIdsChange', () => {
      const itemsClone = JSON.parse(JSON.stringify(items));
      const onActiveItemIdsChange = jest.fn();
      const wrapper = mountWithProvider(
        <Tree items={itemsClone} activeItemIds={['2', '21']} onActiveItemIdsChange={onActiveItemIdsChange} />,
      );

      getTitles(wrapper)
        .at(0) // title 1
        .simulate('click');

      expect(onActiveItemIdsChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ activeItemIds: expect.arrayContaining(['2', '21', '1']) }),
      );
    });

    it('should expand on click when TreeTitle renders children components ', () => {
      const wrapper = mountWithProvider(<Tree items={items} />);

      // open title '2'
      getTitles(wrapper).at(1).simulate('click');

      // click on icon of title '21'
      const icon = wrapper.find(`.${svgIconClassName}`).filterWhere(n => typeof n.type() === 'string');
      icon.simulate('click');
      checkOpenTitles(wrapper, ['1', '2', '21', '211', '22', '3']);
    });
  });

  describe('onTitleClick', () => {
    const mockRootTitleClick = jest.fn();
    const mockLeafTitleClick = jest.fn();
    const items = [
      {
        id: 'root',
        title: 'root',
        onTitleClick: mockRootTitleClick,
        items: [
          {
            id: 'leaf',
            title: 'leaf',
            onTitleClick: mockLeafTitleClick,
          },
        ],
      },
    ];

    const getRoot = () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['root']} />);
      return getItems(wrapper).at(0);
    };
    const getLeaf = () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveItemIds={['root']} />);
      return getTitles(wrapper).at(1);
    };

    beforeEach(() => {
      mockLeafTitleClick.mockClear();
      mockRootTitleClick.mockClear();
    });

    it('should be called on click for leaf item', () => {
      getLeaf().simulate('click');
      expect(mockLeafTitleClick).toHaveBeenCalledTimes(1);
    });

    it('should be called on click for non-leaf item', () => {
      getRoot().simulate('click');
      expect(mockRootTitleClick).toHaveBeenCalledTimes(1);
    });

    it.each(['Enter', ' '])('should be called on "%s" key for leaf item', key => {
      getLeaf().simulate('keydown', { key });
      expect(mockLeafTitleClick).toHaveBeenCalledTimes(1);
    });

    it.each(['Enter', ' '])('should be called on "%s" key for non-leaf item', key => {
      getRoot().simulate('keydown', { key });
      expect(mockRootTitleClick).toHaveBeenCalledTimes(1);
    });
  });
});
