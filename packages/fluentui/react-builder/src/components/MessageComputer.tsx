/*
 TODO:
* Add the missing and not so obvious attributes (e.g. "aria-haspopup" or "aria-expanded") for the already defined roles (e.g. "menuitem" or "checkbox") according to the specification.
* With JAWS, in the case of the element with the "listbox" role, differentiate between having and not having the aria-multiselectable="true" attribute. If this attribute is present, then aria-selected="false" on the child elements with the role "option" behave differently than if it is not present. Specifically, if aria-multiselectable="true" is present, the aria-selected="false" causes the narration of "not selected", but if present, having the aria-selected attribute makes no difference to the narration. 
 * What about the "disabled" state?
 */
import SRMC from './SRMC-Definitions';
import './SRMC-Rules-Win_JAWS';

export default class MessageComputer {
  private computedMessageParts: { [key: string]: string } = {
    value: '',
    name: '',
    description: '',
    type: '',
    state: '',
    position: '',
    usage: '',
  };

  // Asynchronously computes and returns the complete screen reader message for the given element and platform.
  async computeMessage(element: HTMLElement, platform: string): Promise<string> {
    let definitionName = this.getDefinitionName(element, platform, 'stateRules');

    // Determine and save the usage string
    this.computedMessageParts.usage = '';
    const usages = SRMC.usageStrings[platform][definitionName];
    if (usages) {
      // Begin if 1
      if (usages['[default]']) {
        // Begin if 2
        this.computedMessageParts.usage = usages['[default]'];
      } // End if 2
      for (let usageName in usages) {
        // Begin for 1
        const split = usageName.split('=');
        const state = split[0];
        const stateValue = split[1];
        const stateAndValueMatch = element.getAttribute(state) === stateValue;
        const checkedDOMpropAndValueMatch =
          state === 'checked' && (element as HTMLInputElement).checked.toString() === stateValue;
        if (stateAndValueMatch || checkedDOMPropAndValueMatch) {
          // Begin if 2
          this.computedMessageParts.usage = usages[usageName];
        } // End if 2
      } // End for 1
    } // End if 1

    // compute the element's accessible description
    let computedDescription = '';

    // First, handle some special case conditions
    let value;
    if (definitionName === 'textarea') {
      // Begin if 1
      value = (element as HTMLTextAreaElement).value.trim();
    } // End if 1
    if (definitionName === 'textarea' && platform === 'Win/JAWS' && value) {
      // Begin if 1
      computedDescription = SRMC.stateStrings['Win/JAWS']['textarea']['[extra1]'];
    } else {
      // else if 1
      const describedby = element.getAttribute('aria-describedby');
      let descElement;
      if (describedby) {
        // Begin if 2
        const computedDescriptionArr = [];
        const describedbyArr = describedby.split(/\s+/);
        for (let i = 0; i < describedbyArr.length; i++) {
          // Begin for 1
          descElement = document.getElementById(describedbyArr[i]);
          if (descElement) {
            // Begin if 3
            computedDescriptionArr.push(descElement.textContent);
          } // End if 3
        } // End for 1
        computedDescription = computedDescriptionArr.join('');
      } // End if 2
    } // End if 1

    // Save the computed accessible description
    this.computedMessageParts.description = computedDescription;

    // Retrieve the computed accessibility properties
    const node = await (window as any).getComputedAccessibleNode(element);

    // Compute and save the element's accessible name
    const computedName = node.name;
    this.computedMessageParts.name = computedName;

    // If present, set the element's title as the accessible description if conditions are met
    let title = element.getAttribute('title');
    if (title && computedName !== title && !this.computedMessageParts.description) {
      // Begin if 1
      this.computedMessageParts.description = title;
    } // End if 1

    // Retrieve the element's value and save it
    this.computedMessageParts.value = node.valueText;

    // Add an unspecified position in set
    const positionRoles = ['role=menuitem', 'role=menuitemcheckbox', 'role=menuitemradio', 'role=tab', 'role=option'];
    if (positionRoles.includes(definitionName)) {
      // Begin if 1
      this.computedMessageParts.position = '[X of Y]';
    } // End if 1

    // Compute the element's type and state
    this.computedMessageParts.type = '[' + node.role + ']';
    this.computedMessageParts.state = '';
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

        // Retrieve and save the element's type
        this.computedMessageParts.type = rule.elementType;

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
        const computedState = computedStateArr.join(SRMC.STATE_PART_SEPARATOR);
        this.computedMessageParts.state = computedState;
        break;
      } // End for 1
    } // End if 1
    definitionName = this.getDefinitionName(element, platform, 'readingOrder');
    const computedMessage = this.composeMessageFromParts(definitionName, platform);
    return computedMessage;
  } // End computeMessage

  // Returns the definition name based on the given DOM element, platform and definition type.
  getDefinitionName(element: HTMLElement, platform: string, definitionType: string): string {
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

  // Composes and returns the complete screen reader message according to the values of all the computed message parts in the correct order and based on the given definition name and platform.
  composeMessageFromParts(definitionName: string, platform: string): string {
    const readingOrder = SRMC.readingOrder[platform][definitionName];
    const computedMessageArr = [];
    for (let i = 0; i < readingOrder.length; i++) {
      // Begin for 1
      const partName = readingOrder[i];
      const partValue = this.computedMessageParts[partName];
      if (partValue) {
        // Begin if 1
        computedMessageArr.push(partValue);
      } // End if 1
    } // End for 1
    const computedMessage = computedMessageArr.join(SRMC.PART_SEPARATOR);
    return computedMessage;
  } // End composeMessageFromParts
} // End MessageComputer
