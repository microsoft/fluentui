import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const inputItems = [
  { header: 'Louis Vuitton' },
  { header: 'Coco Chanel' },
  { header: 'Napoleon Bonaparte' },
  { header: 'Zinedine Zidane' },
  { header: `Jeanne d'Arc` },
  { header: 'Honoré de Balzac' },
  { header: 'Louis XIV' },
  { header: 'Brigitte Bardot' },
  { header: 'Marion Cotillard' },
].map(item => ({
  ...item,
  icon: <CloseIcon aria-label={`Éliminer ${item.header} de la sélection.`} />,
}));

const DropdownExampleSearchMultipleFrenchLanguage = () => (
  <Dropdown
    multiple
    search
    items={inputItems}
    placeholder="Commencez à taper un nom"
    getA11yStatusMessage={getA11yStatusMessage}
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="N'avons trouvé aucun résultat."
  />
);

const getA11yStatusMessage = ({ isOpen, itemToString, previousResultCount, resultCount, selectedItem }) => {
  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : '';
  }
  if (!resultCount) {
    return `Aucun résultat trouvé.`;
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} résultat${
      resultCount === 1 ? ' est disponible' : 's sont disponibles'
    }, touches fléchées ascendante et descendante pour naviguer. Appuyez sur la touche Entrée pour sélectionner. Appuyez sur les touches fléchées gauche et droite pour parcourir les options sélectionnées.`;
  }
  return '';
};

const getA11ySelectionMessage = {
  onAdd: item => `${item.header} a été choisi.`,
  onRemove: item => `${item.header} a été éliminé.`,
};

export default DropdownExampleSearchMultipleFrenchLanguage;
