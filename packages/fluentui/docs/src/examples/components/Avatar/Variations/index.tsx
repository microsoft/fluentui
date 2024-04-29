import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Image"
      description="An Avatar can show the image of the user."
      examplePath="components/Avatar/Variations/AvatarExampleImage"
    />
    <ComponentExample
      title="Image customizations"
      description="An Avatar can contain icon."
      examplePath="components/Avatar/Variations/AvatarExampleIcon"
    />
    <ComponentExample
      title="Label"
      description="The avatars without image can show label containing the user's initials."
      examplePath="components/Avatar/Variations/AvatarExampleLabel"
    />
    <ComponentExample
      title="Status"
      description="An Avatar can have a status icon showing his status."
      examplePath="components/Avatar/Variations/AvatarExampleStatus"
    />
    <ComponentExample
      title="Name"
      description="An Avatar can have initials shown from the name prop, if no image is provided."
      examplePath="components/Avatar/Variations/AvatarExampleName"
    />
    <ComponentExample
      title="Excluded Initials"
      description="Avatar initials exclude content in parens, braces, and brackets, as well as all middle names."
      examplePath="components/Avatar/Variations/AvatarExampleExcludedInitials"
    />
    <ComponentExample
      title="Get initials"
      description="An Avatar can be provided with custom logic for generating the initials shown in the label."
      examplePath="components/Avatar/Variations/AvatarExampleGetInitials"
    />
    <ComponentExample
      title="Status customization"
      description="The status inside the Avatar can be customize to show different background."
      examplePath="components/Avatar/Variations/AvatarExampleStatusCustomization"
    />
    <ComponentExample
      title="Status Image"
      description="The status inside the Avatar can use an image."
      examplePath="components/Avatar/Variations/AvatarExampleStatusImage"
    />
    <ComponentExample
      title="Size"
      description="An Avatar can have different sizes."
      examplePath="components/Avatar/Variations/AvatarExampleSize"
    />
    <ComponentExample
      title="Square"
      description="An Avatar can have a square shape."
      examplePath="components/Avatar/Variations/AvatarExampleSquare"
    />
  </ExampleSection>
);

export default Variations;
