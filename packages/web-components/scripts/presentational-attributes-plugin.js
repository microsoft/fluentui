const attributeNamePattern = /^[a-z][a-z0-9._:-]*$/;
const presentationalTagPattern = /^\{([^}]+)\}\s+(\S+)\s+-\s+(.+)$/s;

export function presentationalAttributesPlugin() {
  return {
    name: 'fluent-presentational-attributes',
    analyzePhase({ ts, node, moduleDoc }) {
      if (node.kind !== ts.SyntaxKind.ClassDeclaration || !node.name) {
        return;
      }

      const declaration = moduleDoc.declarations?.find(candidate => candidate.name === node.name.getText());

      if (!declaration) {
        return;
      }

      const tags = node.jsDoc
        ?.flatMap(jsDoc => [...(jsDoc.tags ?? [])])
        .filter(tag => tag.tagName.text === 'presentational')
        .map(tag => parsePresentationalTag(tag.comment));

      if (!tags?.length) {
        return;
      }

      const attributes = (declaration.attributes ??= []);
      const names = new Set();

      for (const tag of tags) {
        const { name, type, description, defaultValue } = tag;

        if (!name || !type || !description) {
          throw new Error(
            `Invalid @presentational tag on ${declaration.name}: name, type, and description are required.`,
          );
        }

        if (!attributeNamePattern.test(name)) {
          throw new Error(`Invalid @presentational attribute name "${name}" on ${declaration.name}.`);
        }

        if (names.has(name)) {
          throw new Error(`Duplicate @presentational attribute "${name}" on ${declaration.name}.`);
        }

        if (attributes.some(attribute => attribute.name === name)) {
          throw new Error(
            `@presentational attribute "${name}" on ${declaration.name} conflicts with an observed attribute.`,
          );
        }

        const resolvedDefault = defaultValue || (type === 'boolean' ? 'false' : undefined);

        if (type === 'boolean' && resolvedDefault !== 'false') {
          throw new Error(`Boolean @presentational attribute "${name}" on ${declaration.name} must default to false.`);
        }

        names.add(name);
        attributes.push({
          name,
          type: { text: type },
          ...(resolvedDefault ? { default: resolvedDefault } : {}),
          description,
        });
      }
    },
  };
}

function parsePresentationalTag(comment) {
  const text =
    typeof comment === 'string'
      ? comment.trim()
      : Array.isArray(comment)
      ? comment
          .map(part => part.text ?? '')
          .join('')
          .trim()
      : '';
  const match = presentationalTagPattern.exec(text);

  if (!match) {
    return {};
  }

  const [, type, authoredName, description] = match;
  const defaultMatch = /^\[([^=\]]+)=([^\]]+)\]$/.exec(authoredName);

  return {
    type,
    name: defaultMatch?.[1] ?? authoredName,
    defaultValue: defaultMatch?.[2],
    description: description.trim(),
  };
}
