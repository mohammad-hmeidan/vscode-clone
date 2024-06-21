import SyntaxHighlighter from "react-syntax-highlighter";
import { gml } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { extensionLanguageHighlighter } from "../constant";

interface IProps {
  content: string | undefined;
  filename: string;
}
const FileSyntaxHighlighter = ({ content, filename }: IProps) => {
  const extension = filename.split(".").pop();
  let language = "javascript";
  if (
    extension &&
    Object.prototype.hasOwnProperty.call(
      extensionLanguageHighlighter,
      extension
    )
  ) {
    language = extensionLanguageHighlighter[extension];
  }
  return (
    <SyntaxHighlighter
      language={language}
      style={gml}
      customStyle={{
        width: "100%",
        maxHeight: "calc(100vh - 43px)",
        overflow: "auto",
      }}
      showLineNumbers
    >
      {content || ""}
    </SyntaxHighlighter>
  );
};
export default FileSyntaxHighlighter;
