import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/Close";
import {
  setClickedFile,
  setOpenedFiles,
  setTabIdToRemove,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

function OpenedFilesBarTab({ file }: IProps) {
  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.fileTree);
  const dispatch = useDispatch();

  // Handler
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFile({ filename: name, fileContent: content, activeTabId: id })
    );
  };
  const onClose = (id: string) => {
    const filtered = openedFiles.filter((file) => file.id !== id);
    dispatch(setOpenedFiles(filtered));
    // when i close item(Exclusicely selected item) change fileactive=>first file in tab
    if (filtered.length && activeTabId === id) {
      dispatch(
        setClickedFile({
          filename: filtered[0].name,
          fileContent: filtered[0].content,
          activeTabId: filtered[0].id,
        })
      );
    }
    // when there aren't file in tab change ClickedFile => defaultValue
    else if (filtered.length <= 0) {
      dispatch(
        setClickedFile({
          filename: "",
          fileContent: "",
          activeTabId: null,
        })
      );
    }
  };
  return (
    <li
      className="flex items-center min-w-fit p-2 border border-[#64646473] hover:bg-[#64646473] duration-300 cursor-pointer"
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemove(file.id));
      }}
      style={{
        borderTop:
          file.id === activeTabId
            ? "2px solid #bc3fbc"
            : "2px solid transparent",
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="ml-2 mr-2">{file.name}</span>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClose(file.id);
        }}
      >
        <CloseIcon />
      </div>
    </li>
  );
}

export default OpenedFilesBarTab;
