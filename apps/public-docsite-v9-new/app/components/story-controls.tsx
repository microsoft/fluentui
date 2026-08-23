import { useMemo, useState } from 'react';

/** A Storybook `argTypes` entry, in the forms this corpus actually uses. */
interface ArgType {
  control?: string | { type?: string; options?: unknown[] } | false;
  options?: unknown[];
  defaultValue?: unknown;
  description?: string;
  name?: string;
  table?: { disable?: boolean };
  type?: { name?: string; value?: unknown };
}

export type ArgTypes = Record<string, ArgType>;
export type Args = Record<string, unknown>;

function controlKind(argType: ArgType): string | null {
  const { control } = argType;

  if (control === false) {
    return null;
  }

  if (typeof control === 'string') {
    return control;
  }

  if (control && typeof control === 'object') {
    return control.type ?? null;
  }

  // No explicit control: infer from the declared type, as Storybook does.
  if (argType.type?.name === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(argType.options)) {
    return 'select';
  }

  return null;
}

function optionsOf(argType: ArgType): unknown[] {
  if (Array.isArray(argType.options)) {
    return argType.options;
  }

  if (argType.control && typeof argType.control === 'object' && Array.isArray(argType.control.options)) {
    return argType.control.options;
  }

  return [];
}

/**
 * Builds the controllable set for a story.
 *
 * Merges the component's `argTypes` with the story's own, which win, and drops anything the
 * author hid from the table or gave no control — mirroring how Storybook decides what appears.
 */
export function resolveControls(metaArgTypes: ArgTypes = {}, storyArgTypes: ArgTypes = {}) {
  const merged: ArgTypes = { ...metaArgTypes, ...storyArgTypes };

  return Object.entries(merged).filter(([, argType]) => {
    if (argType.table?.disable) {
      return false;
    }

    return controlKind(argType) !== null;
  });
}

export function initialArgs(controls: Array<[string, ArgType]>, storyArgs: Args = {}): Args {
  const args: Args = {};

  for (const [name, argType] of controls) {
    args[name] = storyArgs[name] ?? argType.defaultValue;
  }

  return { ...args, ...storyArgs };
}

export interface StoryControlsProps {
  controls: Array<[string, ArgType]>;
  args: Args;
  onChange: (args: Args) => void;
  /** Used to keep input ids unique when several examples share a page. */
  idPrefix: string;
}

/**
 * Lets a reader vary an example's props (`docsite/component-page`).
 *
 * Only rendered for stories that declare `argTypes`; the rest of the corpus is composition
 * examples with nothing to vary.
 */
export function StoryControls({ controls, args, onChange, idPrefix }: StoryControlsProps) {
  if (controls.length === 0) {
    return null;
  }

  const set = (name: string, value: unknown) => onChange({ ...args, [name]: value });

  return (
    <div className="my-3 rounded-lg border p-4">
      <p className="mb-2 text-sm font-medium">Props</p>
      <div className="grid gap-3">
        {controls.map(([name, argType]) => {
          const kind = controlKind(argType);
          const id = `${idPrefix}-${name}`;
          const value = args[name];

          return (
            <div key={name} className="grid gap-1 text-sm">
              <label htmlFor={id} className="font-mono">
                {name}
              </label>
              {kind === 'boolean' ? (
                <input
                  id={id}
                  type="checkbox"
                  className="justify-self-start"
                  checked={Boolean(value)}
                  onChange={event => set(name, event.currentTarget.checked)}
                />
              ) : kind === 'select' || kind === 'radio' || kind === 'inline-radio' ? (
                <select
                  id={id}
                  className="rounded-md border px-2 py-1"
                  value={String(value ?? '')}
                  onChange={event => set(name, event.currentTarget.value)}
                >
                  <option value="">(unset)</option>
                  {optionsOf(argType)
                    /*
                     * Some stories offer object-valued options (Avatar's `badge` takes a props
                     * object). A select can only carry a string, and `String(value)` renders
                     * "[object Object]", so those are left to the story's own default.
                     */
                    .filter(option => option === null || typeof option !== 'object')
                    .map(option => (
                      <option key={String(option)} value={String(option)}>
                        {String(option)}
                      </option>
                    ))}
                </select>
              ) : kind === 'number' ? (
                <input
                  id={id}
                  type="number"
                  className="rounded-md border px-2 py-1"
                  value={value === undefined ? '' : Number(value)}
                  onChange={event => set(name, event.currentTarget.valueAsNumber)}
                />
              ) : (
                <input
                  id={id}
                  type="text"
                  className="rounded-md border px-2 py-1"
                  value={value === undefined ? '' : String(value)}
                  onChange={event => set(name, event.currentTarget.value)}
                />
              )}
              {argType.description ? <p className="opacity-70">{argType.description}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Holds the reader's edits for one example. */
export function useStoryArgs(controls: Array<[string, ArgType]>, storyArgs: Args = {}) {
  const initial = useMemo(() => initialArgs(controls, storyArgs), [controls, storyArgs]);
  const [args, setArgs] = useState<Args>(initial);

  return { args, setArgs };
}
