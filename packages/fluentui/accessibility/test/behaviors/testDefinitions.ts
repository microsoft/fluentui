import { FocusZoneDirection, FocusZoneTabbableElements, keyboardKey, SpacebarKey } from '@fluentui/accessibility';

import { TestDefinition, TestMethod, TestHelper } from './testHelper';

export const definitions: TestDefinition[] = [];
const testHelper = new TestHelper();

const keysAndAliases = {
  ...keyboardKey,
  Spacebar: SpacebarKey,
};

// Example:  Adds attribute 'aria-pressed=true' based on the property 'active'
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' based on the property '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, propertyDependingOn] = parameters.props;
    const property = {};
    property[propertyDependingOn] = attributeExpectedValue;

    const expectedResult = parameters.behavior(property).attributes!.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );
  },
});

// Example:  Adds role='listbox'.
definitions.push({
  regexp: /Adds role='(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded] = [...parameters.props];
    const property = {};
    const expectedResult = parameters.behavior(property).attributes.root['role'];
    expect(expectedResult).toEqual(roleToBeAdded);
  },
});

// Example:  Adds role 'menuitem' to 'anchor' slot
definitions.push({
  regexp: /Adds role '(\w+)' to '([\w-]+)' slot/g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded, elementWhereToBeAdded] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded]['role'];
    expect(expectedResult).toEqual(roleToBeAdded);
  },
});

// Example: Adds attribute 'tabIndex=0' to 'anchor' slot.
//          Adds attribute 'data-is-focusable=true' to 'anchor' slot.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\-d]+)' to '([\w-]+)' slot\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, elementWhereToBeAdded] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );
  },
});

// Example: Adds attribute 'aria-expanded=true' based on the property 'menuOpen' if the component has 'menu' property to 'anchor' slot.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' based on the property '([\w-]+)' if the component has '([\w-]+)' property to '([\w-]+)' slot\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      attributeExpectedValue,
      propertyBasedOn,
      propertyDependingOn,
      elementWhereToBeAdded,
    ] = parameters.props;
    const property = {};
    property[propertyDependingOn] = [{}, {}];
    property[propertyBasedOn] = true;
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][attributeToBeAdded];
    expect(expectedResult).toEqual(testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue));

    // when property depending on is undefined, then there should not be 'aria' attribute added
    const propertyDependingOnValue = undefined;
    property[propertyDependingOn] = propertyDependingOnValue;
    const expectedResultDependingPropertyUndefined = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ];
    expect(expectedResultDependingPropertyUndefined).toEqual(propertyDependingOnValue);

    // when property based on is undefined, then there should 'aria' attribute get false value
    property[propertyDependingOn] = [{}, {}];
    property[propertyBasedOn] = undefined;
    const expectedResultBasedOnPropertyUndefined = parameters.behavior(property).attributes[elementWhereToBeAdded][
      attributeToBeAdded
    ];
    expect(expectedResultBasedOnPropertyUndefined).toEqual(false);
  },
});

// Example: Adds attribute 'aria-expanded=true' based on the property 'active' to 'button' slot.
//          Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' slot.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=*([\w-]*)' based on the property '([\w-]+)' to '([\w-]+)' slot\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attibuteValue, propertyDependingOn, elementWhereToBeAdded] = parameters.props;
    const property = {};
    const propertyDependingOnValue = attibuteValue || 'value of property';
    property[propertyDependingOn] = propertyDependingOnValue;
    const expectedResult = parameters.behavior(property).attributes[elementWhereToBeAdded][attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(propertyDependingOnValue),
    );
  },
});

// Example: Adds attribute 'aria-selected=true' to 'anchor' slot based on the property 'active'. This can be overriden by directly providing 'aria-selected' property to the component.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' slot based on the property '([\w-]+)'\. This can be overriden by providing '[\w-]+' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      valueOfAttributeToBeAdded,
      component,
      propertyBasedOn,
      overridingProperty,
    ] = parameters.props;
    const propertyWithOverride = { [overridingProperty]: valueOfAttributeToBeAdded };
    const propertyWithoutOverride = { [propertyBasedOn]: valueOfAttributeToBeAdded };

    const expectedResultPropOveride = parameters.behavior(propertyWithOverride).attributes[component][
      attributeToBeAdded
    ];
    const expectedResultPropBasedOn = parameters.behavior(propertyWithoutOverride).attributes[component][
      attributeToBeAdded
    ];

    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultPropOveride)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    );
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultPropBasedOn)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    );
  },
});

