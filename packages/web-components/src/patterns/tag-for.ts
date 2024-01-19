import { Constructable, FASTElement, FASTElementDefinition } from '@microsoft/fast-element';

/**
 * Used to designate a template's dependency on another custom element.
 * @beta
 */
export type TemplateElementDependency = string | FASTElementDefinition | Constructable<FASTElement>;

/**
 * Determines what HTML tag name to use for the dependency.
 * @param dependency - The dependency the template is dependent on.
 * @returns The tag name to use in markup.
 * @beta
 */
export function tagFor(dependency: TemplateElementDependency): string {
  if (typeof dependency === 'string') {
    return dependency;
  }

  if (typeof dependency === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dependency = FASTElementDefinition.getByType(dependency)!;
    if (!dependency) {
      throw new Error('Missing FASTElement definition.');
    }
  }

  return dependency.name;
}
