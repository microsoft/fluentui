import * as React from 'react';

import { jsonTreeFindElement, resolveDraggingElement } from '../src/config';
import { JSONTreeElement } from '../src/components/types';

describe('config', () => {
  const tree: JSONTreeElement = {
    uuid: 'root',
    type: 'test',
    props: {
      children: [
        {
          uuid: 'c1',
          type: 'test',
          props: {
            children: [
              {
                uuid: 'c1->1',
                type: 'test',
              },
              {
                uuid: 'c1->2',
                type: 'test',
                props: {
                  children: [
                    {
                      uuid: 'c1->2->1',
                      type: 'test',
                    },
                    {
                      uuid: 'c1->2->2',
                      type: 'test',
                      props: {
                        children: [
                          'Hello there!',
                          {
                            uuid: 'c1->2->2->1',
                            type: 'test',
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  describe('jsonTreeFindElement', () => {
    it('returns null for unknown uuid', () => {
      const ret = jsonTreeFindElement(tree, 'unknown');
      expect(ret).toBeNull();
    });

    it('finds root', () => {
      const ret = jsonTreeFindElement(tree, 'root');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('root');
    });

    it('finds first level child', () => {
      const ret = jsonTreeFindElement(tree, 'c1');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('c1');
    });

    it('finds nth-level child', () => {
      const ret = jsonTreeFindElement(tree, 'c1->2->2->1');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('c1->2->2->1');
    });
  });

  describe('resolveDraggingElement', () => {
    const FunctionalComponent: React.FunctionComponent<any> = ({ content }) => <div>fcomponent</div>;
    FunctionalComponent.displayName = 'FunctionalComponent';

    class ClassComponent extends React.Component<any> {
      static displayName = 'ClassComponent';
    }

    it('resolves unknown component', () => {
      const MOCKED_DRAGGING_PROPS = {
        /* empty */
      };
      const resolved = resolveDraggingElement('Unknown', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'Unknown',
        displayName: 'Unknown',
      });
    });

    it('resolves JSONTreeElement', () => {
      const MOCKED_DRAGGING_PROPS = {
        JSONTreeElement: {
          props: {
            content: 'Hello',
          },
        },
      };
      const resolved = resolveDraggingElement('JSONTreeElement', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'JSONTreeElement',
        displayName: 'JSONTreeElement',
        props: {
          content: 'Hello',
        },
      });
    });

    it('resolves FunctionalComponent as ReactElement', () => {
      const MOCKED_DRAGGING_PROPS = {
        FunctionalComponent: <FunctionalComponent content="FunctionalComponentContent" />,
      };
      const resolved = resolveDraggingElement('FunctionalComponent', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'FunctionalComponent',
        displayName: 'FunctionalComponent',
        props: {
          content: 'FunctionalComponentContent',
        },
      });
    });

    it('resolves ClassComponent as ReactElement', () => {
      const MOCKED_DRAGGING_PROPS = {
        ClassComponent: <ClassComponent>ClassComponentChild</ClassComponent>,
      };

      const resolved = resolveDraggingElement('ClassComponent', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'ClassComponent',
        displayName: 'ClassComponent',
        props: {
          children: 'ClassComponentChild',
        },
      });
    });

    it('resolves ReactElement in a prop', () => {
      const MOCKED_DRAGGING_PROPS = {
        ElementInSlot: <ClassComponent slot={<FunctionalComponent />}>ClassComponentChild</ClassComponent>,
      };
      const resolved = resolveDraggingElement('ElementInSlot', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'ClassComponent',
        displayName: 'ElementInSlot',
        props: {
          slot: {
            $$typeof: 'Symbol(react.element)',
            type: 'FunctionalComponent',
          },
          children: 'ClassComponentChild',
        },
      });
    });
  });
});
