import { FluentDesignSystemProvider } from '../design-system-provider';
import ListboxTemplate from './fixtures/base.html';
import { FluentListbox } from './';

FluentListbox;
FluentDesignSystemProvider;

export default {
  title: 'Listbox',
};

export const Listbox = (): string => ListboxTemplate;
