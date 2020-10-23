/*
TODO:
* Add the missing and not so obvious attributes (e.g. "aria-haspopup" or "aria-expanded") for the already defined roles (e.g. "menuitem" or "checkbox") according to the specification.
* With JAWS, in the case of the element with the "listbox" role, differentiate between having and not having the aria-multiselectable="true" attribute. If this attribute is present, then aria-selected="false" on the child elements with the role "option" behave differently than if it is not present. Specifically, if aria-multiselectable="true" is present, the aria-selected="false" causes the narration of "not selected", but if present, having the aria-selected attribute makes no difference to the narration. 
* Should we also consider the "disabled" state?
*/
import { SRNC } from './SRNC-Definitions';
import './SRNC-Rules-Win_JAWS';
import './SRNC-LandmarksAndGroups-Win_JAWS';

export interface IAriaElement extends HTMLElement {
  ariaLabel: string | null;
  ariaLabelledByElements: HTMLElement[] | null;
  ariaDescribedByElements: HTMLElement[] | null;
  ariaActiveDescendantElement: HTMLElement | null;
  role: string | null;
  type: string | null;
}

export type FocusableElement = {
  path: string[];
  element: IAriaElement;
};

export class NarrationComputer {
  computedParts: Record<string, string> = {
    landmarksAndGroups: '',
    value: '',
    name: '',
    description: '',
    type: '',
    state: '',
    position: '',
    usage: '',
  };

  // Traverses the DOM rooted at the given element to find all the focusable elements and returns them.
  async getFocusableElements(element: IAriaElement): Promise<FocusableElement[]> {
    // Prepare all the arrays
    const activeDescendantsParents: IAriaElement[] = [];
    const path: string[] = [];
    const focusableElements: FocusableElement[] = [];

    // Traverse down the DOM tree rooted at the element to first find the activeDescendants parent elements, and then all the focusable elements and their paths
    this.findActiveDescendantsParents(element, activeDescendantsParents);
    await this.findFocusableElements(element, path, focusableElements, activeDescendantsParents);

    return focusableElements;
  } // End getFocusableElements

  // Recursively traverses the DOM tree rooted at the given element to find all the parents which have the ariaActiveDescendantElement property set, and saves the found elements to the given parents array.
  findActiveDescendantsParents(element: IAriaElement, parents: IAriaElement[]) {
    if (element.ariaActiveDescendantElement != null) {
      // Begin if 1
      parents.push(element);
    } // End if 1
    Array.from(element.children).forEach((child: IAriaElement) => {
      // Begin forEach 1
      this.findActiveDescendantsParents(child, parents);
    }); // End forEach 1
  } // End findActiveDescendantsParents

  // Recursively traverses the given element to find all the focusable elements and saves their paths along the way.
  async findFocusableElements(
    element: IAriaElement,
    path: string[],
    focusableElements: FocusableElement[],
    activeDescendantsParents: IAriaElement[],
  ) {
    // Determine the path
    const newPath = path.slice();
    const node = await (window as any).getComputedAccessibleNode(element);

    // Only add the item to the path if the role is not a generic container
    if (node.role !== 'genericContainer') {
      const item = node.name ? `${node.role} (${node.name})` : node.role;
      newPath.push(item);
    }

    // If the element is focusable, save it together with its path
    const isDirectlyFocusable =
      (element.getAttribute('tabindex') || element.tabIndex >= 0) && element.ariaActiveDescendantElement == null;
    const isActiveDescendant = activeDescendantsParents.some(parent => {
      // Begin some 1
      return parent.tabIndex >= 0 && parent.ariaActiveDescendantElement === element;
    }); // End some 1
    if (isDirectlyFocusable || isActiveDescendant) {
      // Begin if 1
      const focusableElement: FocusableElement = {
        path: newPath,
        element,
      };
      focusableElements.push(focusableElement);
      // return;
    } // End if 1

    // Traverse down to all the children
    for (let i = 0; i < element.children.length; i++) {
      // Begin for 1
      const child = element.children[i] as IAriaElement;
      await this.findFocusableElements(child, newPath, focusableElements, activeDescendantsParents);
    } // End for 1
  } // End findFocusableElements

