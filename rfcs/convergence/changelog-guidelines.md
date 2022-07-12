# Changelog (beachball changefile) guidelines

## Summary

This RFC proposes a set of guidelines when creating changefiles during a PR. These changefiles are directly translated
(in most cases) to our changelog which is important for users to see what changed between releases of Fluent. Therefore
this RFC proposes the following requirements for the changelog:

- Changes that do not affect published code should not be in the changelog
- Clear labels for change types
- The detail of changes should be descriptive first and short second
- Messages should be written for changes specific to the package, not the PR

The changefiles also directly influence how packages are bumped and released in the release pipeline.

## Problem statement

The current v9 changelog contains (or contained before removal) the following bad patterns that should not be in the changelog:

### Changelog entries that do not affect published code

Changes such as:

- stories are updated
- dev dependencies are updated
- tests were added/updated
- scripts were modified

Should not be included in the changelog. Generally when these kinds of changes are in the changelog they should be
removed as soon as they are noticed.

It's also important that these kinds of change entries **should not bump upstream packages**. By bumping upstream
packages, we create new releases along the whole chain of dependencies where in fact nothing has actually changed
for partners. Even in the context of lockstep versioning these kinds of changes should not result in version bumps.

### Changelog entries that are focused on the PR

Quite often, a PR will address/fix an issue that spans several packages. While it's good practice to keep PRs as
small as possible, it is still possible that multiple packages need to be modified. This can also be acceptable when
an internal API is modified in a non-breaking way, but several consumers need to be updated at the same time.

It is very easy to write a single changefile message during PR creating and apply it to all the changed packages in
the PR. This makes the change harder to understand since the contents might only apply vaguely, or not at all to the package.

A simple example would be `Fix dependencies`, this kind of generic description can be applied to a PR when linked to
an issue, but has an incredibly vague meaning with applied to the changelog of a package.

## Detailed design or proposal

### Semantic labels for changefile entries

Each changefile entry should have a message that has a semantic label that is inspired by [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
This RFC proposes five labels in the following form:

```
feat:  This label communicates that a feature was added to the package
fix:   This label communicates that a fix was applied to the package
chore: This label communicates that changes which should not have an affect on the user were applied
docs:  This label communicates that documentation was changed
BREAKING CHANGE: This label communicates that a breaking change was applied to the package
```

We can configure [danger.js](https://danger.systems/js/) to validate changefile entries in the PR that a correct
label has been applied.

### Stricter reviews for changefile comments

There is no easy way to automate the quality of a changelog entry, this has to be done by humans in the PR review.
This proposal tries to spread awareness that changefile entries are directly a part of our changelog and they should
be reviewed strictly.

### Stricter review of `type` and `dependentChangeType`

Here is a sample beachball changefile:

```json
{
  "type": "patch",
  "comment": "[label]: This comment is the message used in the changelog entry",
  "packageName": "@fluentui/babel-make-styles",
  "email": "jane.doe@contoso.com",
  "dependentChangeType": "patch"
}
```

The value of `type` determines what kind of version bump will be applied to the package on release. It can take the
following values:

- none
- prerelease
- patch
- minor
- major

These values are identical to standard semver bumps, and will result in bumps of that type being applied to the package
on release. Beachball will always pick the highest bump type among all changefiles for a package when bumping. A value
of `none` will result in no bumps applied to the package. The `comment` will not be applied to the changelog when `none`
is used for `type`.

The value of `dependentChangeType` is the same as `type`. However, this bump affects upstream packages that depend on the
package that the changefile references. Each upstream package will also have an added changelog entry which resembles

> Bump @fluentui/react-aria to v9.0.0-beta.4 ([PR #20762](https://github.com/microsoft/fluentui/pull/20762) by beachball)

These kinds of 'bump' changelog entries are omitted from `react-components` when rolled up into the final changelog.

It could be possible to automatically enforce incorrect values for `type` and `dependentType` to some extent by
watching for changes in `api.md` file, automation cannot cover all cases such as:

- Changing internal logic that does not affect API
- Updating scripts instead of published code
- Updating stories and story utility code
- Updating tests and test utility code

In this case we should also be aware that in PRs, the values of these properties in the changefile matter and directly
influences what happens during release.

## Pros and Cons

### Pros

- Changelogs are an extra resource for partners during upgrades
- Easy to see what changed between versions during uprgades
- Keep implementation details out of public changelog

### Cons

- Hard to enforce
- It's more of a culture change
- Need to review changefiles with more effort