// Example: Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' based on the property '([\w-]+)'\. This can be overriden by providing '[\w-]+' property directly to the component\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, overridingProperty] = parameters.props;
    const propertyWithOverride = {};
    propertyWithOverride[overridingProperty] = valueOfAttributeToBeAdded;
    const expectedResultAttributeDefined = parameters.behavior(propertyWithOverride).attributes.root[
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    );
  },
});

function testMethodConditionallyAddAttribute(
  parameters,
  component,
  propertyDependsOn,
  valueOfProperty,
  valueOfPropertyOtherwise,
  attributeToBeAdded,
  valueOfAttributeToBeAddedIfTrue,
  valueOfAttributeToBeAddedOtherwise,
) {
  const propertyWithAriaSelected = {};
  propertyWithAriaSelected[propertyDependsOn] = valueOfPropertyOtherwise;
  const expectedResultAttributeNotDefined = parameters.behavior(propertyWithAriaSelected).attributes[component][
    attributeToBeAdded
  ];
  expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeNotDefined)).toEqual(
    testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAddedOtherwise),
  );

  propertyWithAriaSelected[propertyDependsOn] = valueOfProperty;
  const expectedResultAttributeDefined = parameters.behavior(propertyWithAriaSelected).attributes[component][
    attributeToBeAdded
  ];
  expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(
    testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAddedIfTrue),
  );
}

// Example: Adds attribute 'aria-disabled=true' to 'trigger' slot if 'disabled' property is true. Does not set the attribute otherwise.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d-]+)' to '([\w-]+)' slot if '([\w-]+)' property is true\. Does not set the attribute otherwise\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, propertyDependsOn] = parameters.props;

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      true,
      undefined,
      attributeToBeAdded,
      valueOfAttributeToBeAdded,
      undefined,
    );
  },
});

// Example: Adds attribute 'aria-disabled=true' to 'trigger' slot if 'disabled' property is false or undefined. Does not set the attribute if true.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d-]+)' to '([\w-]+)' slot if '([\w-]+)' property is false or undefined\. Does not set the attribute if true\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, component, propertyDependsOn] = parameters.props;

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      undefined,
      true,
      attributeToBeAdded,
      valueOfAttributeToBeAdded,
      undefined,
    );
  },
});

// Example: Adds attribute 'aria-disabled=true' to 'trigger' slot if 'disabled' property is true. Sets the attribute to 'false' otherwise.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' slot if '([\w-]+)' property is true\. Sets the attribute to '([\w\d-]+)' otherwise\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      component,
      propertyDependsOn,
      valueOfAttributeToBeAddedOtherwise,
    ] = parameters.props;

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      true,
      undefined,
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      valueOfAttributeToBeAddedOtherwise,
    );
  },
});

// Adds attribute 'aria-haspopup=true' to 'root' slot if 'menu' property is set.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' slot if '([\w-]+)' property is set\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      component,
      propertyDependsOn,
      valueOfAttributeToBeAddedOtherwise,
    ] = parameters.props;

    testMethodConditionallyAddAttribute(
      parameters,
      component,
      propertyDependsOn,
      'custom-value',
      undefined,
      attributeToBeAdded,
      valueOfAttributeToBeAddedIfTrue,
      valueOfAttributeToBeAddedOtherwise,
    );
  },
});

// Adds attribute 'aria-haspopup=true' to 'trigger' slot if 'contextMenu' property is not set.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' to '([\w-]+)' slot if '([\w-]+)' property is not set\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, valueOfAttributeToBeAdded, slot, propertyDependsOn] = parameters.props;

    const propertyDependsOnUndefined = {};
    const expectedResultAttributeNotDefined = parameters.behavior(propertyDependsOnUndefined).attributes[slot][
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeNotDefined)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    );

    const propertyDependsOnFalse = {
      [propertyDependsOn]: false,
    };
    const expectedResultAttributeDefinedFalse = parameters.behavior(propertyDependsOnFalse).attributes[slot][
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefinedFalse)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(valueOfAttributeToBeAdded),
    );

    const propertyDependsOnExists = {
      [propertyDependsOn]: true,
    };
    const expectedResultAttributeDefined = parameters.behavior(propertyDependsOnExists).attributes[slot][
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAttributeDefined)).toEqual(undefined);
  },
});

// Example: Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)', if there is no '([\w-]+)' property provided\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, propertyDependingOn] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );

    const dependingOnProperty = { [propertyDependingOn]: 'mockText' };
    const expectedResultForPropertyDependingOn = parameters.behavior(dependingOnProperty).attributes.root[
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultForPropertyDependingOn)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(undefined),
    );
  },
});

