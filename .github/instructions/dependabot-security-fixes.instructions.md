---
applyTo: 'yarn.lock,**/package.json,.github/workflows/**/*.yml'
---

# Dependabot Security Fixes Instructions

This instruction guide explains how Dependabot automation works for security fixes in the Fluent UI monorepo and provides procedures for handling security vulnerabilities.

## Overview

Dependabot is configured to automatically create pull requests for:

1. **Security updates** - Advisory-driven npm pull requests created independently for each update
2. **npm dependencies** - Weekly minor and patch version updates created as individual pull requests
3. **GitHub Actions** - Weekly updates for workflow dependencies

## Configuration

The Dependabot configuration is defined in `.github/dependabot.yml`:

- **npm dependencies**: Weekly minor and patch version updates as individual pull requests
- **GitHub Actions**: Weekly updates
- **Security updates**: Individual pull requests not limited by the version update schedule
- **Rollups**: Maintainers can use `/dependabot-rollup` to combine at most 11 eligible non-major updates

The repository's Advanced Security **Grouped security updates** setting must remain disabled. Dependabot does not support a maximum dependency count for automatic groups, so enabling that setting would bypass the 11-update rollup limit.

The npm `open-pull-requests-limit` controls the number of scheduled version-update pull requests. It does not limit the number of dependencies in a pull request or change Dependabot's separate security-update pull request limit.

## Security Vulnerability Resolution

### Automatic Security Updates

GitHub triggers automatic security updates independently of the configured version update schedule. Each npm security update remains a separate pull request. Major security remediations are never included in `/dependabot-rollup`, so compatibility work stays isolated for focused review.

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
