import React, {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { z } from 'zod';
import FormWrapper from '../Form/FormWrapper';
import { FieldInput } from '../Ui/FieldInput';
import { JsxElement } from 'typescript';
import TrashIcon from '@/assets/TrashIcon';
import { API } from '@/constant';
import Cookies from 'js-cookie';

// const ProjectUpload = z.object({
//   doc_path: z.array(z.string()),
// });

// export type ProjectUploadTypes = z.infer<typeof ProjectUpload>;

interface ProjectUpload {
  doc_path: FileList | null | object;
  isEdit?: boolean;
  doc_name?: string;
  id?: string;
  oldPath?: string[];
}

type ProjectUploadForm = ProjectUpload & {
  onChangeField: (e: Partial<ProjectUpload> | any) => void;
};

const FormFileUpload = ({
  isEdit,
  doc_path,
  doc_name,
  id,
  onChangeField,
  oldPath,
}: ProjectUploadForm) => {
  const fileRef = useRef<HTMLInputElement | any>();
  const [newFile, setNewFile] = useState<File>();
  let dataFile = doc_name?.toString().split(',');
  let dataPath = doc_path?.toString().split(',');
  const [fileList, setFileList] = useState<FileList | null | any>();
  const [fileName, setFileName] = useState<string[] | undefined>();
  const [fileEdit, setFileEdit] = useState<string[] | undefined>(dataFile);

  console.log('fileEdit: ' + newFile);
  // console.log('id', id);
  let files: FileList;
  const handleChangeUploadFile = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const { name, value } = event.target;
      const element = event.currentTarget as HTMLInputElement;
      let filesList: FileList | null = element.files;
      setFileList(filesList);
      onChangeField({ doc_path: filesList });
      if ('files' in event.target && event.target.files !== null) {
        Array.from(event.target.files).forEach((file) => {
          for (let i = 0; i < [file].length; i++) {
            setNewFile(file);
            console.log('newFile', newFile);
            // console.log('opo iki', file);
          }
          //   // setNewFile([file]);
        });
        // console.log('opo isine ', event.target.files);
        // files = event.target.files;
        // for (let i = 0; i < files.length; i++) {
        //   setNewFile(files[i]);
        // }
        // setInputValue({
        //   ...inputValue,
        //   evidencePhoto: event.target.files[0],
        //   sdgsImpact: event.target.value,
        // });

        // inputValue.evidencePhoto, 'change';
      }

      // if (
      //   element.files !== null &&
      //   Object.keys(fileList ?? {}).length > 0 &&
      //   fileList !== null
      // ) {
      //   console.log('masuk');
      //   for (let i = 0; i < Object.keys(fileList ?? {}).length; i++) {
      //     setFileName((prev) => [prev, fileList[i]?.name]);
      //     setNewFile(fileList[i]?.name);
      //   }
      // }
      // setFileName((prev) => [...prev, fileList.name]);
      // console.log('newFile', newFile);
      if (fileList) {
        console.log('FileUpload -> files', fileList);
      }
    },
    [fileName]
  );

  useEffect(() => {
    if (fileEdit !== undefined) {
      oldPath?.push(fileEdit.toString());
    }

    // if (files !== undefined) {
    //   fileRef.current = files;
    // }

    return () => {};
  }, [fileName]);

  const handleDeleteFile = (file: string, dataPath: string[] | undefined) => {
    let pathFileDeleted = dataPath?.filter((fn) => fn.includes(file))[0];
    console.log(pathFileDeleted);
    let data = dataPath?.filter((val) => val !== pathFileDeleted);
    console.log('dataPath', data);
    dataFile?.filter((val) => val !== file);
    // setFileEdit(dataFile?.filter((val) => val !== file));

    API.post(
      `/project/delete/geo-file/${id}`,
      {
        data: {
          fileNameDeleted: file,
          filePathDeleted: pathFileDeleted,
        },
      },
      {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
      }
    )
      .then((res) => {
        setFileEdit(dataFile?.filter((val) => val !== file));
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-col w-full gap-2">
        <FieldInput
          // ref={fileRef}
          placeHolder="doc_path"
          titleLabel={`${isEdit ? '' : 'Upload Document Project'}`}
          htmlFor="doc_path"
          type="file"
          required={isEdit ? false : true}
          multiple={true}
          autoComplete={'off'}
          defaultValue={''}
          onChange={(e) => {
            handleChangeUploadFile(e);
          }}
          // errors={errors}
        />
        {[newFile]?.map((val, i) => (
          <div
            key={i}
            className="flex flex-col w-full justify-center text-center bg-zinc-300/20 text-white rounded-md my-2 p-2"
          >
            <div className="flex flex-col md:flex-row lg:flex-row w-full justify-center md:justify-between lg:justify-between px-3 items-center">
              <p className="text-center">New File Uploaded</p>
              <p className="text-center text-sm text-gray-600">
                {[newFile].length > 1 ? 'opoe' : 'No File Uploaded'}
              </p>
            </div>
          </div>
        ))}
        {/* {isEdit ? (
          <div>
            {fileEdit?.map((val, i) => (
              <div
                key={i}
                className="flex flex-col w-full justify-center text-center bg-zinc-300/20 text-white rounded-md my-2 p-2"
              >
                <div className="flex flex-col md:flex-row lg:flex-row w-full justify-center md:justify-between lg:justify-between px-3 items-center">
                  <p className="">{val}</p>
                  <button
                    className="bg-[#F3E758] flex flex-row justify-center w-full md:w-auto lg:w-auto item-center rounded-lg p-2"
                    type="button"
                    onClick={() => handleDeleteFile(val, dataPath)}
                  >
                    <TrashIcon isSmall={true} />
                    <p className="md:hidden lg:hidden text-sm text-white mx-3">
                      Delete..!!
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {fileName?.map((val, i) => (
              <div
                key={i}
                className="flex flex-col w-full justify-center text-center bg-white text-black rounded-md my-2"
              >
                <p className="my-4">{val}</p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FormFileUpload;
