import { SRNC } from './SRNC-Definitions';
import { register as registerLandmarksJaws } from './SRNC-LandmarksAndGroups-Win_JAWS';
import { register as registerLandmarksJawsVpc } from './SRNC-LandmarksAndGroups-Win_JAWS_VPC';

import { register as registerElementTypesJaws } from './SRNC-ElementTypes-Win_JAWS';
import { register as registerElementTypesJawsVpc } from './SRNC-ElementTypes-Win_JAWS_VPC';

import { register as registerElementStatesJaws } from './SRNC-ElementStates-Win_JAWS';

import { register as registerUsagesJaws } from './SRNC-Usages-Win_JAWS';

import { register as registerStateRulesJaws } from './SRNC-StateRules-Win_JAWS';
import { register as registerStateRulesJawsVpc } from './SRNC-StateRules-Win_JAWS_VPC';

import { register as registerReadingOrderJaws } from './SRNC-ReadingOrder-Win_JAWS';
import { register as registerReadingOrderJawsVpc } from './SRNC-ReadingOrder-Win_JAWS_VPC';

registerLandmarksJaws(SRNC);
registerLandmarksJawsVpc(SRNC);
registerElementTypesJaws(SRNC);
registerElementTypesJawsVpc(SRNC);
registerElementStatesJaws(SRNC);
registerUsagesJaws(SRNC);
registerStateRulesJaws(SRNC);
registerStateRulesJawsVpc(SRNC);
registerReadingOrderJaws(SRNC);
registerReadingOrderJawsVpc(SRNC);

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

export type SRNCPlatform = 'Win/JAWS' | 'Win/JAWS/VPC';

