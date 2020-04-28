import { UseKnobOptions } from '@fluentui/docs-components';
import { ThemePrepared } from '@fluentui/react-northstar';
import { FluentComponentInfo, ComponentProp } from '@fluentui/react-docgen';

// !!!!!!!!!!
// Keep in sync with scripts/docs/types.ts!
// !!!!!!!!!!
export type ExampleSource = {
  js: string;
  ts: string;
};

/**
 * Component menu item shown in the site sidebar.
 * An array of menu items is saved in `componentMenu.json`.
 */
// !!!!!!!!!!
// Keep in sync with scripts/docs/types.ts!
// !!!!!!!!!!
export type ComponentMenuItem = {
  displayName: string;
  type: string;
};

export type KnobGeneratorOptions = {
  propName?: string;
  propDef: ComponentProp;
  componentInfo: FluentComponentInfo;
  theme: ThemePrepared;
};
export type KnobDefinition = UseKnobOptions<any> & { hook: Function };

export type KnobGenerator<T> = (options: KnobGeneratorOptions) => KnobDefinition;

export type KnobComponentGenerators<P> = Partial<Record<keyof P, KnobGenerator<any>>>;