// Example:  Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property false or undefined. Does not set anything if true.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' based on the property '(\w+)' if the component has '(\w+)' property false or undefined. Does not set anything if true\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      attributeExpectedValue,
      propertyDependingOnFirst,
      propertyDependingOnSecond,
    ] = parameters.props;

    const property = {};

    property[propertyDependingOnFirst] = attributeExpectedValue;
    property[propertyDependingOnSecond] = false;
    const actualResultIfFalse = parameters.behavior(property).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResultIfFalse)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );

    property[propertyDependingOnSecond] = undefined;
    const actualResultIfUndefined = parameters.behavior(property).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResultIfUndefined)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );

    const propertyFirstPropUndefined = {};
    propertyFirstPropUndefined[propertyDependingOnSecond] = true;
    const actualResultFirstPropertyNegateUndefined = parameters.behavior(propertyFirstPropUndefined).attributes.root[
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResultFirstPropertyNegateUndefined)).toEqual(undefined);
  },
});

// Example:  Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=(\w+)' based on the property '(\w+)' if the component has '(\w+)' property\./g,
  testMethod: (parameters: TestMethod) => {
    const [
      attributeToBeAdded,
      attributeExpectedValue,
      propertyDependingOnFirst,
      propertyDependingOnSecond,
    ] = parameters.props;

    const property = {};

    property[propertyDependingOnFirst] = attributeExpectedValue;
    property[propertyDependingOnSecond] = true;
    const actualResult = parameters.behavior(property).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResult)).toEqual(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );

    if (typeof testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue) === 'boolean') {
      const propertyFirstPropNegate = {};
      propertyFirstPropNegate[propertyDependingOnFirst] = !testHelper.convertToMatchingTypeIfApplicable(
        attributeExpectedValue,
      );
      propertyFirstPropNegate[propertyDependingOnSecond] = true;
      const actualResultFirstPropertyNegate = parameters.behavior(propertyFirstPropNegate).attributes.root[
        attributeToBeAdded
      ];
      expect(testHelper.convertToMatchingTypeIfApplicable(actualResultFirstPropertyNegate)).toEqual(
        !testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
      );
    }

    const propertyFirstPropUndefined = {};
    propertyFirstPropUndefined[propertyDependingOnFirst] = true;
    propertyFirstPropUndefined[propertyDependingOnSecond] = undefined;
    const actualResultFirstPropertyNegateUndefined = parameters.behavior(propertyFirstPropUndefined).attributes.root[
      attributeToBeAdded
    ];
    expect(testHelper.convertToMatchingTypeIfApplicable(actualResultFirstPropertyNegateUndefined)).toEqual(undefined);
  },
});

// Example: Adds role='button' if element type is other than 'button'.
definitions.push({
  regexp: /Adds role='(\w+)' if element type is other than '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [roleToBeAdded, as] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).attributes.root.role;
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(roleToBeAdded),
    );

    const propertyAsButton = { as };
    const expectedResultAsButton = parameters.behavior(propertyAsButton).attributes.root.role;
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAsButton)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(undefined),
    );
  },
});

// Example: Adds attribute 'tabIndex=0' if element type is other than 'button'.
definitions.push({
  regexp: /Adds attribute '([\w-]+)=([\w\d]+)' if element type is other than '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [attributeToBeAdded, attributeExpectedValue, as] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResult)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(attributeExpectedValue),
    );

    const propertyAsButton = { as };
    const expectedResultAsButton = parameters.behavior(propertyAsButton).attributes.root[attributeToBeAdded];
    expect(testHelper.convertToMatchingTypeIfApplicable(expectedResultAsButton)).toBe(
      testHelper.convertToMatchingTypeIfApplicable(undefined),
    );
  },
});

// Example: Applies 'gridRowBehavior' for 'row' child component.
definitions.push({
  regexp: /Applies '(\w+)' for '(\w+)' child component\./g,
  testMethod: (parameters: TestMethod) => {
    const [behaviorToBeUsed, childComponent] = parameters.props;
    const property = {};
    const expectedResult = parameters.behavior(property).childBehaviors[childComponent];
    expect(expectedResult.name).toBe(behaviorToBeUsed);
  },
});

/*
 * ********************** FOCUS ZONE **********************
 */
definitions.push({
  regexp: /arrow key navigation in horizontal direction/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.direction).toBe(FocusZoneDirection.horizontal);
  },
});

definitions.push({
  regexp: /arrow key navigation in vertical direction/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.direction).toBe(FocusZoneDirection.vertical);
  },
});

definitions.push({
  regexp: /arrow key navigation in bidirectional direction/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.direction).toBe(FocusZoneDirection.bidirectional);
  },
});

