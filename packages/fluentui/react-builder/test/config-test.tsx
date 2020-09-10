import * as React from 'react';

import { jsonTreeCloneElement, jsonTreeFindElement, resolveDraggingElement } from '../src/config';
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

  describe('jsonTreeCloneElement', () => {
    it('clones leaf', () => {
      const c1Uuid = 'c1';
      const src: JSONTreeElement = {
        uuid: 'root',
        type: 'test',
        props: {
          children: [{ $$typeof: 'Symbol(react.element)', type: 'test_c1', uuid: c1Uuid }],
        },
      };

      const dst = jsonTreeCloneElement(src, jsonTreeFindElement(src, c1Uuid));
      expect(dst).not.toBeNull();
      expect(dst).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'test_c1',
      });
      expect(dst.uuid).not.toBe(c1Uuid);
    });

    it('does not touch uuid out of Symbol(react.element)', () => {
      const c1Uuid = 'c1';
      const anotherUuid = 'another_uuid';
      const src: JSONTreeElement = {
        uuid: 'root',
        type: 'test',
        props: {
          children: [
            { $$typeof: 'Symbol(react.element)', type: 'test_c1', uuid: c1Uuid, props: { uuid: anotherUuid } },
          ],
        },
      };

      const dst = jsonTreeCloneElement(src, jsonTreeFindElement(src, c1Uuid));
      expect(dst.props.uuid).toBe(anotherUuid);
    });

    it('changes uuid in slots', () => {
      const c1Uuid = 'c1';
      const c1SlotUUid = 'c1->slot';
      const src: JSONTreeElement = {
        uuid: 'root',
        type: 'test',
        props: {
          children: [
            {
              $$typeof: 'Symbol(react.element)',
              type: 'test_c1',
              uuid: c1Uuid,
              props: {
                slot: {
                  $$typeof: 'Symbol(react.element)',
                  type: 'test_c1',
                  uuid: c1SlotUUid,
                },
              },
            },
          ],
        },
      };

      const dst = jsonTreeCloneElement(src, jsonTreeFindElement(src, c1Uuid));
      expect(dst.props.slot.uuid).not.toBe(c1SlotUUid);
    });

    it('clones deep structure', () => {
      const c1Uuid = 'c1';
      const c11Uuid = 'c1->1';
      const src: JSONTreeElement = {
        uuid: 'root',
        type: 'test',
        props: {
          children: [
            {
              $$typeof: 'Symbol(react.element)',
              type: 'test_c1',
              uuid: c1Uuid,
              props: {
                children: [
                  'just_a_string',
                  {
                    $$typeof: 'Symbol(react.element)',
                    type: 'test_c1_1',
                    uuid: c11Uuid,
                  },
                ],
              },
            },
          ],
        },
      };
      const dst = jsonTreeCloneElement(src, jsonTreeFindElement(src, c1Uuid));
      expect(dst).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'test_c1',
        props: {
          children: [
            'just_a_string',
            {
              $$typeof: 'Symbol(react.element)',
              type: 'test_c1_1',
            },
          ],
        },
      });
      expect(dst.uuid).toBeDefined();
      expect(dst.uuid).not.toBe(c1Uuid);

      expect((dst.props.children[1] as JSONTreeElement).uuid).toBeDefined();
      expect((dst.props.children[1] as JSONTreeElement).uuid).not.toBe(c11Uuid);
    });
  });

  describe('resolveDraggingElement', () => {
    const FunctionalComponent: React.FunctionComponent<any> = () => <div>fcomponent</div>;
    FunctionalComponent.displayName = 'FunctionalComponent';

    class ClassComponent extends React.Component<any> {
      static displayName = 'ClassComponent';
    }

    it('resolves unknown component', () => {
      const MOCKED_DRAGGING_PROPS = {
        /* empty */
      };
      const resolved = resolveDraggingElement('Unknown', 'ModuleName', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'Unknown',
        displayName: 'Unknown',
        moduleName: 'ModuleName',
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
      const resolved = resolveDraggingElement('JSONTreeElement', 'ModuleName', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'JSONTreeElement',
        displayName: 'JSONTreeElement',
        moduleName: 'ModuleName',
        props: {
          content: 'Hello',
        },
      });
    });

    it('resolves FunctionalComponent as ReactElement', () => {
      const MOCKED_DRAGGING_PROPS = {
        FunctionalComponent: <FunctionalComponent content="FunctionalComponentContent" />,
      };
      const resolved = resolveDraggingElement('FunctionalComponent', 'ModuleName', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'FunctionalComponent',
        displayName: 'FunctionalComponent',
        moduleName: 'ModuleName',
        props: {
          content: 'FunctionalComponentContent',
        },
      });
    });

    it('resolves ClassComponent as ReactElement', () => {
      const MOCKED_DRAGGING_PROPS = {
        ClassComponent: <ClassComponent>ClassComponentChild</ClassComponent>,
      };

      const resolved = resolveDraggingElement('ClassComponent', 'ModuleName', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'ClassComponent',
        displayName: 'ClassComponent',
        moduleName: 'ModuleName',
        props: {
          children: 'ClassComponentChild',
        },
      });
    });

    it('resolves ReactElement in a prop', () => {
      const MOCKED_DRAGGING_PROPS = {
        ElementInSlot: <ClassComponent slot={<FunctionalComponent />}>ClassComponentChild</ClassComponent>,
      };
      const resolved = resolveDraggingElement('ElementInSlot', 'ModuleName', MOCKED_DRAGGING_PROPS);

      expect(resolved).toHaveProperty('uuid');
      expect(resolved).toMatchObject({
        $$typeof: 'Symbol(react.element)',
        type: 'ClassComponent',
        displayName: 'ElementInSlot',
        moduleName: 'ModuleName',
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
