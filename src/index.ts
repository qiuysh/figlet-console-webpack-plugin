import figlet from "figlet";
import {
  FigletConsoleOptionsProps,
  FigletConsoleWebpackPluginProps,
} from "./typings";

const DEFAULT_OPTIONS: FigletConsoleOptionsProps = {
  font: "Standard",
  mark: "#",
  color: "#333",
  prodOnly: false,
  markMaxLength: 50,
};

class FigletConsoleWebpackPlugin {
  pluginName: string;
  name: string;
  content: string;
  options: FigletConsoleOptionsProps;
  constructor({
    name,
    content,
    options,
  }: FigletConsoleWebpackPluginProps) {
    this.pluginName = "FigletConsoleWebpackPlugin";
    this.name = name;
    // TODO remove content "
    this.content = content?.replace(/\"/g, "") || "";
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  apply = compiler => {
    const {
      options: { mode },
      hooks,
    } = compiler;
    const { prodOnly } = this.options;
    // development env and  prodOnly
    if (mode === "development" && prodOnly) {
      return;
    }
    hooks.emit.tapAsync(
      this.pluginName,
      (compilation, callback) => {
        try {
          const assetsIndexName = "index.html";
          const data: string = this.outputFiglet();
          const figletStr: string = this.formatPrint(data);

          let assetSource: string =
            compilation.assets[assetsIndexName].source();

          if (
            typeof assetSource === "object" &&
            Buffer.isBuffer(assetSource)
          ) {
            assetSource =
              Buffer.from(assetSource).toString();
          }

          compilation.assets[assetsIndexName] = {
            source: () => {
              const replaceMarkStr = "</html>";
              assetSource = assetSource?.replace(
                replaceMarkStr,
                ""
              );
              assetSource = assetSource
                .concat(figletStr)
                .concat(replaceMarkStr);

              return assetSource;
            },
            size: () => assetSource.length,
          };
          callback();
        } catch (error) {
          throw new Error(error);
        }
      }
    );
  };

  outputFiglet = () => {
    const defaultOption = {
      font: this.options?.font,
      horizontalLayout: "full",
      verticalLayout: "full",
    };
    const text = figlet.textSync(this.name, defaultOption);
    return encodeURIComponent(text);
  };

  formatPrint = data => {
    const { mark, markMaxLength } = this.options;
    const markSpace: string = mark?.repeat(markMaxLength);
    // Get mark width, we can set mark width equal figlet width
    const markSpaceLen: number =
      this.getCharCodeLength(markSpace);
    // content width
    const contentLen: number = this.getCharCodeLength(
      this.content
    );
    const halfRange: number =
      (markSpaceLen - contentLen) / 2;
    const spaceStr: string = " ".repeat(halfRange);
    // TODO options color is not work
    const outputStr = `
      <script>
        (function() {
          var text = decodeURIComponent("${data}");
          console.log("${markSpace}");
          console.log(text);
          console.log("${markSpace}");
          console.log("${spaceStr}${this.content}${spaceStr}");
          console.log("\\n");
        })()
      </script>
    `;
    return outputStr;
  };

  getCharCodeLength = data => {
    let length = 0;
    Array.from(data).map((char: any) => {
      if (char.charCodeAt(0) > 255) {
        length += 2;
      } else {
        length++;
      }
    });
    return length;
  };
}

export = FigletConsoleWebpackPlugin;