definitions.push({
  regexp: /arrow key navigation in bidirectionalDomOrder direction/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.direction).toBe(FocusZoneDirection.bidirectionalDomOrder);
  },
});

definitions.push({
  regexp: /Keyboard navigation is circular/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZone = parameters.behavior({}).focusZone;
    expect(actualFocusZone.props.isCircularNavigation).toBe(true);
  },
});

// for e.g If 'vertical' prop is used, provides keyboard navigation in vertical direction.
definitions.push({
  regexp: /.'vertical' prop is used.*vertical direction/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneVertical = parameters.behavior({ vertical: true }).focusZone;
    expect(actualFocusZoneVertical.props.direction).toBe(FocusZoneDirection.vertical);
  },
});

definitions.push({
  regexp: /Focused active element of the component is reset when TAB from the component/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.shouldResetActiveElementWhenTabFromZone).toBe(true);
  },
});

definitions.push({
  regexp: /Focus is set initially on the specified default tabbable element/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.defaultTabbableElement).toBeTruthy();
  },
});

definitions.push({
  regexp: /Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.shouldEnterInnerZone).toBeTruthy();
  },
});

definitions.push({
  regexp: /Does not handle PageDown and PageUp/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.pagingSupportDisabled).toBeTruthy();
  },
});

definitions.push({
  regexp: /Focus is moved within the focusable children of the component using TAB key/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.handleTabKey).toBe(FocusZoneTabbableElements.all);
  },
});

definitions.push({
  regexp: /Component will get focus when mounted/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.shouldFocusOnMount).toBe(true);
  },
});

// for e.g. When component's container element receives focus, focus will be set to the default focusable child element of the component.
definitions.push({
  regexp: /.container element receives focus.*focus .*set .*default focusable child element/g,
  testMethod: (parameters: TestMethod) => {
    const actualFocusZoneHorizontal = parameters.behavior({}).focusZone;
    expect(actualFocusZoneHorizontal.props.shouldFocusInnerElementWhenReceivedFocus).toBe(true);
  },
});

// Triggers 'click' action with 'Enter' or 'Spacebar' on 'root'.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\S+)' or '(\S+)' on '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, firstKey, secondKey, elementToPerformAction] = [...parameters.props];
    const property = {};
    const expectedFirstKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    const expectedSecondKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][action]
      .keyCombinations[1].keyCode;
    expect(expectedFirstKeyNumber).toBe(keysAndAliases[firstKey]);
    expect(expectedSecondKeyNumber).toBe(keysAndAliases[secondKey]);
  },
});

// Triggers 'closeAllMenus' action with 'Escape' on 'root'.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\S+)' on '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const property = {};
    const expectedKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumber).toBe(keysAndAliases[key]);
  },
});

// Triggers 'close' action with 'Escape' on 'trigger' if 'open' property is true.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\S+)' on '(\w+)' if '(\w+)' property is true./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction, propertyDependingOn] = [...parameters.props];
    const propsInOpenState = {};
    propsInOpenState[propertyDependingOn] = true;

    const expectedResultOpenState = parameters.behavior(propsInOpenState).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedResultOpenState).toBe(keysAndAliases[key]);

    const propsInCloseState = {};
    propsInCloseState[propertyDependingOn] = false;
    const expectedResultCloseState = parameters.behavior(propsInCloseState).keyActions[elementToPerformAction][action];
    expect(expectedResultCloseState).toBe(undefined);
  },
});

// Triggers 'unsetRowTabbable' action using 'shiftKey' + 'Tab' key on 'root'.
definitions.push({
  regexp: /Triggers '(\w+)' action using '(\w+)' \+ '(\w+)' key on '(\w+)'\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, keyModifier, key, elementToPerformAction] = [...parameters.props];
    const property = {};
    const keyCombinations = parameters.behavior(property).keyActions[elementToPerformAction][action].keyCombinations[0];

    expect(keyCombinations.keyCode).toBe(keysAndAliases[key]);
    expect(keyCombinations[keyModifier]).toBe(true);
  },
});

// Triggers 'openMenu' action with 'ArrowDown' on 'root', when orientaton is horizontal.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is horizontal\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const property = {};
    const expectedKeyNumber = parameters.behavior(property).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumber).toBe(keysAndAliases[key]);
  },
});

// Triggers 'openMenu' action with 'ArrowRight' on 'root', when orientation is vertical.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is vertical\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyVertical = { vertical: true };
    const expectedKeyNumberVertical = parameters.behavior(propertyVertical).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumberVertical).toBe(keysAndAliases[key]);
  },
});

