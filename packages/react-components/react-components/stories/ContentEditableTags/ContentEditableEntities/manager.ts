import { AtomicEntity, Entity, TextEntity } from './Entity';
import { parseEntities } from './entityParser';

export const createContentEditableManager = (updateEntities: (entitites: Entity[]) => void) => {
  let document: Document;
  let input: HTMLElement;

  function attachInput(el: HTMLElement, doc: Document) {
    input = el;
    document = doc;

    // Init element
    input.setAttribute('contenteditable', 'true');
  }

  function getInputProps() {
    return {
      onInput: e => {
        const nodes = e.target.childNodes;
        // Replace entities with parsed
        const newE = parseEntities(nodes);
        updateEntities(newE);
      },
    };
  }

  return { attachInput, getInputProps };
};
