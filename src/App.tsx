import { Toaster } from "react-hot-toast";
import { RootState } from "./app/store";
import Preview from "./components/Preview";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizablePanel from "./components/ResizablePanel";
import WelcomeTab from "./components/WelcomeTab";
import { useSelector } from "react-redux";

const App = () => {
  const { openedFiles, fileTree } = useSelector(
    (state: RootState) => state.fileTree
  );

  return (
    <div>
      <ResizablePanel
        showLeftPanel
        defaultLayout={[20, 80]}
        leftPanel={
          <div>
            <RecursiveComponent fileTreeProps={fileTree} />
          </div>
        }
        rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
      />
      <Toaster />
    </div>
  );
};

export default App;
