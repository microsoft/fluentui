/*
TODO:
* Add the missing and not so obvious attributes (e.g. "aria-haspopup" or "aria-expanded") for the already defined roles (e.g. "menuitem" or "checkbox") according to the specification.
* With JAWS, in the case of the element with the "listbox" role, differentiate between having and not having the aria-multiselectable="true" attribute. If this attribute is present, then aria-selected="false" on the child elements with the role "option" behave differently than if it is not present. Specifically, if aria-multiselectable="true" is present, the aria-selected="false" causes the narration of "not selected", but if present, having the aria-selected attribute makes no difference to the narration. 
* Should we also consider the "disabled" state?
*/
import { SRNC } from './SRNC-Definitions';
import './SRNC-Rules-Win_JAWS';

export class NarrationComputer {
  computedParts: Record<string, string> = {
    value: '',
    name: '',
    description: '',
    type: '',
    state: '',
    position: '',
    usage: '',
  };

  // Computes and returns the complete screen reader narration for the given element and platform.
  async computeNarration(element: Element, platform: string): Promise<string> {
    let definitionName = this.getDefinitionName(element, platform, 'stateRules');

    // Retrieve the computed accessible node
    const node = await (window as any).getComputedAccessibleNode(element);

    // Compute and store all the narration parts
    this.computeUsage(definitionName, element, platform);
    this.computeDescription(definitionName, element, platform);
    this.computeNameAndTitle(node, element);
    this.computeValue(node);
    this.computePosition(definitionName);
    this.computeTypeAndState(node, definitionName, element, platform);

    definitionName = this.getDefinitionName(element, platform, 'readingOrder');
    const computedNarration = this.composeNarrationFromParts(definitionName, platform);
    return computedNarration;
  } // End computeNarration

  // Returns the definition name based on the given element, platform and definition type.
  getDefinitionName(element: Element, platform: string, definitionType: string): string {
    // Determine the definitions source by the definition type
    const definitionTypes: Record<string, any> = {
      readingOrder: SRNC.readingOrder[platform],
      stateRules: SRNC.stateRules[platform],
    };
    const definitions = definitionTypes[definitionType];

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

  // Computes and stores the usage part of the narration for the given definitionName, element and platform.
  computeUsage(definitionName: string, element: Element, platform: string) {
    this.computedParts.usage = '';
    const usages = SRNC.usageStrings[platform][definitionName];
    if (usages) {
      // Begin if 1
      this.computedParts.usage = usages['[default]'] || '';

      // Find the usage which matches the element's state
      for (let usageName in usages) {
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
  computeDescription(definitionName: string, element: Element, platform: string) {
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

  // Computes and stores the accessible name and title parts of the narration for the given element using the given computed node.
  computeNameAndTitle(node: any, element: Element) {
    this.computedParts.name = node.name;

    // If the title attribute is present, set its value as the description part of the narration if it was not computed as accessible name and if no accessible description was computed before
    let title = element.getAttribute('title');
    if (title && this.computedParts.name !== title && !this.computedParts.description) {
      // Begin if 1
      this.computedParts.description = title;
    } // End if 1
  } //End computeNameAndTitle

  // Computes the value part of the narration using the given computed node.
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
          //const possibleState = possibleStates[j];
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
          } //End if 2
          return false;
        }); // End some 1

        if (skipRule) {
          continue;
        }

        // We have found the matching rule, retrieve and store the element's type
        this.computedParts.type = rule.elementType;

        // Compute and store the element's state
        const computedStateArr = [];
        const stateStrings = SRNC.stateStrings[platform][definitionName];
        let order;

        // If there is just one or no state in the combination list, the order does not have to be specified, an therefore the combination can be used as the order. But if the order is specified explicitly, use that order
        if (rule.combination.length <= 1 && !rule.order) {
          // Begin if 2
          order = rule.combination;
        } else {
          // else if 2
          order = rule.order;
        } // End if 2

        // Determine the state narration for each state in the order list by looking if corresponding state and its value exist in the state strings definitions
        for (let j = 0; j < order.length; j++) {
          // Begin for 2
          const stateName = order[j];
          let stateValue;
          if (stateName === 'checked') {
            // Begin if 2
            // Handle the special case of the "checked" state name where we are looking for the DOM property value instead of the state attribute value
            stateValue = (element as HTMLInputElement).checked;
          } else {
            // else if 2
            // Get the state attribute value. If the attribute is not present, consider it as if it had "false" value
            stateValue = element.getAttribute(stateName) || 'false';
          } // End if 2

          // Determine the state string by using "<stateName>=<stateValue>" as the definition key. If such key does not exist, try using "<stateName>=" as the key. Therefore, "<stateName>=" key will match the given stateName and any not defined stateValue
          const partialState = stateStrings[stateName + '=' + stateValue] || stateStrings[stateName + '='];
          if (partialState) {
            // Begin if 2
            computedStateArr.push(partialState);
          } // End if 2
        } // End for 2
        this.computedParts.state = computedStateArr.join(SRNC.STATE_PART_SEPARATOR);
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
    const computedNarration = computedNarrationArr.join(SRNC.PART_SEPARATOR);
    return computedNarration;
  } // End composeNarrationFromParts
} // End NarrationComputer
