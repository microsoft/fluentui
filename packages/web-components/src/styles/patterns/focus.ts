import { cssPartial } from '@microsoft/fast-element';
import { focusStrokeOuter, focusStrokeWidth, strokeWidth } from '../../design-tokens';

/** @public */
export const insetFocusTreatment = cssPartial`
  outline: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
  outline-offset: calc(${focusStrokeWidth} * -1px);
`;

/** @public */
export const offsetFocusTreatment = cssPartial`
  outline: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
  outline-offset: calc(${strokeWidth} * 1px);
`;
