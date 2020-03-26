const beachball = {
  groups: [
    {
      name: 'fluent ui react',
      include: ['packages/office-ui-fabric-react', 'packages/react'],
      disallowedChangeTypes: ['major'],
    },
  ],
  changelog: {
    renderPackageChangelog: require('./renderPackageChangelog'),
  },
};

module.exports = beachball;
