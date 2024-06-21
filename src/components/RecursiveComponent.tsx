import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFile,
  setNewFileTree,
  setOpenedFiles,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import {
  doesFileObjectExist,
  updateChildrenById,
  validation,
} from "../utils/functions";
import IconImg from "./IconImg";
import { v4 as uuid } from "uuid";
import Modal from "./ui/Modal";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import toast from "react-hot-toast";

interface IProps {
  fileTreeProps: IFile;
}
const RecursiveComponent = ({ fileTreeProps }: IProps) => {
  const { id, name, isFolder, children, content } = fileTreeProps;
  const dispatch = useDispatch();
  const {
    fileTree,
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.fileTree);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [nameNewFile, setNameNewFile] = useState<string>("");
  const [codeNewFile, setCodeNewFile] = useState<string>(``);
  const [isNewFileFolder, setIsNewFileFolder] = useState<boolean>(false);

  // Handlers
  const toggle = () => setIsOpen((prev) => !prev);
  const onFileClick = () => {
    const exists = doesFileObjectExist(openedFiles, id);
    dispatch(
      setClickedFile({
        filename: name,
        fileContent: content,
        activeTabId: id,
      })
    );
    if (exists) {
      return;
    }
    dispatch(setOpenedFiles([...openedFiles, fileTreeProps]));
  };
  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
    setNameNewFile("");
    setCodeNewFile(``);
  };
  const onAddNewFile = (isFolder: boolean) => {
    setIsNewFileFolder(isFolder);
    setIsOpenConfirmModal(true);
  };
  const onSubmitAdd = () => {
    if (validation(nameNewFile, isNewFileFolder)) {
      return;
    }
    toast.success(`Added ${isNewFileFolder ? "Folder" : "File"} successfully`);
    closeConfirmModal();
    if (fileTree.children)
      if (isNewFileFolder)
        dispatch(
          setNewFileTree(
            updateChildrenById(fileTree, fileTreeProps.id, {
              id: uuid(),
              name: nameNewFile,
              isFolder: isNewFileFolder,
            })
          )
        );
      else
        dispatch(
          setNewFileTree(
            updateChildrenById(fileTree, fileTreeProps.id, {
              id: uuid(),
              name: nameNewFile,
              isFolder: isNewFileFolder,
              content: codeNewFile,
            })
          )
        );
  };
  return (
    <>
      <div className="mb-2 ml-2 ">
        <div
          className="flex items-center mb-1 "
          style={{ backgroundColor: id === activeTabId ? "#ffffff36" : "" }}
        >
          {isFolder ? (
            <>
              <div
                onClick={toggle}
                className="flex items-center cursor-pointer w-full"
              >
                <span className="mr-1">
                  {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
                </span>
                <RenderFileIcon
                  filename={name}
                  isFolder={isFolder}
                  isOpen={isOpen}
                />

                <span className="ml-1">{name}</span>
              </div>
              <div className="ml-auto flex gap-2">
                <div
                  className="cursor-pointer"
                  onClick={() => onAddNewFile(false)}
                >
                  <IconImg
                    src="/icons/file-add.svg"
                    className="w-5 h-5 min-w-4 min-h-4"
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => onAddNewFile(true)}
                >
                  <IconImg
                    src="/icons/folder-add.svg"
                    className="w-5 h-5 min-w-4 min-h-4"
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              className="flex items-center cursor-pointer"
              onClick={onFileClick}
            >
              <RenderFileIcon filename={name} />
              <span className="ml-1">{name}</span>
            </div>
          )}
        </div>
        {isOpen &&
          children &&
          children.map((file, idx) => (
            <RecursiveComponent fileTreeProps={file} key={idx} />
          ))}
      </div>
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title={`Modal for add ${
          isNewFileFolder ? "Folder" : "File"
        } to ${name}`}
        description={name}
      >
        <div className="w-full max-w-md text-white">
          <Field>
            <Label className="text-sm/6 font-medium ">
              Name {isNewFileFolder ? "Folder" : "File"}
            </Label>
            <Input
              placeholder={`Enter your ${
                isNewFileFolder ? "Folder" : "File"
              } Name`}
              className={
                "block w-full rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white hover:bg-[#151515]"
              }
              onChange={(e) => setNameNewFile(e.target.value)}
              value={nameNewFile}
            />
          </Field>
        </div>
        {!isNewFileFolder && (
          <div className="w-full max-w-md">
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Your Code
              </Label>
              <Textarea
                placeholder="Enter Your Code here (Optional)"
                className={
                  "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                }
                rows={7}
                onChange={(e) => setCodeNewFile(e.target.value)}
                value={codeNewFile}
              />
            </Field>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-[#23aaf2] py-1.5 px-3 text-sm/6 font-semibold text-white  focus:outline-none hover:bg-[#0070b0] data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={onSubmitAdd}
          >
            Save changes
          </Button>
          <Button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-gray-600 py-1.5 px-3 text-sm/6 font-semibold text-white  focus:outline-none hover:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RecursiveComponent;
