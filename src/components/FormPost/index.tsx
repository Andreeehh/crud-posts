import * as Styled from './styles';

import React, { useState } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { RadioButton } from '../RadioButton';
import { Label } from '../CheckBox/styles';
import { HtmlContent } from '../HtmlContent';
import { AddButton, PlusIcon } from '../AddButton/styles';
import * as StyledButton from '../Button/styles';
import { HtmlTagsComboBox } from '../HtmlTagsComboBox';
import { CreateStrapiPost } from '../../types/CreateStrapiPost';
import { StrapiPost } from '../../types/StrapiPost';
import { Author } from '../../types/Author';
import { Categories } from '../../types/Categories';
import { Tags } from '../../types/Tags';
import { Cover } from '../Cover';
import { SimpleDialog } from '../SimpleDialog';
import { Authors } from '../../types/Authors';
import { Category } from '../../types/Category';
import { Tag } from '../../types/SingleTag';
import { CheckboxItem } from 'components/CheckBoxItem';
import { randomInt } from 'utils/math-utils';
import { ImageUpload } from 'components/ImageUpload';
import { useSession } from 'next-auth/client';

export type FormPostProps = {
  onSave?: (post: CreateStrapiPost) => Promise<void>;
  onCreateMetadata?: (
    displayName: string,
    type: number,
  ) => Promise<Author | Category | Tag>;
  onCreateNewImage?: (
    file: File | null,
  ) => Promise<{ id: number; url: string } | null>;
  post?: StrapiPost;
  authors: Authors;
  categories: Categories;
  tags: Tags;
};

