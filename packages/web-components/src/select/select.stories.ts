import { FluentDesignSystemProvider } from '../design-system-provider';
import SelectTemplate from './fixtures/base.html';
import { FluentSelect } from './';

FluentSelect;
FluentDesignSystemProvider;

export default {
  title: 'Select',
};

export const Select = (): string => SelectTemplate;
