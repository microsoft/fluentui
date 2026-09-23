import * as examples from './Examples';
import * as forms from './ExampleFormErrorsMessages';
import { createGuideExample } from '../../components/GuideExample';

export const ActionAvoidBad = createGuideExample(examples.ActionAvoidBad, 'Action: avoid');
export const ActionAvoidGood = createGuideExample(examples.ActionAvoidGood, 'Action: recommended');
export const ComponentTypeAvoidBad = createGuideExample(examples.ComponentTypeAvoidBad, 'Component type: avoid');
export const ComponentTypeAvoidGood = createGuideExample(
  examples.ComponentTypeAvoidGood,
  'Component type: recommended',
);
export const StateAvoidBad = createGuideExample(examples.StateAvoidBad, 'State: avoid');
export const StateAvoidGood = createGuideExample(examples.StateAvoidGood, 'State: recommended');
export const CustomPositionAvoidBad = createGuideExample(examples.CustomPositionAvoidBad, 'Position: avoid');
export const CustomPositionAvoidGood = createGuideExample(examples.CustomPositionAvoidGood, 'Position: recommended');
export const TextRepeatAvoidBad = createGuideExample(examples.TextRepeatAvoidBad, 'Repeated text: avoid');
export const TextRepeatAvoidGood = createGuideExample(examples.TextRepeatAvoidGood, 'Repeated text: recommended');
export const FocusTextAvoidBad = createGuideExample(examples.FocusTextAvoidBad, 'Focus text: avoid');
export const FocusTextAvoidGood = createGuideExample(examples.FocusTextAvoidGood, 'Focus text: recommended');
export const ReuseVisibleTextBad = createGuideExample(examples.ReuseVisibleTextBad, 'Visible text: avoid');
export const ReuseVisibleTextGood = createGuideExample(examples.ReuseVisibleTextGood, 'Visible text: recommended');
export const FormErrorLabelBad = createGuideExample(forms.FormErrorLabelBad, 'Form errors: avoid');
export const FormErrorLabelGood = createGuideExample(forms.FormErrorLabelGood, 'Form errors: recommended');
