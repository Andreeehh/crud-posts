import { ComboBox } from 'components/ComboBox';

export type HtmlTagsComboBoxProps = {
  onSelectTag: (selectedOption: string) => void;
};

export const HtmlTagsComboBox = ({ onSelectTag }: HtmlTagsComboBoxProps) => {
  const tags = [
    'title',
    'paragraph',
    'link',
    'image',
    'bold',
    'italic',
    'list',
  ];

  const handleTagSelection = (selectedTag) => {
    onSelectTag(selectedTag);
  };

  return (
    <ComboBox
      label="Insert html tag"
      name="tags"
      options={tags}
      errorMessage=""
      onSelectOption={handleTagSelection}
    />
  );
};
