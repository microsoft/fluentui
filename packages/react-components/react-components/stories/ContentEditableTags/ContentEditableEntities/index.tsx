import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/utilities';
import * as React from 'react';
import { useFluent } from '../../../src/index';
import { createContentEditableManager } from './manager';
import { AtomicEntity, Entity, TextEntity } from './Entity';
import { parseEntities } from './entityParser';

export const ContentEditableEntities = () => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { targetDocument } = useFluent();

  const [entities, setEntitites] = React.useState<Entity[]>([
    new TextEntity('hey'),
    new AtomicEntity('Forest Gump'),
    new AtomicEntity('James Hetfield'),
  ]);

  const updateEntities = (newEntitites: Entity[]) => {
    setEntitites(newEntitites);
  };

  const [manager, _] = React.useState(canUseDOM() ? createContentEditableManager(updateEntities) : null);

  useIsomorphicLayoutEffect(() => {
    if (itemRef.current && manager) {
      manager.attachInput(itemRef.current, targetDocument!);
    }
  }, [itemRef, manager, targetDocument]);

  return (
    <ContentEditable
      ref={itemRef}
      onNodesUpdated={nodes => {
        // Replace entities with parsed
        const newE = parseEntities(nodes);
        // contentEditableRef.current!.innerHTML = '';
        updateEntities(newE);
      }}
      value={entities.map(entity => entity.render()).join('')}
    />
  );

  // return (
  //   <div
  //     ref={itemRef}
  //     contentEditable="true"
  //     onBeforeInput={event => {
  //       const nodes = event.target.childNodes;
  //       // Replace entities with parsed
  //       const newE = parseEntities(nodes);
  //       // contentEditableRef.current!.innerHTML = '';
  //       updateEntities(newE);
  //     }}
  //   >
  //     {entities.map(entity => entity.render())}
  //   </div>
  // );
};

const ContentEditable = props => {
  const cursorPosition = React.useRef<number>(0);
  const elementPosition = React.useRef<number>(-1);
  const { targetDocument } = useFluent();

  const contentEditableRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (contentEditableRef.current!.innerHTML !== props.value) {
      const selection = window.getSelection();
      const range = document.createRange();

      range.setStart(contentEditableRef.current!, cursorPosition.current);
      range.collapse(true);
      selection!.removeAllRanges();

      contentEditableRef.current!.innerHTML = props.value;

      selection!.addRange(range);
      // text_div.focus();
    }
  });

  return (
    <div
      contentEditable="true"
      ref={contentEditableRef}
      onInput={event => {
        props.onNodesUpdated(event.target.childNodes);
      }}
    />
  );
};
