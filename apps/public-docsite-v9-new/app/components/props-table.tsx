import docgen from '../generated/docgen.json';

interface DocgenProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
}

interface DocgenComponent {
  displayName: string;
  description: string;
  hasSlots: boolean;
  nativeElements: string[] | null;
  props: DocgenProp[];
}

type DocgenEntry = DocgenComponent & { subcomponents: DocgenComponent[] };

const manifest = docgen as unknown as Record<string, DocgenEntry | undefined>;

function PropRows({ props }: { props: DocgenProp[] }) {
  return (
    <div tabIndex={0} role="region" aria-label="Properties" className="my-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Required</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(prop => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
              </td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>{prop.required ? 'Yes' : 'No'}</td>
              <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : null}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NativeElements({ elements }: { elements: string[] }) {
  return (
    <>
      {elements.map((element, index) => (
        <span key={element}>
          <code>{`<${element}>`}</code>
          {index < elements.length - 1 ? ', ' : ' '}
        </span>
      ))}
      {elements.length > 1 ? 'elements' : 'element'}
    </>
  );
}

/**
 * Discloses slot and native-property support (`docsite/component-page`).
 *
 * Both flags are computed once, when the manifest is built, so the rendered page and the
 * machine-readable output cannot disagree about a component's props.
 */
export function ApiDisclosures({ of }: { of: string }) {
  const entry = manifest[of];

  if (!entry) {
    return null;
  }

  if (!entry.hasSlots && !entry.nativeElements) {
    return null;
  }

  return (
    <div className="my-4 grid gap-3">
      {entry.nativeElements ? (
        <aside className="rounded-lg border p-4 text-sm">
          <p className="font-medium">Native props are supported</p>
          <p className="mt-1">
            All native props of the <NativeElements elements={entry.nativeElements} /> are supported and forwarded to
            the root element.
          </p>
        </aside>
      ) : null}
      {entry.hasSlots ? (
        <aside className="rounded-lg border p-4 text-sm">
          <p className="font-medium">Customizing components with slots</p>
          <p className="mt-1">
            Props typed <code>Slot</code> accept a string, a JSX element, or a props object, letting you replace or
            configure the rendered element.
          </p>
        </aside>
      ) : null}
    </div>
  );
}

/**
 * Renders the properties table for a component and its sub-components, from the
 * build-time docgen manifest (design D6).
 */
export function PropsTable({ of }: { of: string }) {
  const entry = manifest[of];

  if (!entry) {
    return (
      <p role="alert">
        No generated API data for <code>{of}</code>. Run the <code>docgen</code> target.
      </p>
    );
  }

  return (
    <>
      {entry.props.length > 0 ? <PropRows props={entry.props} /> : null}
      {entry.subcomponents.map(subcomponent => (
        <section key={subcomponent.displayName}>
          <h3>{subcomponent.displayName}</h3>
          {subcomponent.description ? <p>{subcomponent.description}</p> : null}
          <PropRows props={subcomponent.props} />
        </section>
      ))}
    </>
  );
}
