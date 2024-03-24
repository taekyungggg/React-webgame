const React = require("react");
const { useState } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = React.useRef(null); //<input> 요소에 포커스를 주기 위해 사용됩니다.

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputEl.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputEl.current.focus(); //<input> 요소에 포커스
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)} //e.currentTarget.value는 사용자가 입력한 현재 텍스트
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