  // Returns ARIA landmarks and groups that would be entered and narrated when focus moves from the given previous element to the given element, for the given platform.
  getEnteredLandmarksAndGroups(element: HTMLElement, prevElement: HTMLElement, platform: string): string[] {
    const landmarksAndGroups = [];
    const commonAncestor = this.getCommonAncestor(element, prevElement);
    if (!commonAncestor) {
      // Begin if 1
      return landmarksAndGroups;
    } // End if 1

    // Find all the landmarks and groups between the element and the common ancestor, and compute and save their narration
    let parent = element.parentElement as IAriaElement;
    while (parent !== commonAncestor) {
      // Begin while 1
      let skipParent = false;

      // The "<footer>" and "<headr>" elements don't create a landmark if they are a descendant of a sectioning element or role
      if (['footer', 'header'].includes(parent.tagName.toLowerCase())) {
        // Begin if 1
        // Note: According to MDN, the <header>" and "<footer>" elements should not create a landmark if they are descendants  of sectioning roles (e.g. article or main), but using both JAWS and NVDA they actually do. However, they do only when tabbed into, not when entered with virtual cursor.
        // Therefore, in this code, we don't follow MDN, but follow how JAWS and NVDA actually behave.
        // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
        const sectionElements = ['article', 'aside', 'main', 'nav', 'section'];
        // const sectionRoles = ['article', 'complementary', 'main', 'navigation', 'region'];
        const sectionRoles = [];
        let ancestor = parent.parentElement as IAriaElement;
        while (ancestor !== element.ownerDocument.body) {
          // Begin while 2
          const isSectionElementAncestor = sectionElements.includes(ancestor.tagName.toLowerCase());
          const isSectionRoleAncestor = sectionRoles.includes(ancestor.role);
          if (isSectionElementAncestor || isSectionRoleAncestor) {
            // Begin if 2
            skipParent = true;
            break;
          } // End if 2
          ancestor = ancestor.parentElement as IAriaElement;
        } // End while 2
      } // End if 1

      if (!skipParent) {
        // Begin if 1
        const definitions = SRNC.landmarksAndGroups[platform];
        const landmarkOrGroup = [];

        // Test if the parent's role or tag name exists in the landmarks and groups definitions
        let testName = `role=${parent.role}`;
        let definition = parent.role ? definitions[testName] : null;
        if (!definition && !parent.role) {
          // Begin if 2
          testName = parent.tagName.toLowerCase();
          definition = definitions[testName];
        } // End if 2

        // If the "aria-label" or "aria-labelledby" attribute exists together with a landmark or group element or role, or if it is the "narrateLabelIfNoRole" exception, add its value to the narration
        if (definition || SRNC.narrateLabelIfNoRole.includes(platform)) {
          // Begin if 2
          const label =
            parent.ariaLabelledByElements
              ?.map((labElement: HTMLElement) => {
                return labElement.textContent;
              })
              .join(SRNC.DESCBY_AND_LABBY_SEPARATOR) ||
            parent.ariaLabel ||
            null;

          if (label) {
            // Begin if 3
            landmarkOrGroup.push(label);
          } // End if 3
        } // End if 2

        // If the definition exists and it is not an exception that the landmark or group element or role also must have the "aria-label" or "aria-labelledby" attribute to be narrated, add the definition to the narration"""
        if (definition && !SRNC.narrateOnlyWhenLabelled[platform].includes(testName)) {
          // Begin if 2
          landmarkOrGroup.push(definition);
        } // End if 2
        landmarksAndGroups.unshift(landmarkOrGroup.join(' '));
      } // End if 1
      parent = parent.parentElement as IAriaElement;
    } // End while 1
    return landmarksAndGroups;
  } // End getEnteredLandmarksAndGroups

  getCommonAncestor(element1: HTMLElement, element2: HTMLElement): HTMLElement {
    let parent1 = element1.parentElement;
    let parent2 = element2.parentElement;
    while (parent1 !== parent2 && parent1 !== element1.ownerDocument.body) {
      // Begin while 1
      while (parent1 !== parent2 && parent2 !== element2.ownerDocument.body) {
        // Begin while 2
        // If the element1 is an ancestor of the element2, return
        if (parent2 === element1) {
          // Begin if 1
          return null;
        } // End if 1
        parent2 = parent2.parentElement;
      } // End while 2
      // If the element2 is an ancestor of the element1, return
      if (parent1 === element2) {
        // Begin if 1
        return null;
      } // End if 1
      parent2 = element2.parentElement;
      parent1 = parent1.parentElement;
    } // End while 1
    return parent1;
  } // End getCommonAncestor

  // Computes and returns the screen reader narration for the given element using the previous element and platform.
  async getNarration(element: IAriaElement, prevElement: IAriaElement, platform: string): Promise<string> {
    let definitionName = this.getDefinitionName(element, platform, 'stateRules');

    // Retrieve the computed accessible node
    const node = await (window as any).getComputedAccessibleNode(element);

    // Compute and store all the narration parts
    this.computeLandmarksAndGroups(element, prevElement, platform);
    this.computeUsage(definitionName, element, platform);
    this.computeDescription(definitionName, element, platform);
    this.computeNameAndTitle(node, element);
    this.computeValue(node);
    this.computePosition();
    this.computeTypeAndState(node, definitionName, element, platform);

    definitionName = this.getDefinitionName(element, platform, 'readingOrder');
    const computedNarration = this.composeNarrationFromParts(definitionName, platform);
    return computedNarration;
  } // End getNarration

