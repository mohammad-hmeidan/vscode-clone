import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFile,
  setOpenedFiles,
} from "../../app/features/fileTreeSlice";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}
const ContextMenu = ({ positions, setShowMenu }: IProps) => {
  const {
    openedFiles,
    clickedFile: { activeTabId },
    tabIdToRemove,
  } = useSelector((state: RootState) => state.fileTree);
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);
  // Handlers
  const onCloseAll = () => {
    dispatch(setOpenedFiles([]));
    // when i close item(Exclusicely selected item) change fileactive=>first file in tab
    dispatch(
      setClickedFile({
        filename: "",
        fileContent: "",
        activeTabId: null,
      })
    );
  };
  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);
    setShowMenu(false);
    dispatch(setOpenedFiles(filtered));
    // when i close item(Exclusicely selected item) change fileactive=>first file in tab
    if (filtered.length && activeTabId === tabIdToRemove) {
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
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-fit   rounded-md z-20"
        style={{ position: "absolute", left: positions.x, top: positions.y }}
      >
        <li
          className="cursor-pointer px-7 py-2 hover:bg-gray-200 duration-300"
          onClick={onClose}
        >
          Close
        </li>
        <li
          className="w-full cursor-pointer px-7 py-2 hover:bg-gray-200 duration-300"
          onClick={onCloseAll}
        >
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
