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
        const assetsIndexName = "index.html";
        const data: string = this.generateFiglet();
        const figletStr: string = this.formatPrint(data);

        let assetSource: string =
          compilation.assets[assetsIndexName].source();

        if (
          typeof assetSource === "object" &&
          Buffer.isBuffer(assetSource)
        ) {
          assetSource = Buffer.from(assetSource).toString();
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
      }
    );
  };

  generateFiglet = () => {
    const defaultOption = {
      font: this.options?.font,
      horizontalLayout: "full",
      verticalLayout: "full",
    };
    const text = figlet.textSync(this.name, defaultOption);
    return encodeURIComponent(text);
  };

  formatPrint = data => {
    const { mark, markMaxLength, color } = this.options;
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

    let style;
    if (Array.isArray(color)) {
      style = [
        `background: linear-gradient(to right, ${color.join(",")})`,
        '-webkit-background-clip: text',
        'color:transparent',
      ].join(";")
    } else {
      style = [`color: ${color}`].join(";")
    }

    const outputStr = `
      <script>
        (function() {
          var text = decodeURIComponent("${data}");
          var styles = "${style}";
          var colorPrefix ="%c";
          console.log(colorPrefix + "${markSpace}", styles);
          console.log(colorPrefix + text, styles);
          console.log(colorPrefix + "${markSpace}", styles);
          console.log(colorPrefix + "${spaceStr}${this.content}${spaceStr}", styles);
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
