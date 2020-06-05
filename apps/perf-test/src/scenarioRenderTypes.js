// You don't have to add scenarios to this structure unless
// you want their render types to differ from the default (mount only).

const AllRenderTypes = ['mount', 'rerender'];
const DefaultRenderTypes = ['mount'];

const scenarioRenderTypes = {
  Checkbox: AllRenderTypes,
  CheckboxNext: AllRenderTypes,
  PrimaryButton: AllRenderTypes,
  DefaultButton: AllRenderTypes,
  ButtonNext: AllRenderTypes,
  Link: AllRenderTypes,
  LinkNext: AllRenderTypes,
  Slider: AllRenderTypes,
  SliderNext: AllRenderTypes,
  Pivot: AllRenderTypes,
  PivotNext: AllRenderTypes,
};

module.exports = {
  scenarioRenderTypes,
  DefaultRenderTypes,
};
