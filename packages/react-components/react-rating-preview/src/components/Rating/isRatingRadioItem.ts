import { isHTMLElement } from '@fluentui/react-utilities';

export const isRatingRadioItem = (name: string, target: EventTarget): target is HTMLInputElement =>
  isHTMLElement(target, { constructorName: 'HTMLInputElement' }) && target.type === 'radio' && target.name === name;
