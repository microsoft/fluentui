/*
 TODO:
* Add the missing and not so obvious attributes (e.g. "aria-haspopup" or "aria-expanded") for the already defined roles (e.g. "menuitem" or "checkbox") according to the specification.
* With JAWS, in the case of the element with the "listbox" role, differentiate between having and not having the aria-multiselectable="true" attribute. If this attribute is present, then aria-selected="false" on the child elements with the role "option" behave differently than if it is not present. Specifically, if aria-multiselectable="true" is present, the aria-selected="false" causes the narration of "not selected", but if present, having the aria-selected attribute makes no difference to the narration. 
 * Should we also detect the "disabled" state?
 */
import SRMC from './SRMC-Definitions';
import './SRMC-Rules-Win_JAWS';

export default class MessageComputer {
  private computedParts: Record<string, string> = {
    value: '',
    name: '',
    description: '',
    type: '',
    state: '',
    position: '',
    usage: '',
  };

  // Asynchronously computes and returns the complete screen reader narration for the given element and platform.
  async computeMessage(element: Element, platform: string): Promise<string> {
    let definitionName = this.getDefinitionName(element, platform, 'stateRules');

    // Retrieve the computed accessible node
    const node = await (window as any).getComputedAccessibleNode(element);

    // Compute and save all the narration parts
    this.computeUsage(definitionName, element, platform);
    this.computeDescription(definitionName, element, platform);
    this.computeNameAndTitle(node, element);
    this.computeValue(node);
    this.computePosition(definitionName);
    this.computeTypeAndState(node, definitionName, element, platform);

    definitionName = this.getDefinitionName(element, platform, 'readingOrder');
    const computedMessage = this.composeMessageFromParts(definitionName, platform);
    return computedMessage;
  } // End computeMessage

  // Returns the definition name based on the given DOM element, platform and definition type.
  getDefinitionName(element: Element, platform: string, definitionType: string): string {
    // Determine the definitions source by the definition type
    let definitions;
    if (definitionType === 'readingOrder') {
      // Begin if 1
      definitions = SRMC.readingOrder[platform];
    } else if (definitionType === 'stateRules') {
      // else if 1
      definitions = SRMC.stateRules[platform];
    } // End if 1

    // Determine the definition name
    let definitionName = '[default]';
    const role = element.getAttribute('role');
    let testName = 'role=' + role;
    let definition = definitions[testName];
    if (role && definition) {
      // Begin if 1
      // The definition name is determined by the "role" attribute and the definition exists
      if (typeof definition === 'string') {
        // Begin if 2
        // The definition is a reference to another definition
        definitionName = definition;
      } else {
        // else if 2
        // The definition is a regular definition (not a reference to another definition)
        definitionName = testName;
      } // End if 2
    } else {
      // Else if 1
      // The definition name is determined by the element's tag name
      testName = element.tagName.toLowerCase();

      // In the case of the <input> element, the definition name is further determined by the element's "type" attribute
      if (testName === 'input') {
        // Begin if 2
        testName += ':' + element.getAttribute('type');
      } // End if 2
      definition = definitions[testName];
      if (definition) {
        // Begin if 2
        // The definition exists
        if (typeof definition === 'string') {
          // Begin if 3
          // The definition is a reference to another definition
          definitionName = definition;
        } else {
          // else if 3
          // The definition is a regular definition (not a reference to another definition)
          definitionName = testName;
        } // End if 3
      } // End if 2
    } // End if 1
    return definitionName;
  } // End getDefinitionName

  // Computes and saves the usage part of the narration for the given definitionName, element and platform.
  computeUsage(definitionName: string, element: Element, platform: string) {
    this.computedParts.usage = '';
    const usages = SRMC.usageStrings[platform][definitionName];
    if (usages) {
      // Begin if 1
      this.computedParts.usage = usages['[default]'] || '';
      for (let usageName in usages) {
        // Begin for 1
        const [state, stateValue] = usageName.split('=');
        const stateAndValueMatch = element.getAttribute(state) === stateValue;
        const checkedDOMPropAndValueMatch =
          state === 'checked' && (element as HTMLInputElement).checked.toString() === stateValue;
        this.computedParts.usage =
          stateAndValueMatch || checkedDOMPropAndValueMatch ? usages[usageName] : this.computedParts.usage;
      } // End for 1
    } // End if 1
  } // End computeUsage

  // Computes and saves the accessible description part of the narration for the given definitionName, element and platform.
  computeDescription(definitionName: string, element: Element, platform: string) {
    // First, handle some special case conditions
    let value;
    if (definitionName === 'textarea') {
      // Begin if 1
      value = (element as HTMLTextAreaElement).value.trim();
    } // End if 1
    if (definitionName === 'textarea' && platform === 'Win/JAWS' && value) {
      // Begin if 1
      this.computedParts.description = SRMC.stateStrings['Win/JAWS']['textarea']['[extra1]'];
    } else {
      // else if 1
      this.computedParts.description =
        element
          .getAttribute('aria-describedby')
          ?.split(/\s+/)
          .map(x => {
            return element.ownerDocument?.getElementById(x)?.textContent || null;
          })
          .filter(x => x !== null)
          .join('') || '';
    } // End if 1
  } // End computeDescription

