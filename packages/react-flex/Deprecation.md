# Flex

## Deprecation

There were several discussions about Flex and the concerns of performance/bundle size vs the benefits we get from a component like it. The conclusion we came to is:

- Any implementation we come up with will always be an extra layer with regards to performance and bundle size, compared to just using makeStyles directly.
- There's little benefit to usability given that the user needs to learn how to use the component API regardless. If they already have CSS knowledge, then no learning is required.
- Users are limited to the functionality/property support we end up implementing, forcing them to override in edge cases.

As such, it was decided to drop this component going forward. To ease migrating, below are resources to help you migrate to other solutions.

## Migration Guide

You will find below a migration guide for both Fabric's Stack component and Northstar's Flex component. For each property provided, there's a counterpart `make-styles` implementation along with the resulting CSS for comparison.
Please keep in mind that the property migration assume the `Default State` styles are already being applied as each component property overrides or adds 1 or more CSS properties.
