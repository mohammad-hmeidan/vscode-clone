import { v4 as uuid } from "uuid";
import { IFile } from "../interfaces";

export const fileTree: IFile = {
  id: uuid(),
  name: "VS code clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [],
    },
    {
      id: uuid(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
        },
      ],
    },
    {
      id: uuid(),
      name: "components",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
          `,
        },
        {
          id: uuid(),
          name: ".gitignore",
          isFolder: false,
          content: `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

          `,
        },
        {
          id: uuid(),
          name: "main.ts",
          isFolder: false,
          content: `
          // Write Class Code Here
          class Game<T>{
              constructor(public title:T,public price:number){}
              getDiscount(val:string|number):void{
                  console.log(\`the discount is \${val}\`)
              }
          }
          // Do Not Edit Here
          let gameOne = new Game<string>("Ys", 100);
          let gameTwo = new Game<number>(2064, 100); // There's A Game Called "2064"
          
          console.log(gameOne.title); // "Ys"
          console.log(gameOne.price); // 100
          gameOne.getDiscount("50"); // "The Discount Is 50"
          
          console.log(gameTwo.title); // 2064
          console.log(gameTwo.price); // 100
          gameTwo.getDiscount(80); // "The Discount Is 80"
          `,
        },
        {
          id: uuid(),
          name: "main.js",
          isFolder: false,
          content: `
let output = document.getElementById("output");
let lastValue = document.getElementById("value")
function display(num){
    output.innerHTML +=num;
}
function Clear(){
    output.innerHTML = "";
}
function Delete(){
    output.innerHTML = output.innerHTML.slice(0,-1);
}
function Calc(){
    try {
        output.innerHTML = eval(output.innerHTML);
    } catch (error) {
        output.innerHTML = 
    }
    if (output.innerHTML !== "Error") {
        sessionStorage.setItem("Ans",output.innerHTML);
    }
}
function Ans(){
    if(sessionStorage.getItem("Ans")){
        output.innerHTML += sessionStorage.getItem("Ans");
    }else{
        lastValue.classList.add("not-found")
        setTimeout(()=>{
            lastValue.classList.remove("not-found")
        },2000)
    }
}
          `,
        },
        {
          id: uuid(),
          name: "main.css",
          isFolder: false,
          content: `/* start varibles  */
:root {
    --main-color: #10cab7 ;
    --secondary-color: #2c4755;
    --section-padding:60px;
    --section-background: #f6f6f6 ;
}
/* end varibles  */
/* start global rules  */
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
html{
    scroll-behavior: smooth;
}
body {
    font-family: 'Work Sans', sans-serif;
}
.parent {
    background-color: #eee;
}
.container{
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
}
/* small  */
@media (min-width: 767px) {
    .container{
        width: 750px;
    }
}
/* medium  */
@media (min-width: 992px) {
    .container{
        width: 970px;
    }
}
/* large  */
@media (min-width: 1200px) {
    .container{
        width: 1170px;
    }
}
/* end global rules  */
/* start components  */
.special-heading {
    color:#ebeced ;
    font-size: 100px;
    text-align: center;
    font-weight: 800;
    letter-spacing: 0px;
    margin: 0;
}
`,
        },
        {
          id: uuid(),
          name: "main.tsx",
          isFolder: false,
          content: `interface IProps {
  src: string;
}
function IconImg({ src }: IProps) {
  return <img src={src} alt="" width={20} height={20} />;
}

export default IconImg;
  `,
        },
        {
          id: uuid(),
          name: "main.jsx",
          isFolder: false,
          content: `
import OpenedFilesBar from "./components/OpenedFilesBar";
import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";

const App = () => {
  return (
    <div className="">
      <div className="flex h-screen">
        <div className="w-64 border-r border-white">
          <RecursiveComponent fileTree={fileTree} />
        </div>
        <OpenedFilesBar />
      </div>
    </div>
  );
};

export default App;

          `,
        },
      ],
    },
    {
      id: uuid(),
      name: "data",
      isFolder: true,
    },
    {
      id: uuid(),
      name: "icons",
      isFolder: true,
    },
    {
      id: uuid(),
      name: "assets",
      isFolder: true,
    },
  ],
};
