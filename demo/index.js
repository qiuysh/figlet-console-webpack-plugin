const figlet = require("figlet");

figlet.text(
  "console",
  {
    horizontalLayout: "full",
    verticalLayout: "full",
  },
  (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    let text = encodeURI(data);
    const content = "version 0.0.1";
    const markSpace = "#".repeat(50);
    const len =
      getCharCodeLength(markSpace) -
      getCharCodeLength(content);
    const singleLen = len / 2;
    const space = " ".repeat(singleLen);
    console.log(singleLen);
    console.log(markSpace);
    console.log(`%c ${decodeURI(text)}`, "color: #bada55;");
    console.log(markSpace);
    console.log(`${space}${content}${space}`);
    console.log("\n");
  }
);

// figlet.metadata('Standard', function (err, options, headerComment) {
//   if (err) {
//     console.log('something went wrong...');
//     console.dir(err);
//     return;
//   }
//   console.dir(options);
//   // console.log(headerComment);
// });

function getCharCodeLength(data) {
  var length = 0;
  Array.from(data).map(function (char) {
    if (char.charCodeAt(0) > 255) {
      //字符编码大于255，说明是双字节字符
      length += 2;
    } else {
      length++;
    }
  });

  return length;
}
