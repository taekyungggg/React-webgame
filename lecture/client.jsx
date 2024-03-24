const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordRelay");
//필요한 것만 불러오고 나머지는 안 쓸 수 있기때문에 훨씬 더 효율적이다.

ReactDom.render(<WordRelay />, document.querySelector("#root"));