  // Returns the definition name based on the given element, platform and definition type.
  getDefinitionName(element: IAriaElement, platform: string, definitionType: string): string {
    // Determine the definitions source by the definition type
    const definitionTypes: Record<string, any> = {
      readingOrder: SRNC.readingOrder[platform],
      stateRules: SRNC.stateRules[platform],
    };
    const definitions = definitionTypes[definitionType];

    // Determine the definition name
    let definitionName = '[default]';
    let testName = `role=${element.role}`;
    let definition = definitions[testName];
    if (element.role && definition) {
      // Begin if 1
      // A definition exists for the element role
      // Handle the situation when the definition is a reference to another definition
      definitionName = typeof definition === 'string' ? definition : testName;
    } else {
      // Else if 1
      // A definition exists for the element tag name
      testName = element.tagName.toLowerCase();

      // In the case of the <input> element, the definition name is further determined by the element's "type" attribute
      if (testName === 'input') {
        // Begin if 2
        testName += `:${element.type}`;
      } // End if 2
      definition = definitions[testName];
      if (definition) {
        // Begin if 2
        // The definition exists
        // Handle the situation when the definition is a reference to another definition
        definitionName = typeof definition === 'string' ? definition : testName;
      } // End if 2
    } // End if 1
    return definitionName;
  } // End getDefinitionName

  // Computes and stores the landmarksAndGroups part of the narration for the given element, previous element and platform.
  computeLandmarksAndGroups(element: HTMLElement, prevElement: HTMLElement, platform: string) {
    if (prevElement == null) {
      this.computedParts.landmarksAndGroups = '';
      return;
    }
    const landmarksAndGroups = this.getEnteredLandmarksAndGroups(element, prevElement, platform);
    this.computedParts.landmarksAndGroups = landmarksAndGroups.join(SRNC.LANDMARKS_AND_GROUPS_SEPARATOR);
  } // End computeLandmarksAndGroups

  // Computes and stores the usage part of the narration for the given definitionName, element and platform.
  computeUsage(definitionName: string, element: HTMLElement, platform: string) {
    this.computedParts.usage = '';
    const usages = SRNC.usageStrings[platform][definitionName];
    if (usages) {
      // Begin if 1
      this.computedParts.usage = usages['[default]'] || '';

      // Find the usage which matches the element's state
      for (const usageName in usages) {
        // Begin for 1
        const [stateName, stateValue] = usageName.split('=');
        const stateNameAndValueMatch = element.getAttribute(stateName) === stateValue;

        // Handle the special case of the "checked" state name where we are looking for the DOM property instead of the state attribute
        const checkedDOMPropAndValueMatch =
          stateName === 'checked' && (element as HTMLInputElement).checked.toString() === stateValue;
        this.computedParts.usage =
          stateNameAndValueMatch || checkedDOMPropAndValueMatch ? usages[usageName] : this.computedParts.usage;
      } // End for 1
    } // End if 1
  } // End computeUsage

  // Computes and stores the accessible description part of the narration for the given definitionName, element and platform.
  computeDescription(definitionName: string, element: HTMLElement, platform: string) {
    // First, handle some special case conditions
    let value;
    if (definitionName === 'textarea') {
      // Begin if 1
      value = (element as HTMLTextAreaElement).value.trim();
    } // End if 1
    if (definitionName === 'textarea' && platform === 'Win/JAWS' && value) {
      // Begin if 1
      this.computedParts.description = SRNC.stateStrings['Win/JAWS']['textarea']['[containsText]'];
    } else {
      // Else if 1
      this.computedParts.description =
        (element as IAriaElement).ariaDescribedByElements
          ?.map((descElement: HTMLElement) => {
            return descElement.textContent;
          })
          .join(SRNC.DESCBY_AND_LABBY_SEPARATOR) || '';
    } // End if 1
  } // End computeDescription

  // Computes and stores the accessible name and title parts of the narration for the given element using the given computed node.
  computeNameAndTitle(node: any, element: HTMLElement) {
    this.computedParts.name = node.name;

    // If the title attribute is present, set its value as the description part of the narration if it was not computed as accessible name and if no accessible description was computed before
    if (element.title && this.computedParts.name !== element.title && !this.computedParts.description) {
      // Begin if 1
      this.computedParts.description = element.title;
    } // End if 1
  } // End computeNameAndTitle

