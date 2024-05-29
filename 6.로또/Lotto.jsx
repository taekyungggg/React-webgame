import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

//7개 숫자 미리 뽑는 함수
function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  /*
  const candidate = Array(45).fill().map((v, i) => i + 1);
  왜 fill()을 사용하는가?

  -> 코드설명 
  map((v, i) => i + 1)값을 fill()을 이용해서 array에 채운다는 말

  -> Array(45)로 만든 배열은 길이가 45이지만, 각 요소가 undefined 상태입니다. 
  JavaScript에서 map() 메서드를 사용하려면 배열의 요소가 정의되어 있어야 합니다. 
  즉, map()은 undefined 상태의 요소를 무시합니다. 
  따라서 fill()을 사용하여 배열의 모든 요소를 undefined가 아닌 값으로 채우는 것입니다.
  */
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
      /*
      반복문:
      > while 루프는 candidate 배열에 요소가 남아있는 동안 반복됩니다.
      
      >랜덤 인덱스 선택:
      Math.floor(Math.random() * candidate.length)를 통해 랜덤한 인덱스를 선택합니다.
      0부터 44까지의 정수 중 하나를 반환합니다.

      >요소 제거 및 추가:
      candidate.splice(randomIndex, 1)로 선택된 인덱스의 요소를 제거하고, 그 요소를 배열로 반환합니다.
      [0]을 사용해 반환된 배열의 첫 번째 요소를 가져옵니다.
      그 요소를 shuffle 배열에 추가합니다.

      최종 결과
      이 과정이 반복되면 candidate 배열의 모든 요소가 랜덤하게 shuffle 배열로 이동합니다. shuffle 배열은 1부터 45까지의 숫자를 랜덤한 순서로 포함하게 됩니다.
      */
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      //timeouts은 여기서 바뀌지 않는다. 배열에 요소를 넣어줄뿐...?
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
      /*
      timeouts.current[i]: 이는 timeouts라는 useRef 훅을 사용하여 생성된 ref 객체의 .current 속성에 접근하고 있습니다. timeouts.current는 여러 개의 setTimeout 호출을 저장하기 위한 배열입니다. 배열의 i번째 요소에 새로운 setTimeout을 저장하여, 나중에 필요할 때 명확하게 타이머를 정리할 수 있도록 합니다.

      setTimeout(() => { ... }, (i + 1) * 1000): setTimeout 함수는 첫 번째 인자로 전달된 함수를 두 번째 인자로 지정된 시간(밀리초 단위) 후에 실행합니다. 여기서 (i + 1) * 1000은 각 로또 번호가 1초 간격으로 하나씩 표시되도록 합니다. 예를 들어, i가 0이면 1000밀리초(1초) 후에 첫 번째 번호가 표시되고, i가 1이면 2000밀리초(2초) 후에 두 번째 번호가 표시됩니다.

      setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]): 이는 setWinBalls 함수를 호출하여 winBalls 상태를 업데이트합니다. setWinBalls는 기존의 볼 목록(prevBalls)을 가져와서, 현재 인덱스(i)에 해당하는 winNumbers의 번호를 추가합니다. 즉, 각 타이머가 실행될 때마다 새로운 로또 번호가 화면에 추가됩니다.
      */
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); //timeouts
  // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
  /*
  useEffect 훅은 함수형 컴포넌트에서 부수 효과(side effects)를 수행하는 데 사용됩니다. useEffect는 두 개의 인자를 받습니다
  
  1. 빈 배열 ([])일 때 효과
  >컴포넌트가 처음 렌더링된 후 한 번만 실행됩니다. 이는 클래스 컴포넌트에서의 componentDidMount와 유사하며, 컴포넌트가 DOM에 처음 마운트된 직후에 수행해야 할 작업들을 여기서 처리합니다.
  
  2. 의존성 배열에 값이 있을 때 (예: [timeouts.current]) 효과
  > 초기 렌더링 후 그리고 의존성 값이 변경될 때마다 재실행됩니다. 이는 클래스 컴포넌트의 componentDidMount와 componentDidUpdate를 결합한 것과 비슷합니다.

  3. 특정 경우
  **timeouts.current**는 컴포넌트의 생명주기 동안 지속되는 ref 객체입니다. 리렌더링시에 재생성되지 않고, current의 변화는 리렌더를 유발하지 않습니다. 이론적으로 timeouts.current를 배열에 포함시킨다 해도, ref 객체 자체가 변경되었다고 해서 효과가 재실행되지는 않습니다.

  

  */

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; //timeouts은 여기서 바뀐다.
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
