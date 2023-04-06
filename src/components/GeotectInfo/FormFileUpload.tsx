import React, { ChangeEvent, useRef, useState } from 'react';
import { z } from 'zod';
import FormWrapper from '../Form/FormWrapper';
import { FieldInput } from '../Ui/FieldInput';
import { JsxElement } from 'typescript';

// const ProjectUpload = z.object({
//   doc_path: z.array(z.string()),
// });

// export type ProjectUploadTypes = z.infer<typeof ProjectUpload>;

interface ProjectUpload {
  doc_path: FileList | null | object;
}

type ProjectUploadForm = ProjectUpload & {
  onChangeField: (e: Partial<ProjectUpload>) => void;
};

// const FileFieldInput = ({ doc_path, onChangeField }: ProjectUploadForm) => {
//   return (
//     <>
//       <FieldInput
//         placeHolder="doc_path"
//         titleLabel="Upload Document Project"
//         htmlFor="doc_path"
//         type="file"
//         required={true}
//         multiple={true}
//         autoComplete={'off'}
//         value={doc_path}
//         onChange={(e) => {
//           onChangeField({ doc_path: e.target.value });
//         }}
//         // errors={errors}
//       />
//     </>
//   );
// };

const FormFileUpload = ({ doc_path, onChangeField }: ProjectUploadForm) => {
  console.log(doc_path);
  const fileRef = useRef<typeof doc_path | null>();
  // const [fileInput, setFileInput] = useState<JSX.Element[]>([
  //   <FileFieldInput
  //     key={1}
  //     doc_path={doc_path}
  //     onChangeField={onChangeField}
  //   />,
  // ]);

  // const handleAddInput = (key: React.Key | null) => {
  //   if (key === null) return;
  //   setFileInput((prev) => {
  //     return [
  //       ...prev,
  //       <FileFieldInput
  //         key={parseInt(key) + Math.random()}
  //         doc_path={doc_path}
  //         onChangeField={onChangeField}
  //       />,
  //     ];
  //   });
  // };

  // const handleRemoveInput = (item: string) => {
  //   if (item === '1') return;
  //   const filterComponent = fileInput.filter((c: JSX.Element) => {
  //     console.log(c.key, item);
  //     return c?.key !== item;
  //   });
  //   setFileInput([...filterComponent]);
  // };

  const handleChangeUploadFile = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    console.log('fileList', fileList);
    onChangeField({ doc_path: fileList });
    if (fileList) {
      console.log('FileUpload -> files', fileList);
    }
    // const files = event.target.files;

    // if (files.length > 0) {
    //   for (let i = 0; i < files.length; i++) {
    //     setnameFile([files[i].name]);
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       setImgReady(true);
    //       setImgList((prev) => [...prev, e.target.result.replace(/ /g, '')]);
    //     };
    //     reader.readAsDataURL(files[i]);
    //   }
    // }
  };

  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-col w-full gap-2">
        <FieldInput
          // ref={fileRef}
          placeHolder="doc_path"
          titleLabel="Upload Document Project"
          htmlFor="doc_path"
          type="file"
          required={true}
          multiple={true}
          autoComplete={'off'}
          defaultValue={''}
          onChange={(e) => {
            handleChangeUploadFile(e);
          }}
          // errors={errors}
        />
        {/* {fileInput.map((comp: JSX.Element) => (
          <div key={comp.key}>
            {comp}
            <button
              type="button"
              onClick={(e) => {
                handleRemoveInput(comp?.key);
              }}
            >
              Remove Input
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={(e) => {
              fileInput.map((v: JSX.Element) => handleAddInput(v?.key));
            }}
          >
            Add Input
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FormFileUpload;
