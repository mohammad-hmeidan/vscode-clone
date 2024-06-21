import toast from "react-hot-toast";
import { IFile } from "../interfaces";

export const doesFileObjectExist = (arr: IFile[], id: string) => {
  return arr.some((obj) => obj.id === id);
};

export const updateChildrenById = (
  item: IFile,
  targetId: string,
  newChild: IFile
): IFile => {
  if (item.id === targetId) {
    return {
      ...item,
      children: item.children ? [...item.children, newChild] : [newChild],
    };
  } else if (item.children) {
    return {
      ...item,
      children: item.children.map((child) =>
        updateChildrenById(child, targetId, newChild)
      ),
    };
  }
  return item;
};

export const updateFileTreeById = (
  item: IFile,
  targetId: string,
  newContent: string,
  newName: string
): IFile => {
  if (item.id === targetId) {
    return { ...item, content: newContent, name: newName };
  } else if (item.children) {
    return {
      ...item,
      children: item.children.map((child) =>
        updateFileTreeById(child, targetId, newContent, newName)
      ),
    };
  }
  return item;
};

export const updateOpenedFileById = (
  items: IFile[],
  targetId: string,
  newContent: string,
  newName: string
): IFile[] => {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        content: newContent,
        name: newName,
      };
    } else if (item.children) {
      return {
        ...item,
        children: updateOpenedFileById(
          item.children,
          targetId,
          newContent,
          newName
        ),
      };
    } else {
      return item;
    }
  });
};

export const validation = (
  name: string,
  isFolder: boolean = false
): boolean => {
  if (name === "") {
    toast.error("Name is Required");
    return true;
  }
  if (!isFolder) {
    if (name.split(".").length <= 1) {
      toast.error("Name must have (.)separator");
      return true;
    }
    if (name.split(".")[1].length <= 0) {
      toast.error("Name must have an extension ");
      return true;
    }
  }
  return false;
};
