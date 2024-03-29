import { useState } from 'react';
import * as Styled from './styles';
import * as StyledButton from '../Button/styles';

export type ImageUploadProps = {
  handleImageUpload: (
    file: File | null,
  ) => Promise<{ id: number; url: string } | null>;
  handleAfterImageUpload: (file: number | null, url: string | null) => void;
};

export const ImageUpload = ({
  handleImageUpload,
  handleAfterImageUpload,
}: ImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [savingImage, setSavingImage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingImage(true);
    const { id, url } = await handleImageUpload(selectedFile);
    if (id) {
      handleAfterImageUpload(id, url);
    } else {
      handleAfterImageUpload(null, null);
    }
    setSavingImage(false);
  };

  return (
    <Styled.Wrapper>
      <Styled.Input type="file" onChange={handleFileChange} />
      <StyledButton.Button
        onClick={handleUploadClick}
        color="primary"
        disabled={savingImage}
      >
        {savingImage ? 'Sending...' : 'Send Image'}
      </StyledButton.Button>
    </Styled.Wrapper>
  );
};
