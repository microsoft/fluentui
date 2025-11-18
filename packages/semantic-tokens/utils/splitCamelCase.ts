export function splitCamelCase(name: string) {
  return (
    name
      // Handle acronym-to-word boundaries: "CSSButton" -> "CSS-Button"
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      // Insert dash between lowercase/number and uppercase: "btnPrimary2D" -> "btn-Primary2-D"
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Insert dash between letter and number: "Token2XL" -> "Token-2XL"
      .replace(/([A-Za-z])([0-9])/g, '$1-$2')
      // Insert dash between number and letter: "H2OLevel" -> "H-2-OLevel"
      .replace(/([0-9])([A-Za-z])/g, '$1-$2')
      .toLowerCase()
  );
}