  // Computes the value part of the narration using the given computed node.
  computeValue(node: any) {
    this.computedParts.value = node.valueText;
  } // End computeValue

  // Returns just "[X of Y]" because the real computation of the position in set would be too difficult.
  // We can set the position part for all elements regardless of the definition name because whether it will eventually be included in the final narration will be determined by the reading order rule
  computePosition() {
    this.computedParts.position = '[X of Y]';
  } // End computePosition

  // Computes the type and state parts of the narration for the given definitionName, element and platform using the given computed node.
  computeTypeAndState(node: any, definitionName: string, element: HTMLElement, platform: string) {
    // Set the default ttype and state for unknown roles and element types
    this.computedParts.type = `[${node.role}]`;
    this.computedParts.state = '';

    // Find the rule with the state combination that matches the states present on the element
    const rules = SRNC.stateRules[platform][definitionName];
    if (rules) {
      // Begin if 1
      for (let i = 0; i < rules.length; i++) {
        // Begin for 1
        const rule = rules[i];
        const possibleStates = SRNC.possibleStates[definitionName];
        const skipRule = possibleStates.some((possibleState: string) => {
          // Begin some 1
          const stateValue = element.getAttribute(possibleState);

          // A state is considred not to be present on the element if it is null, or is false but is included in the "falseMeansOmitted" list. But let's define it the other way around so that there is not too much negations
          const elementHasState =
            stateValue !== null && (stateValue !== 'false' || !SRNC.falseMeansOmitted.includes(possibleState));

          // Handle the special case of the "checked" state where we are not looking for an attribute but a DOM property
          const elementHasCheckedProp =
            possibleState === 'checked' && (element as HTMLInputElement).checked !== undefined;

          const elementHasStateOrCheckedProp = elementHasState || elementHasCheckedProp;
          const combinationHasState = rule.combination.includes(possibleState);

          // Check if the presence of the state on the element matches its presence in the combination list. If not, continue with the next rule
          if (elementHasStateOrCheckedProp !== combinationHasState) {
            // Begin if 2
            return true;
          } // End if 2
          return false;
        }); // End some 1

        if (skipRule) {
          continue;
        }

        // We have found the matching rule, retrieve and store the element's type
        this.computedParts.type = rule.elementType;

        // Compute and store the element's state
        // But first, prepare some variables
        const computedStateArr: string[] = [];
        const stateStrings = SRNC.stateStrings[platform][definitionName];

        // If there is just one or no state in the combination list, the order does not have to be specified, an therefore the combination can be used as the order. But if the order is specified explicitly, use that order
        const order = rule.combination.length <= 1 && !rule.order ? rule.combination : rule.order;

        // Determine the state narration for each state in the order list by looking if corresponding state and its value exist in the state strings definitions
        order.forEach((stateName: string) => {
          // Begin forEach 1}
          let stateValue;
          if (stateName === 'checked') {
            // Begin if 2
            // Handle the special case of the "checked" state name where we are looking for the DOM property value instead of the state attribute value
            stateValue = (element as HTMLInputElement).checked;
          } else {
            // Else if 2
            // Get the state attribute value. If the attribute is not present, consider it as if it had "false" value
            stateValue = element.getAttribute(stateName) || 'false';
          } // End if 2

          // Determine the state string by using "<stateName>=<stateValue>" as the definition key. If such key does not exist, try using "<stateName>=" as the key. Therefore, "<stateName>=" key will match the given stateName and any not defined stateValue
          const partialState = stateStrings[`${stateName}=${stateValue}`] || stateStrings[`${stateName}=`];
          if (partialState) {
            // Begin if 2
            computedStateArr.push(partialState);
          } // End if 2
        }); // End forEach 1
        this.computedParts.state = computedStateArr.join(SRNC.STATES_SEPARATOR);
        break;
      } // End for 1
    } // End if 1
  } // End computeTypeAndState

  // Composes and returns the complete screen reader narration according to the values of all the internally stored computed parts in the correct order and based on the given definition name and platform.
  composeNarrationFromParts(definitionName: string, platform: string): string {
    const readingOrder = SRNC.readingOrder[platform][definitionName];
    const computedNarrationArr = [];
    for (let i = 0; i < readingOrder.length; i++) {
      // Begin for 1
      const partName = readingOrder[i];
      const partValue = this.computedParts[partName];
      if (partValue) {
        // Begin if 1
        computedNarrationArr.push(partValue);
      } // End if 1
    } // End for 1
    const computedNarration = computedNarrationArr.join(SRNC.PARTS_SEPARATOR);
    return computedNarration;
  } // End composeNarrationFromParts
} // End NarrationComputer