// Triggers the 'openMenu' action with 'ArrowDown' on 'root', when orientaton is horizontal.
definitions.push({
  regexp: /Triggers the '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is horizontal\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyHorizontal = { horizontal: true };
    const expectedKeyNumber = parameters.behavior(propertyHorizontal).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumber).toBe(keysAndAliases[key]);
  },
});

// Triggers the 'openMenu' action with 'ArrowRight' on 'root', when orientation is vertical.
definitions.push({
  regexp: /Triggers the '(\w+)' action with '(\w+)' on '([\w-]+)', when orientation is vertical\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyHorizontal = { horizontal: false };
    const expectedKeyNumberVertical = parameters.behavior(propertyHorizontal).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumberVertical).toBe(keysAndAliases[key]);
  },
});

// Triggers 'receiveFocus' action with 'ArrowLeft' on 'root', when has an opened subtree.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when has an opened subtree\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyOpenedSubtree = {
      open: true,
      expanded: true,
      hasItems: true,
      siblings: [],
      hasSubtree: true,
    };
    const expectedKeyNumberVertical = parameters.behavior(propertyOpenedSubtree).keyActions[elementToPerformAction][
      action
    ].keyCombinations[0].keyCode;
    expect(expectedKeyNumberVertical).toBe(keysAndAliases[key]);
  },
});

// Triggers 'focusParent' action with 'ArrowLeft' on 'root', when has no subtree.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when has no subtree\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyNoSubtree = {
      hasItems: false,
      hasSubtree: false,
    };
    const expectedKeyNumberVertical = parameters.behavior(propertyNoSubtree).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumberVertical).toBe(keysAndAliases[key]);
  },
});

// Triggers 'expand' action with 'ArrowRight' on 'root', when has a closed subtree.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when has a closed subtree\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertyClosedSubtree = { open: false, expanded: false, hasSubtree: true };
    const expectedKeyNumberVertical = parameters.behavior(propertyClosedSubtree).keyActions[elementToPerformAction][
      action
    ].keyCombinations[0].keyCode;
    expect(expectedKeyNumberVertical).toBe(keysAndAliases[key]);
  },
});

// Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper', when toolbar button has submenu and it is opened.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' on '([\w-]+)', when toolbar button has submenu and it is opened\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, key, elementToPerformAction] = [...parameters.props];
    const propertySubmenuOpened = { menu: { items: [] }, hasMenu: true, menuOpen: true };
    const expectedKeyNumber = parameters.behavior(propertySubmenuOpened).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    expect(expectedKeyNumber).toBe(keysAndAliases[key]);

    // when menuOpen == "false"
    propertySubmenuOpened.menuOpen = false;
    const expectedKeyCombinations = parameters.behavior(propertySubmenuOpened).keyActions[elementToPerformAction][
      action
    ].keyCombinations;
    expect(expectedKeyCombinations).toBe(null);
  },
});

// Triggers 'doNotNavigateNextParentItem' action with 'ArrowLeft' or 'ArrowRight' on 'wrapper', when toolbar button has submenu and it is opened.
definitions.push({
  regexp: /Triggers '(\w+)' action with '(\w+)' or '(\w+)' on '([\w-]+)', when toolbar button has submenu and it is opened\./g,
  testMethod: (parameters: TestMethod) => {
    const [action, firstKey, secondKey, elementToPerformAction] = [...parameters.props];
    const propertySubmenuOpened = { menu: { items: [] }, hasMenu: true, menuOpen: true };
    const expectedFirstKeyNumber = parameters.behavior(propertySubmenuOpened).keyActions[elementToPerformAction][action]
      .keyCombinations[0].keyCode;
    const expectedSecondKeyNumber = parameters.behavior(propertySubmenuOpened).keyActions[elementToPerformAction][
      action
    ].keyCombinations[1].keyCode;
    expect(expectedFirstKeyNumber).toBe(keysAndAliases[firstKey]);
    expect(expectedSecondKeyNumber).toBe(keysAndAliases[secondKey]);

    // when menuOpen == "false"
    propertySubmenuOpened.menuOpen = false;
    const expectedKeyCombinations = parameters.behavior(propertySubmenuOpened).keyActions[elementToPerformAction][
      action
    ].keyCombinations;
    expect(expectedKeyCombinations).toBe(null);
  },
});

// Implements roving tabIndex
definitions.push({
  regexp: /Implements roving tabIndex\./g,
  testMethod: (parameters: TestMethod) => {
    const propertyChecked = { checked: true };
    const propertyNotChecked = { checked: false };
    expect(parameters.behavior(propertyChecked).attributes.root.tabIndex).toBe(0);
    expect(parameters.behavior(propertyNotChecked).attributes.root.tabIndex).toBe(-1);
  },
});
