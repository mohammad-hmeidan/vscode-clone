import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
import { fileTree } from "../../data/fileTree";

interface IClickedFile {
  activeTabId: string | null;
  filename: string;
  fileContent: string | undefined;
}
interface IInitialState {
  fileTree: IFile;
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  tabIdToRemove: string | null;
}

const initialState: IInitialState = {
  fileTree: fileTree,
  openedFiles: [],
  clickedFile: {
    activeTabId: null,
    filename: "",
    fileContent: "",
  },
  tabIdToRemove: null,
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setNewFileTree: (state, action: PayloadAction<IFile>) => {
      state.fileTree = action.payload;
    },
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setTabIdToRemove: (state, action: PayloadAction<string>) => {
      state.tabIdToRemove = action.payload;
    },
  },
});

export const {
  setOpenedFiles,
  setClickedFile,
  setTabIdToRemove,
  setNewFileTree,
} = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
