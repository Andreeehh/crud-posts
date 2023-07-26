import { ComboBox } from 'components/ComboBox';

export type HtmlTagsComboBoxProps = {
  onSelectTag: (selectedOption: string) => void;
};

export const HtmlTagsComboBox = ({ onSelectTag }: HtmlTagsComboBoxProps) => {
  const tags = [
    'título',
    'parágrafo',
    'link',
    'imagem',
    'negrito',
    'itálico',
    'lista',
  ];

  const handleTagSelection = (selectedTag) => {
    onSelectTag(selectedTag);
  };

  return (
    <ComboBox
      label="Selecione uma tag html para inserir no texto"
      name="tags"
      options={tags}
      errorMessage=""
      onSelectOption={handleTagSelection}
    />
  );
};
