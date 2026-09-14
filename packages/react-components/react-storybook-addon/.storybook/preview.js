import * as rootPreview from '../../../../.storybook/preview';
import { themes } from '../src';

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  fluentThemes: themes.filter(theme => theme.id === 'web-light' || theme.id === 'web-dark'),
};

export const tags = ['autodocs'];