export class NarrationComputer {
  computedParts: Record<string, string> = {
    landmarksAndGroups: undefined,
    name: undefined,
    content: undefined,
    description: undefined,
    type: undefined,
    state: undefined,
    position: undefined,
    level: undefined,
    usage: undefined,
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

  // Computes and returns the screen reader narration for the given element using the previous element and platform.
  async getNarration(element: IAriaElement, prevElement: IAriaElement, platform: SRNCPlatform): Promise<string> {
    // Retrieve the computed accessible node
    const node = await (window as any).getComputedAccessibleNode(element);

    const inheritance = this.getPlatformInheritance(platform);

    // Compute and store all the narration parts
    this.computeLandmarksAndGroups(element, prevElement, inheritance);
    this.computeDescription(element, inheritance);
    this.computeNameContentAndTitle(node, element);
    this.computePositionAndLevel(inheritance);
    this.computeTypeAndState(node, element, inheritance);
    this.computeUsage(element, inheritance);
    const computedNarration = this.composeNarrationFromParts(element, inheritance);
    return computedNarration;
  } // End getNarration

  // Returns ARIA landmarks and groups that would be entered and narrated when focus moves from the given previous element to the given element, for the given platform inheritance list.
  getEnteredLandmarksAndGroups(element: HTMLElement, prevElement: HTMLElement, inheritance: string[]): string[] {
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

      // The "<header>" and "<footer>" elements don't create a landmark if they are a descendant of a sectioning element.
      // Note: According to MDN, they should not create a landmark if they are descendants also of of sectioning roles (e.g. article or main), but using all JAWS, NVDA and VoiceOver they actually do. However, they do only when tabbed into, not when entered with virtual cursor. Therefore, in this code, we don't follow MDN, but follow how screen readers actually behave.
      // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
      if (!parent.role && ['header', 'footer'].includes(parent.tagName.toLowerCase())) {
        // Begin if 1
        const sectionElements = ['article', 'aside', 'main', 'nav', 'section'];
        const sectionRoles = SRNC.hfLandmarkInSectionRole.includes(inheritance[0])
          ? []
          : ['article', 'complementary', 'main', 'navigation', 'region'];
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
        const landmarkOrGroup = [];

        // Test if the parent's role or tag name exists in the landmarks and groups definitions
        let testedName = `role=${parent.role}`;
        let definition = parent.role
          ? this.getDefinitionByKey(testedName, inheritance, 'landmarksAndGroups')
          : undefined;
        if (!parent.role && !definition) {
          // Begin if 2
          testedName = parent.tagName.toLowerCase();
          definition = this.getDefinitionByKey(testedName, inheritance, 'landmarksAndGroups');
        } // End if 2

        // Skip the definition if landmark or group should be ignored
        const ignoredLandmarksAndGroups = this.getDefinition(inheritance, 'ignoredLandmarksAndGroups');
        if (ignoredLandmarksAndGroups && ignoredLandmarksAndGroups.includes(testedName)) {
          // Begin if 2
          definition = undefined;
        } // End if 2

        // If the "aria-label" or "aria-labelledby" attribute exists together with a landmark or group element or role, or if it is the "narrateLabelIfNoRole" exception, add its value to the narration
        // However, don't add its value to the narration if it is an exception that "aria-label" and "aria-labelledby" should be ignored""""
        const ignoreLabel = this.getDefinition(inheritance, 'ignoreLabel');
        if (
          (definition || SRNC.narrateLabelIfNoRole.includes(inheritance[0])) &&
          (!ignoreLabel || !ignoreLabel.includes(testedName))
        ) {
          // Begin if 2
          const label =
            parent.ariaLabelledByElements
              ?.map((labElement: HTMLElement) => {
                return labElement.textContent;
              })
              .join(SRNC.DESCBY_AND_LABBY_SEPARATOR) ||
            parent.ariaLabel ||
            undefined;

          if (label) {
            // Begin if 3
            landmarkOrGroup.push(label);
          } // End if 3
        } // End if 2

        // If the definition exists and it is not an exception that the landmark or group element or role also must have the "aria-label" or "aria-labelledby" attribute to be narrated, add the definition to the narration
        const narrateOnlyWhenLabelled = this.getDefinition(inheritance, 'narrateOnlyWhenLabelled');
        if (
          definition &&
          (landmarkOrGroup.length >= 1 || !narrateOnlyWhenLabelled || !narrateOnlyWhenLabelled.includes(testedName))
        ) {
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
      while (parent2 !== element2.ownerDocument.body) {
        // Begin while 2
        if (parent1 === parent2) {
          // Begin if 1
          return parent1;
        } // End if 1
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

  // Returns the platform inheritance list for the given platform
  getPlatformInheritance(platform: SRNCPlatform): string[] {
    const inheritance = [platform];
    let inheritedPlatform = platform;
    while (SRNC.inheritance[inheritedPlatform]) {
      // Begin while 1
      inheritedPlatform = SRNC.inheritance[inheritedPlatform];
      inheritance.push(inheritedPlatform);
    } // End while 1
    return inheritance;
  } // End getPlatformInheritance

  // Returns the definition based on the given definition key, platform inheritance list and definition type. If the definition doesn't exist, returns undefined.
  getDefinitionByKey(key: string, inheritance: string[], type: string): string {
    const definitions = SRNC[type];

    // Loop through the platform inheratance list to find the platform which has the searched key
    const platform = inheritance.find(testedPlatform => {
      // Begin find 1
      return definitions[testedPlatform] && definitions[testedPlatform][key] !== undefined;
    }); // End find 1
    const definition = definitions[platform] && definitions[platform][key] ? definitions[platform][key] : undefined;
    return definition;
  } // End getDefinitionByKey

  // Returns the definition based on the given platform inheritance list and definition type. If the definition doesn't exist, returns undefined.
  getDefinition(inheritance: string[], type: string): string {
    const definitions = SRNC[type];

    // Loop through the platform inheratance list to find the platform which has the definition
    const platform = inheritance.find(testedPlatform => {
      // Begin find 1
      return definitions[testedPlatform] !== undefined;
    }); // End find 1
    const definition = definitions[platform];
    return definition;
  } // End getDefinition

  // Returns the definition name and (possibly inherited) platform based on the given element, platform inheritance list and definition type. If the definition doesn't exist, returns undefined for both the definition name and platform.
  getDefinitionNameAndPlatform(element: IAriaElement, inheritance: string[], type: string): string[] {
    const definitions = SRNC[type];

    let definitionName = '[default]';
    let platform = inheritance[inheritance.length - 1];
    if (!definitions[platform] || !definitions[platform][definitionName]) {
      // Begin if 1
      definitionName = undefined;
      platform = undefined;
    } // End if 1

    // Loop through the platform inheratance list to find the definition name and (possibly inherited) platform
    inheritance.some(testedPlatform => {
      // Begin some 1
      let testedName = `role=${element.role}`;
      let definition = definitions[testedPlatform] ? definitions[testedPlatform][testedName] : undefined;
      if (definition) {
        // Begin if 1
        // A definition exists for the element role
        // Handle the situation when the definition is a reference to another definition
        definitionName = typeof definition === 'string' ? definition : testedName;
        platform = testedPlatform;
        return true;
      } // End if 1
      testedName = element.tagName.toLowerCase();

      // In the case of the <input> element, the definition name is further determined by the element's "type" attribute
      if (testedName === 'input') {
        // Begin if 2
        testedName += `:${element.type}`;
      } // End if 2
      definition = definitions[testedPlatform] ? definitions[testedPlatform][testedName] : undefined;
      if (definition && !element.role) {
        // Begin if 2
        // A definition exists for the element tag name and element has no role
        // Handle the situation when the definition is a reference to another definition
        definitionName = typeof definition === 'string' ? definition : testedName;
        platform = testedPlatform;
        return true;
      } // End if 2
      return false;
    }); // End some 1
    return [definitionName, platform];
  } // End getDefinitionNameAndPlatform

  // Returns the definition name and (possibly inherited) platform based on the given definition key, platform inheritance list and definition type. If the definition doesn't exist, returns undefined for both the definition name and platform.
  getDefinitionNameAndPlatformByKey(key: string, inheritance: string[], type: string): string[] {
    const definitions = SRNC[type];

    // Loop through the platform inheratance list to find the platform which has the searched key
    const platform = inheritance.find(testedPlatform => {
      // Begin find 1
      return definitions[testedPlatform] && definitions[testedPlatform][key] !== undefined;
    }); // End find 1
    const definition = definitions[platform] && definitions[platform][key] ? definitions[platform][key] : undefined;

    // Handle the situation when the definition is a reference to another definition
    const definitionName = typeof definition === 'string' ? definition : key;

    return [definitionName, platform];
  } // End getDefinitionNameAndPlatformByKey

  // Computes and stores the landmarksAndGroups part of the narration for the given element, previous element and platform inheritance list.
  computeLandmarksAndGroups(element: HTMLElement, prevElement: HTMLElement, inheritance: string[]) {
    if (prevElement == null) {
      this.computedParts.landmarksAndGroups = undefined;
      return;
    }
    const landmarksAndGroups = this.getEnteredLandmarksAndGroups(element, prevElement, inheritance);
    this.computedParts.landmarksAndGroups = landmarksAndGroups.join(SRNC.LANDMARKS_AND_GROUPS_SEPARATOR);
  } // End computeLandmarksAndGroups

  // Computes and stores the usage part of the narration for the given definitionName, element and platform.
  computeUsage(element: HTMLElement, inheritance: string[]) {
    const [definitionName, platform] = this.getDefinitionNameAndPlatform(
      element as IAriaElement,
      inheritance,
      'usages',
    );
    this.computedParts.usage = undefined;

    // On some platforms the usage part is not narrated
    if (SRNC.ignoreUsage.includes(inheritance[0])) {
      // Begin if 1
      return;
    } // End if 1

    const usages = SRNC.usages[platform] ? SRNC.usages[platform][definitionName] : undefined;
    if (usages) {
      // Begin if 1
      this.computedParts.usage = usages['[default]'] || undefined;

      // Find the usage which matches the element's state
      // If there are more matching states, the last usage definition will be used
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

  // Computes and stores the accessible description part of the narration for the given definitionName, element and platform inheritance list.
  computeDescription(element: HTMLElement, inheritance: string[]) {
    this.computedParts.description = undefined;

    // On some platforms the description part is not narrated
    if (SRNC.ignoreDescription.includes(inheritance[0])) {
      // Begin if 1
      return;
    } // End if 1

    // Handle some special cases
    const elementName = element.tagName.toLowerCase();
    if (
      elementName === 'textarea' &&
      SRNC.stringOverridesDescription.includes(inheritance[0]) &&
      (element as HTMLTextAreaElement).value.trim()
    ) {
      // Begin if 1
      this.computedParts.description = this.getDefinition(inheritance, 'containsText');
      return;
    } // End if 1
    this.computedParts.description =
      (element as IAriaElement).ariaDescribedByElements
        ?.map((descElement: HTMLElement) => {
          return descElement.textContent;
        })
        .join(SRNC.DESCBY_AND_LABBY_SEPARATOR) || undefined;
  } // End computeDescription

  // Computes and stores the accessible name, content and title parts of the narration for the given element using the given computed node.
  computeNameContentAndTitle(node: any, element: HTMLElement) {
    this.computedParts.name = node.name;
    this.computedParts.content = node.valueText || element.textContent;

    // If the title attribute is present, set its value as the description part of the narration if it was not computed as accessible name and if no accessible description was computed before
    this.computedParts.description =
      element.title && this.computedParts.name !== element.title && !this.computedParts.description
        ? element.title
        : this.computedParts.description;
  } // End computeNameContentAndTitle

  // Sets the position and level narration parts as constant strings because the real computation of the position in set and level would be too difficult.
  computePositionAndLevel(inheritance: string[]) {
    this.computedParts.position = undefined;
    this.computedParts.level = undefined;

    // On some platforms the position and level parts are not narrated
    if (SRNC.ignorePositionAndLevel.includes(inheritance[0])) {
      // Begin if 1
      return;
    } // End if 1

    // We can set the position and level parts for all elements regardless of the definition name because whether it will eventually be included in the final narration will be determined by the reading order definition
    this.computedParts.position = this.getDefinition(inheritance, 'positions');
    this.computedParts.level = this.getDefinition(inheritance, 'levels');
  } // End computePositionAndLevel

  // Computes the type and state parts of the narration for the given definitionName, element and platform using the given computed node.
  computeTypeAndState(node: any, element: HTMLElement, inheritance: string[]) {
    let [definitionName, platform] = this.getDefinitionNameAndPlatform(
      element as IAriaElement,
      inheritance,
      'stateRules',
    );

    // Set the default ttype and state for unknown roles and element types
    this.computedParts.type = `[${node.role}]`;
    this.computedParts.state = undefined;

    const rules = SRNC.stateRules[platform] ? SRNC.stateRules[platform][definitionName] : undefined;
    if (rules) {
      // Begin if 1
      // If the definition name has no states (i.e. is not a widget, like <h1>), the definition doesn't actually consist of state rules, but is just an object with a reference to the element type
      if (typeof rules === 'object' && rules.constructor === Object) {
        // Begin if 2ė
        this.computedParts.type = this.getDefinitionByKey(rules.elementType, inheritance, 'elementTypes');
        return;
      } // End if 2

      // Find the rule with the state combination that matches the states present on the element
      for (let i = 0; i < rules.length; i++) {
        // Begin for 1
        const rule = rules[i];
        const combination = rule.combination || [];
        const possibleStates = SRNC.possibleStates[definitionName] || [];
        const skipRule = possibleStates.some((possibleState: string) => {
          // Begin some 1
          const stateValue = element.getAttribute(possibleState);

          // A state is considred not to be present on the element if it is null, or is false but is included in the "falseMeansNotPresent" list. But let's define it the other way around so that there is not too much negations
          const elementHasState =
            stateValue !== null && (stateValue !== 'false' || !SRNC.falseMeansNotPresent.includes(possibleState));

          // Handle the special case of the "checked" state where we are not looking for an attribute but a DOM property
          const elementHasCheckedProp =
            possibleState === 'checked' && (element as HTMLInputElement).checked !== undefined;

          const elementHasStateOrCheckedProp = elementHasState || elementHasCheckedProp;
          const combinationHasState = combination.includes(possibleState);

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
        this.computedParts.type = this.getDefinitionByKey(rule.elementType, inheritance, 'elementTypes');

        // Compute and store the element's state
        const computedStateArr: string[] = [];
        [definitionName, platform] = this.getDefinitionNameAndPlatformByKey(
          definitionName,
          inheritance,
          'elementStates',
        );
        if (!definitionName || !platform) {
          // Begin if 1
          // The element states definition doesn't exist, so break and let the state default to undefined.
          // Note: This should never hapen since every state rule should have element states definition
          break;
        } // End if 1
        const elementStates = SRNC.elementStates[platform][definitionName];

        // If there is just one or no state in the combination list, the order does not have to be specified, an therefore the combination can be used as the order. But if the order is specified explicitly, use that order
        const order = combination.length <= 1 && !rule.order ? combination : rule.order;

        // Determine the state narration for each state in the order list by looking if corresponding state and its value exist in the state strings definitions
        order.forEach((stateName: string) => {
          // Begin forEach 1
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
          const partialState = elementStates[`${stateName}=${stateValue}`] || elementStates[`${stateName}=`];
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
  composeNarrationFromParts(element: HTMLElement, inheritance: string[]): string {
    const [definitionName, platform] = this.getDefinitionNameAndPlatform(
      element as IAriaElement,
      inheritance,
      'readingOrder',
    );
    const readingOrder = SRNC.readingOrder[platform][definitionName];
    const computedNarrationArr = [];
    readingOrder.forEach(partName => {
      // Begin forEach 1
      const partValue = this.computedParts[partName];
      if (partValue) {
        // Begin if 1
        computedNarrationArr.push(partValue);
      } // End if 1
    }); // End forEach 1
    const computedNarration = computedNarrationArr.join(SRNC.PARTS_SEPARATOR);
    return computedNarration;
  } // End composeNarrationFromParts
} // End NarrationComputer
