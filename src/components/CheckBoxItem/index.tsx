import { Checkbox } from 'components/CheckBox';
import { Metadata } from 'types/Metadata';

export type CheckBoxItemProps = {
  item: Metadata;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
  firstItem: boolean;
};

export const CheckboxItem = ({
  item,
  isChecked,
  onCheckboxChange,
  firstItem,
}: CheckBoxItemProps) => {
  const handleCheckboxChange = (e) => {
    onCheckboxChange(item.id, e);
  };

  return (
    <Checkbox
      key={item.id}
      label={item.attributes.displayName}
      name={item.attributes.displayName}
      checked={isChecked}
      onCheckboxChange={handleCheckboxChange}
      firstItem={firstItem}
    />
  );
};
