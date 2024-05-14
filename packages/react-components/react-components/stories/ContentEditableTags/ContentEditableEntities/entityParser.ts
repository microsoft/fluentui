import { Entity, AtomicEntity, TextEntity } from './Entity';

const isTextNode = (node: Node): node is Node => node.nodeType === Node.TEXT_NODE;
const isElement = (node: Node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE;

export const parseEntities: (nodes: NodeList) => Entity[] = nodes => {
  const entities: Entity[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (isTextNode(node)) {
      const entity = TextEntity.parseNode(node);
      if (entity) {
        entities.push(entity);
      }
    }

    if (isElement(node)) {
      const entityName = (node as HTMLElement).getAttribute('data-entityName');

      if (!entityName) {
        continue;
      }

      if (entityName === TextEntity.entityName) {
        const entity = TextEntity.parse(node);
        if (entity) {
          entities.push(entity);
        }
      }
      if (entityName === AtomicEntity.entityName) {
        const entity = AtomicEntity.parse(node);
        if (entity) {
          entities.push(entity);
        }
      }
    }
  }
  return entities;
};