  // Computes and saves the accessible name and title parts of the narration for the given element using the given computed node.
  computeNameAndTitle(node: any, element: Element) {
    this.computedParts.name = node.name;

    // If the title attribute is present, set its value as accessible description if it was not computed as accessible name and if no accessible description was computed before
    let title = element.getAttribute('title');
    if (title && this.computedParts.name !== title && !this.computedParts.description) {
      // Begin if 1
      this.computedParts.description = title;
    } // End if 1
  } //End computeNameAndTitle

  // Computes the value part of the narration for the given element.
  computeValue(node: any) {
    this.computedParts.value = node.valueText;
  } //End computeValue

  // Computes the position part of the narration for the given definitionName.
  computePosition(definitionName: string) {
    // The computation of the position in set would be too difficult, so use just "X of Y" instead
    const positionRoles = ['role=menuitem', 'role=menuitemcheckbox', 'role=menuitemradio', 'role=tab', 'role=option'];
    this.computedParts.position = positionRoles.includes(definitionName) ? '[X of Y]' : '';
  } // End computePosition

  // Computes the type and state parts of the narration for the given definitionName, element and platform using the given computed node.
  computeTypeAndState(node: any, definitionName: string, element: Element, platform: string) {
    // Set the default ttype and state for unknown roles and element types
    this.computedParts.type = `[${node.role}]`;
    this.computedParts.state = '';

    // Find the rule which matches the states that are present on the element
    const rules = SRMC.stateRules[platform][definitionName];
    if (rules) {
      // Begin if 1
      rulesLoop: for (let i = 0; i < rules.length; i++) {
        // Begin for 1
        const rule = rules[i];
        const possibleStates = SRMC.possibleStates[definitionName];
        for (let j = 0; j < possibleStates.length; j++) {
          // Begin for 2
          const possibleState = possibleStates[j];
          const stateValue = element.getAttribute(possibleState);

          // A state is considred not to be present on the element if it is null, or is false but is included in the "falseMeansOmitted" list
          const elementHasState =
            stateValue !== null && (stateValue !== 'false' || !SRMC.falseMeansOmitted.includes(possibleState));
          const elementHasCheckedProp = (element as HTMLInputElement).checked !== undefined;
          const elementHasStateOrCheckedProp = elementHasState || elementHasCheckedProp;
          const combinationHasState = rule.combination.includes(possibleState);
          if (elementHasStateOrCheckedProp !== combinationHasState) {
            // Begin if 2
            continue rulesLoop;
          } //End if 2
        } // End for 2

        // We have found the matching rule, retrieve and save the element's type
        this.computedParts.type = rule.elementType;

        // Compute and save the element's state
        const computedStateArr = [];
        let order;
        if (rule.combination.length <= 1 && !rule.order) {
          // Begin if 2
          order = rule.combination;
        } else {
          // else if 2
          order = rule.order;
        } // End if 2
        for (let j = 0; j < order.length; j++) {
          // Begin for 2
          const state = order[j];
          let stateValue;
          if (state === 'checked') {
            // Begin if 2
            stateValue = (element as HTMLInputElement).checked;
          } else {
            // else if 2
            stateValue = element.getAttribute(state) || 'false';
          } // End if 2
          const strings = SRMC.stateStrings[platform][definitionName];
          const statePart = strings[state + '=' + stateValue] || strings[state + '='];
          if (statePart) {
            // Begin if 2
            computedStateArr.push(statePart);
          } // End if 2
        } // End for 2
        this.computedParts.state = computedStateArr.join(SRMC.STATE_PART_SEPARATOR);
        break;
      } // End for 1
    } // End if 1
  } // End computeTypeAndState

  // Composes and returns the complete screen reader narration according to the values of all the computed parts in the correct order and based on the given definition name and platform.
  composeMessageFromParts(definitionName: string, platform: string): string {
    const readingOrder = SRMC.readingOrder[platform][definitionName];
    const computedMessageArr = [];
    for (let i = 0; i < readingOrder.length; i++) {
      // Begin for 1
      const partName = readingOrder[i];
      const partValue = this.computedParts[partName];
      if (partValue) {
        // Begin if 1
        computedMessageArr.push(partValue);
      } // End if 1
    } // End for 1
    const computedMessage = computedMessageArr.join(SRMC.PART_SEPARATOR);
    return computedMessage;
  } // End composeMessageFromParts
} // End MessageComputer
