---
applyTo: 'yarn.lock,**/package.json,.github/workflows/**/*.yml'
---

# Dependabot Security Fixes Instructions

This instruction guide explains how Dependabot automation works for security fixes in the Fluent UI monorepo and provides procedures for handling security vulnerabilities.

## Overview

Dependabot is configured to automatically create pull requests for:

1. **Security updates** - Advisory-driven minor and patch updates grouped by ecosystem
2. **npm dependencies** - Weekly minor and patch updates grouped by production or development dependency type
3. **GitHub Actions** - Weekly minor and patch version and security update groups

## Configuration

The Dependabot configuration is defined in `.github/dependabot.yml`:

- **npm dependencies**: Weekly minor and patch version updates grouped into production and development pull requests
- **GitHub Actions**: Weekly minor and patch version updates grouped separately from security updates
- **Security updates**: Minor and patch updates are grouped; major remediations are excluded from groups for isolated review
- **Manual rollups**: Maintainers can use `/dependabot-rollup` as a fallback to combine at most 11 eligible non-major updates

The repository's Advanced Security **Grouped security updates** setting must remain disabled. The explicit groups in `.github/dependabot.yml` provide narrower control over update types, while the repository setting would group as many available security updates as possible.

The npm `open-pull-requests-limit` controls the number of scheduled version-update pull requests. It does not limit the number of dependencies in a grouped pull request or change Dependabot's separate security-update pull request limit. Native groups have no dependency-count ceiling; the 11-update ceiling applies only to `/dependabot-rollup`.

## Security Vulnerability Resolution

### Automatic Security Updates

GitHub triggers automatic security updates independently of the configured version update schedule. Dependabot groups only minor and patch security updates under the explicit YAML rules. Major security remediations do not match those groups and are never included in `/dependabot-rollup`, so compatibility work stays isolated for focused review.

### Manual Resolution via Yarn Resolutions

For complex monorepo scenarios where automatic updates fail, security vulnerabilities can be resolved by adding Yarn resolutions to `package.json`:

```json
{
  "resolutions": {
    "vulnerable-package": "^secure-version"
  }
}
```

### Common Security Package Resolutions

The following resolutions are maintained for security purposes:

- `tar-fs`: `^2.1.3` - Fixes directory traversal vulnerability

## Troubleshooting

### If Dependabot Stops Working

1. Check if there are conflicting Yarn resolutions pinning vulnerable versions
2. Verify the `.github/dependabot.yml` configuration is valid
3. Ensure the repository has security updates enabled in GitHub settings
4. Check for failed Dependabot runs in the repository's security tab

### Manual Security Fix Process

1. Run `yarn npm audit --severity ${SEVERITY}` to identify vulnerabilities (where SEVERITY can be: low, moderate, high, critical)
2. Check if Yarn resolutions are blocking updates
3. Update resolutions to secure versions
4. Run `yarn install` to update yarn.lock
5. Verify fixes with `yarn npm audit --severity ${SEVERITY}`
6. Test that builds still work

## Testing Security Fixes

After making changes:

```bash
# Check for remaining vulnerabilities at specified severity level
yarn npm audit --severity ${SEVERITY}

# Verify builds still work
yarn nx run workspace-plugin:build

# Test critical paths
yarn nx run react-components:build
```

## Monitoring

- Security vulnerabilities are tracked in GitHub's security tab
- Dependabot PRs are automatically labeled with `dependencies`
- Failed security updates should be investigated promptly

## Copilot Instructions for Security Fixes

When addressing security vulnerabilities:

1. **Use parametric severity levels**: Always use `${SEVERITY}` variable notation instead of hardcoded severity levels like "high" to allow flexibility in testing different severities
2. **Check transitive dependencies**: Focus on yarn resolutions for transitive dependency vulnerabilities as these are the most common in monorepos
3. **Verify monorepo compatibility**: Ensure security fixes don't break the complex Nx workspace build system
4. **Test thoroughly**: Run both audit commands and build verification after any security resolution changes
