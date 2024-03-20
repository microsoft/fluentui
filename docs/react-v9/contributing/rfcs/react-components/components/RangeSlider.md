# RFC: Add RangeSlider option to existing Slider component

## Summary

We are proposing to do some changes to the props of the existing Slider to expand its functionality. With the new option users will be able to use it as a RangeSlider.

## Background

The Azure Portal team is gradually embracing React for the development of Azure Portal, however there is no React-based UI library internally for Portal. So we decided to use FluentUI for basic UI needs. Whenever we cannot find a good match for an old portal control from existing FluentUI components, we would like to collaborate and contribute back to FluentUI to fill the gap.

## Problem

There is a control called RangeSlider that is used by a couple of Azure extension teams. (https://ms.portal.azure.com/?Microsoft_Azure_Playground=true#blade/Microsoft_Azure_Playground/ControlsIndexBlade/RangeSlider_createSimpleRangeSlider_Playground), which is not supported by current FluentUI. The current Slider component from FluentUI has only one thumb that allows the users to drag and change value. Since this kind of control is generic and no logic is specific to Portal, we propose to add features to the existing FluentUI slider, to make it capable of becoming a RangeSlider. So that the portal teams using RangeSlider will not be blocked when converting to ReactView, and FluentUI Slider component could provide more features.

## Detailed Proposal

Current RangeSlider control in Azure Portal is more complex than the existing fluent Slider component, in that it has markers below the slider bar and textboxes on both sides that allows user input\. To make things simple, the proposal only aims at making the minimum function working. We will focus on adding a thumb to make it a RangeSlider, and not talk about the other functionalities.

### Details

#### 1. Add an optional `ranged` prop to existing Slider

- The prop will be a boolean. Once set to `true`, there will be two thumbs on the slider.
- The user is able to drag any of them. If `showValue` prop is also set to `true`, another value label will show up on the other side of the slider (opposite side of the existing value label) to show the value of the lower value thumb.
- The value of the lower value thumb will always be lower or equal to the upper value thumb.
- When `originFromZero` prop is set to true, the lower value cannot be set larger than 0, and the upper value cannot be set lower than 0

#### 2. Add optional `lowerValue`, `defaultLowerValue` props to existing Slider

- Just like the existing `value` and `defaultValue` props, these two props are mutually exclusive and they represents the value/default value for the lower bound of the slider.
- They will not take effect if `ranged` effect is false
- If none of these two values are provided while `ranged` is set to true, then the lower value of the rangeSlider will default to `min` prop, or 0 if `min` is also not provided

#### 3. Modify type definition for `onChange` and `onChanged` props to reflect range

- If `ranged` is set to false, no changes for the existing API
- If `ranged` is set to true, then the function signature of these two would be come `(value: [number, number]) => void`, `(event: MouseEvent | TouchEvent | KeyboardEvent, value: [number, number]) => void`. The two numbers in the tuple represents the lower value and upper value of the RangeSlider

### Pros and Cons

#### Pros

- Add new functionality additively on top of the Slider component so no existing functionalities are broken
- Possible to reuse a lot of existing logic in order to make minimum change to the code
- Provide new features to the component and make it suitable for more generic cases

#### Cons

- Though not a lot of changes, it still adds more branches to the existing code
- The new props might be unnecessary for people without the need for a RangeSlider

### Work in progress

I have done some work as a POC for the RangeSlider. Here is the branch: https://github.com/microsoft/fluentui/compare/master...rockcs1992:shiche/range-slider?expand=1

And here is screenshot on how it looks like
https://mystuff.bublup.com/ui/landing_page?item_id=001-i-5f2f1a94-4182-4980-9eaf-69101a71519c

## Discarded proposal

- Create a brand new RangeSlider component
- Create a experimental package based on existing Slider component
