import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import { useState } from "react";
import ContextMenu from "./ui/ContextMenu";

// interface IProps {}
function OpenedFilesBar() {
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div className="overflow-x-auto ">
      <ul
        className="flex items-center overflow-x-auto"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
        }}
      >
        {openedFiles.map((file) => (
          <OpenedFilesBarTab key={file.id} file={file} />
        ))}
      </ul>
      {showMenu && (
        <ContextMenu positions={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
}

export default OpenedFilesBar;
