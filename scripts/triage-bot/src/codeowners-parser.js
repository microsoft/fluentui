/**
 *
 * @param {Array<import('./types').FileOwnershipMatcher>} rules
 */
function serialize(rules) {
  return rules
    .map(rule => {
      return [rule.path, rule.owners].join(' ');
    })
    .join('\n');
}

/**
 *
 * @param {string} content
 */
function parse(content) {
  /** @type {Array<import('./types').FileOwnershipMatcher>} */
  const rules = [];

  if (content.length === 0) {
    return rules;
  }

  const rawLines = content.trim().split('\n');

  for (const rawLine of rawLines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    rules.push(createRule(line));
  }

  return rules;
}

/**
 *
 * @param {string} rule
 * @returns {import('./types').FileOwnershipMatcher}
 */
function createRule(rule) {
  const rawParts = rule.split(/\s+/);
  /** @type {string[]} */
  const parts = [];
  for (const part of rawParts) {
    if (part.startsWith('#')) {
      break;
    }
    parts.push(part);
  }

  // The first part is expected to be the path
  const path = parts[0];

  // Rest of parts is expected to be the owners
  const owners = parts.length > 1 ? parts.slice(1, parts.length) : [];

  return { path, owners };
}

exports.serialize = serialize;
exports.parse = parse;