export const FormPost = ({
  post,
  onSave,
  authors,
  categories,
  tags,
  onCreateMetadata,
  onCreateNewImage,
}: FormPostProps) => {
  const [session] = useSession();
  const { attributes, id = '' } = post || {};
  let title = '';
  let content = '';
  let except = '';
  let authorId = 0;
  let categoriesFromPost: string[] = [];
  let tagsFromPost: string[] = [];
  let coverId = randomInt(10, 369);

  if (attributes) {
    title = attributes.title;
    content = attributes.content;
    except = attributes.except;
    authorId = parseInt(attributes.author.data.id);
    categoriesFromPost = attributes.categories.data.map((cat) => cat.id);
    tagsFromPost = attributes.tags.data.map((tag) => tag.id);
    coverId = parseInt(attributes.cover.data.id);
  }

  const [coverData, setCoverData] = useState(
    attributes
      ? {
          id: attributes.cover.data.id,
          attributes: {
            alternativeText: attributes.cover.data.attributes.alternativeText,
            url: attributes.cover.data.attributes.url,
          },
        }
      : {
          id: '',
          attributes: {
            alternativeText: '',
            url: '',
          },
        },
  );
  const [newTitle, setNewTitle] = useState(attributes ? title : '');
  const [newExcerpt, setNewExcerpt] = useState(attributes ? except : '');
  const [newContent, setNewContent] = useState(
    attributes
      ? content
      : `<h1></h1>
  <p></p>
  <ol>
  <li>Primeiro</li>
  <li>Segundo</li>
  <li>Terceiro</li>
  <li>Quarto</li>
  <li>Quinto</li>
  </ol>
  <a href='https://blog-project-kappa-one.vercel.app/post/'>Post corrected by ChatGPT</a>`,
  );
  const [saving, setSaving] = useState(false);
  const [savingAuthor, setSavingAuthor] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [savingTag, setSavingTag] = useState(false);

  const [categoriesIds, setCategoriesIds] = useState(categoriesFromPost);
  const [tagsIds, setTagsIds] = useState(tagsFromPost);

  const [selectedAuthorValue, setSelectedAuthorValue] = useState(
    authorId.toString(),
  );

  const [isPreview, setIsPreview] = useState(false);
  const [createNewAuthor, setCreateNewAuthor] = useState(false);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [createNewTag, setCreateNewTag] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [excerptErrorMessage, setExcerptErrorMessage] = useState('');
  const [contentErrorMessage, setContentErrorMessage] = useState('');
  const [newTagErrorMessage, setNewTagErrorMessage] = useState('');
  const [newAuthorErrorMessage, setAuthorErrorMessage] = useState('');
  const [newCategoryErrorMessage, setNewCategoryErrorMessage] = useState('');
  const [shouldFocusTitle, setShouldFocusTitle] = useState(false);
  const [shouldFocusExcerpt, setShouldFocusExcerpt] = useState(false);
  const [shouldFocusContent, setShouldFocusContent] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const [selectedImageFileId, setSelectedImageFileId] = useState(null);

  const handleAfterImageUpload = (fileId, coverUrl) => {
    setCoverData((prevCoverData) => {
      if (!prevCoverData) {
        // Se coverData for nulo, inicializa com um objeto padrão
        return {
          id: '',
          attributes: {
            alternativeText: '',
            url: coverUrl,
          },
        };
      }

      // Atualiza apenas a propriedade url mantendo os outros atributos
      return {
        ...prevCoverData,
        attributes: {
          ...prevCoverData.attributes,
          url: coverUrl,
        },
      };
    });
    setSelectedImageFileId(fileId);
  };

  const handleTagSelection = (selectedTag) => {
    setSelectedTag(selectedTag);
  };

  const handleCategoriesIdChange = (categoryId, isChecked) => {
    setErrorMessage('');
    if (isChecked) {
      setCategoriesIds((prevIds) => [...prevIds, categoryId]);
    } else {
      setCategoriesIds((prevIds) => prevIds.filter((id) => id !== categoryId));
    }
  };

  const handleTagsIdChange = (tagId, isChecked) => {
    setErrorMessage('');
    if (isChecked) {
      setTagsIds((prevIds) => [...prevIds, tagId]);
    } else {
      setTagsIds((prevIds) => prevIds.filter((id) => id !== tagId));
    }
  };

  const handleAuthorRadioButtonChange = (value: string) => {
    setErrorMessage('');
    setSelectedAuthorValue(value);
    // Do something with the selected value (e.g., update state or perform an action)
  };

  const handlePreviewClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsPreview((s) => (s = !s));
  };

  const handleAddTagClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (newContent.length > 0) {
      setNewContent(newContent + '\n');
    }
    switch (selectedTag) {
      case 'parágrafo':
        setNewContent(newContent + '<p>Contenti</p>');
        break;
      case 'link':
        setNewContent(newContent + '<a href="">Post corrected by ChatGPT</a>');
        break;
      case 'imagem':
        setNewContent(
          newContent +
            `<figure class="image"><img src="Insira a url da imagem aqui" alt="Insira o alternativeText aqui" ><figcaption>Insira o alternativeText aqui</figcaption></figure>`,
        );
        break;
      case 'negrito':
        setNewContent(
          newContent + '<strong>Insira o conteúdo em negrito aqui</strong>',
        );
        break;
      case 'itálico':
        setNewContent(newContent + '<i>Insira o conteúdo em itálico aqui</i>');
        break;
      case 'lista':
        setNewContent(
          newContent +
            `<ol>\n<li>Primeiro</li>\n<li>Segundo</li>\n<li>Terceiro</li>\n<li>Quarto</li>\n<li>Quinto</li>\n</ol>`,
        );
        break;

      default:
        setNewContent(newContent + '<h1>Insira o conteúdo do Título aqui</h1>');
        break;
    }
    setShouldFocusContent(true);
  };

  const handlePlusAuthorClick = (event: React.FormEvent) => {
    event.preventDefault();
    setCreateNewAuthor((c) => (c = !c));
  };

  const handlePlusCategoryClick = (event: React.FormEvent) => {
    event.preventDefault();
    setCreateNewCategory((c) => (c = !c));
  };

  const handlePlusTagClick = (event: React.FormEvent) => {
    event.preventDefault();
    setCreateNewTag((c) => (c = !c));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let slug = newTitle
      .replace(/ /g, '-')
      .replace(/[^0-9a-zA-Z-]+/g, '')
      .toLowerCase();
    if (slug.length > 50) {
      slug = slug.slice(0, 49);
    }

    const categoriesIdIntArray = categoriesIds.map((str) => parseInt(str, 10));
    const tagsIdIntArray = tagsIds.map((str) => parseInt(str, 10));

    if (newTitle.length === 0) {
      setTitleErrorMessage('Adicione um título');
      setShouldFocusTitle(true);
      return;
    }
    if (newExcerpt.length === 0) {
      setExcerptErrorMessage('Adicione um resumo');
      setShouldFocusExcerpt(true);
      return;
    }
    if (newContent.length === 0) {
      setContentErrorMessage('Adicione um Conteúdo');
      setShouldFocusContent(true);
      return;
    }
    if (parseInt(selectedAuthorValue) === 0) {
      setErrorMessage('Adicione um autor');
      return;
    }
    if (categoriesIdIntArray.length === 0) {
      setErrorMessage('Adicione ao menos uma categoria');
      return;
    }
    if (tagsIdIntArray.length === 0) {
      setErrorMessage('Adicione ao menos uma tag');
      return;
    }

    if (selectedImageFileId) {
      coverId = selectedImageFileId;
    }

    const newPost = {
      id,
      attributes: {
        title: newTitle,
        content: newContent,
        slug,
        except: newExcerpt,
        coverId,
        categoriesId: categoriesIdIntArray,
        tagsId: tagsIdIntArray,
        authorId: parseInt(selectedAuthorValue),
      },
    };

    setSaving(true);

    if (onSave) {
      await onSave(newPost);
    }
    alert('Mudanças salvas');

    setSaving(false);
  };

  const handleSaveAuthor = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newAuthorName.length == 0) {
      setAuthorErrorMessage('Autor vazio');
      return;
    }
    let duplicateAuthor = false;
    authors.data.forEach((author) => {
      if (
        author.attributes.displayName.toLowerCase() ===
        newAuthorName.toLowerCase()
      ) {
        duplicateAuthor = true;
        return;
      }
    });
    if (duplicateAuthor) {
      setAuthorErrorMessage('Autor já existe');
      return;
    }
    setSavingAuthor(true);

    if (onCreateMetadata) {
      const author = await onCreateMetadata(newAuthorName, 1);
      if (author) {
        authors.data.push(author);
      }
    }
    setCreateNewAuthor(false);
    setNewAuthorName('');
    setSavingAuthor(false);
  };

  const handleSaveCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newCategoryName.length == 0) {
      setNewCategoryErrorMessage('Categoria vazia');
      return;
    }
    let duplicateCategory = false;
    categories.data.forEach((cat) => {
      if (
        cat.attributes.displayName.toLowerCase() ===
        newCategoryName.toLowerCase()
      ) {
        duplicateCategory = true;
        return;
      }
    });
    if (duplicateCategory) {
      setNewCategoryErrorMessage('Categoria já existe');
      return;
    }
    setSavingCategory(true);

    if (onCreateMetadata) {
      const category = await onCreateMetadata(newCategoryName, 2);
      if (category) {
        authors.data.push(category);
      }
    }
    setCreateNewCategory(false);
    setNewCategoryName('');
    setSavingCategory(false);
  };

  const handleSaveTag = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newTagName.length == 0) {
      setNewTagErrorMessage('Tag vazia');
      return;
    }
    let duplicateTag = false;
    tags.data.forEach((tag) => {
      if (
        tag.attributes.displayName.toLowerCase() === newTagName.toLowerCase()
      ) {
        duplicateTag = true;
        return;
      }
    });
    if (duplicateTag) {
      setNewTagErrorMessage('Tag já existe');
      return;
    }
    setSavingTag(true);

    if (onCreateMetadata) {
      const tag = await onCreateMetadata(newTagName, 3);
      if (tag) {
        tags.data.push(tag);
      }
    }

    setCreateNewTag(false);
    setNewTagName('');
    setSavingTag(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <SimpleDialog></SimpleDialog> */}
      <TextInput
        name="post-title"
        label="Post title"
        value={newTitle}
        onInputChange={(v) => {
          setNewTitle(v);
          setTitleErrorMessage('');
        }}
        errorMessage={titleErrorMessage}
        hasFocus={shouldFocusTitle}
      />
      <TextInput
        name="post-excerpt"
        label="Post Excerpt"
        value={newExcerpt}
        onInputChange={(v) => {
          setNewExcerpt(v);
          setExcerptErrorMessage('');
        }}
        errorMessage={excerptErrorMessage}
        hasFocus={shouldFocusExcerpt}
      />
      <Styled.ComboBoxDiv>
        <Label>Capa do post</Label>
      </Styled.ComboBoxDiv>
      {coverData.attributes.url && (
        <Cover
          src={coverData.attributes.url}
          alt={
            coverData.attributes.alternativeText
              ? coverData.attributes.alternativeText
              : ''
          }
        />
      )}
      <ImageUpload
        handleImageUpload={onCreateNewImage}
        handleAfterImageUpload={handleAfterImageUpload}
      ></ImageUpload>
      {!isPreview && (
        <Styled.ComboBoxDiv>
          <HtmlTagsComboBox onSelectTag={handleTagSelection}></HtmlTagsComboBox>
          <Styled.ButtonComboBoxDiv>
            <StyledButton.Button onClick={handleAddTagClick} color="primary">
              {'Adicionar Tag HTML ao texto'}
            </StyledButton.Button>
          </Styled.ButtonComboBoxDiv>
        </Styled.ComboBoxDiv>
      )}

      <Styled.ButtonDiv>
        <StyledButton.Button
          onClick={handlePreviewClick}
          color="primary"
          disabled={newContent.length === 0}
        >
          {isPreview ? 'Editar' : 'Visualizar'}
          {' Conteúdo'}
        </StyledButton.Button>
      </Styled.ButtonDiv>
      {!isPreview && (
        <>
          <TextInput
            name="post-content"
            label="Post Content"
            value={newContent}
            onInputChange={(v) => {
              setNewContent(v);
              setContentErrorMessage('');
            }}
            as="textarea"
            errorMessage={contentErrorMessage}
            hasFocus={shouldFocusContent}
          />
        </>
      )}
      {isPreview && <HtmlContent html={newContent} />}

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.Grid>
        <Styled.GridContent>
          <Styled.GridHeader>
            <Label>Autores</Label>
            <AddButton onClick={handlePlusAuthorClick}>
              <PlusIcon />
            </AddButton>
          </Styled.GridHeader>
          {createNewAuthor && (
            <>
              <TextInput
                name="new-author"
                label="Novo autor"
                value={newAuthorName}
                onInputChange={(v) => {
                  setNewAuthorName(v);
                  setAuthorErrorMessage('');
                }}
                errorMessage={newAuthorErrorMessage}
              />
              <StyledButton.Button
                onClick={handleSaveAuthor}
                color="primary"
                disabled={savingAuthor || session?.user?.name == 'Visitor'}
              >
                {savingAuthor ? 'Adicionando...' : 'Adicionar'}
              </StyledButton.Button>
            </>
          )}

          {authors.data.map((author, index) => (
            <RadioButton
              key={author.id}
              label={author.attributes.displayName}
              name={author.attributes.displayName}
              value={author.id}
              checked={selectedAuthorValue === author.id}
              onRadioButtonChange={handleAuthorRadioButtonChange}
              firstItem={index === 0}
            />
          ))}
        </Styled.GridContent>
        <Styled.GridContent>
          <Styled.GridHeader>
            <Label>Categorias</Label>
            <AddButton onClick={handlePlusCategoryClick}>
              <PlusIcon />
            </AddButton>
          </Styled.GridHeader>
          {createNewCategory && (
            <>
              <TextInput
                name="new-Category"
                label="Nova categoria"
                value={newCategoryName}
                onInputChange={(v) => {
                  setNewCategoryName(v);
                  setNewCategoryErrorMessage('');
                }}
                errorMessage={newCategoryErrorMessage}
              />
              <StyledButton.Button
                onClick={handleSaveCategory}
                color="primary"
                disabled={savingCategory || session?.user?.name == 'Visitor'}
              >
                {savingCategory ? 'Adicionando...' : 'Adicionar'}
              </StyledButton.Button>
            </>
          )}
          {categories.data.map((category, index) => (
            <CheckboxItem
              key={category.id}
              item={category}
              isChecked={categoriesIds.includes(category.id)}
              onCheckboxChange={handleCategoriesIdChange}
              firstItem={index === 0}
            />
          ))}
        </Styled.GridContent>
        <Styled.GridContent>
          <Styled.GridHeader>
            <Label>Tags</Label>
            <AddButton onClick={handlePlusTagClick}>
              <PlusIcon />
            </AddButton>
          </Styled.GridHeader>
          {createNewTag && (
            <>
              <TextInput
                name="new-Tag"
                label="Nova tag"
                value={newTagName}
                onInputChange={(v) => {
                  setNewTagName(v);
                  setNewTagErrorMessage('');
                }}
                errorMessage={newTagErrorMessage}
              />
              <StyledButton.Button
                onClick={handleSaveTag}
                color="primary"
                disabled={savingTag || session?.user?.name == 'Visitor'}
              >
                {savingTag ? 'Adicionando...' : 'Adicionar'}
              </StyledButton.Button>
            </>
          )}
          {tags.data.map((tag, index) => (
            <CheckboxItem
              key={tag.id}
              item={tag}
              isChecked={tagsIds.includes(tag.id)}
              onCheckboxChange={handleTagsIdChange}
              firstItem={index === 0}
            />
          ))}
        </Styled.GridContent>
      </Styled.Grid>

      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
