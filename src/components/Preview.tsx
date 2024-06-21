import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBar from "./OpenedFilesBar";
import IconImg from "./IconImg";
import Modal from "./ui/Modal";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  updateFileTreeById,
  updateOpenedFileById,
  validation,
} from "../utils/functions";
import {
  setClickedFile,
  setNewFileTree,
  setOpenedFiles,
} from "../app/features/fileTreeSlice";

const Preview = () => {
  const dispatch = useDispatch();
  const { fileTree, clickedFile, openedFiles } = useSelector(
    (state: RootState) => state.fileTree
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [updateNameFile, setUpdateNameFile] = useState<string>(
    clickedFile.filename
  );
  const [updateCodeFile, setUpdateCodeFile] = useState<string>(
    clickedFile.fileContent || ""
  );

  // handlers
  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
    setUpdateCodeFile("");
    setUpdateNameFile("");
  };
  const onOpenModal = () => {
    setIsOpenConfirmModal(true);
    setUpdateNameFile(clickedFile.filename);
    setUpdateCodeFile(clickedFile.fileContent || "");
  };
  const onSubmitAdd = () => {
    if (validation(updateNameFile)) {
      return;
    }
    dispatch(
      setNewFileTree(
        updateFileTreeById(
          fileTree,
          clickedFile.activeTabId as string,
          updateCodeFile,
          updateNameFile
        )
      )
    );
    dispatch(
      setOpenedFiles(
        updateOpenedFileById(
          openedFiles,
          clickedFile.activeTabId as string,
          updateCodeFile,
          updateNameFile
        )
      )
    );
    dispatch(
      setClickedFile({
        activeTabId: clickedFile.activeTabId,
        fileContent: updateCodeFile,
        filename: updateNameFile,
      })
    );
    closeConfirmModal();
    toast.success("Updated File successfully");
  };
  return (
    <>
      <OpenedFilesBar />
      <div className="relative">
        <div onClick={onOpenModal}>
          <IconImg
            src="/icons/edit.svg"
            className="w-5 h-5 absolute right-5 top-3 cursor-pointer"
          />
        </div>
        <FileSyntaxHighlighter
          content={clickedFile.fileContent}
          filename={clickedFile.filename}
        />
      </div>
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title={`Modal for Edit File <${clickedFile.filename}>`}
        description={"njksnx snhj"}
      >
        <div className="w-full max-w-md text-white">
          <Field>
            <Label className="text-sm/6 font-medium ">Name</Label>
            <Input
              placeholder={`Enter your New File Name`}
              className={
                "block w-full rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white hover:bg-[#151515]"
              }
              onChange={(e) => setUpdateNameFile(e.target.value)}
              value={updateNameFile}
            />
          </Field>
        </div>
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
              onChange={(e) => setUpdateCodeFile(e.target.value)}
              value={updateCodeFile}
            />
          </Field>
        </div>
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

export default Preview;
