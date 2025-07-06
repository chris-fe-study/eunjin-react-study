import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  /**
   * useState: 상태를 저장하고 변경할 수 있다
   * [getter, setter] 구조의 튜플로 이뤄져있다
   * 변경이 되면 컴포넌트의 리렌더링을 발생시키는 데이터
   * 리렌더란 결국 현재의 컴포넌트 함수를 재실행시키는 것
   * state의 값은 반드시 setter 함수를 통해서만 변경할 수 있다
   */

  const [count, setCount] = useState(0);
  const [isBoxVisibility, setIsBoxVisibility] = useState(true);

  const handleClick = () => {
    /**
     * setter를 사용하는 2가지 방식
     * 함수 내에 값을 그대로 할당 setter(value)
     * 함수가 제공하는 콜백 함수를 받아서 사용 (setter(prev => prev))
     */
    /**
     * 단순 값 할당
     * setCount(count + 1);
     */
    // 이전 값을 활용한 콜백 함수 호출 방식
    // ** 더 추천하는 방식 **
    setCount((prev) => prev + 1);
  };

  /**
   * useEffect: 컴포넌트의 라이프 사이클 특정 시점을 감시할 수 있다
   * useEffect(callback, [dependency])
   * dependency = [] : 빈 배열인 경우 초기 마운트 시점만 감시
   * dependency = [state] : state가 변경될 때마다 감시 (update)
   * useEffect(() => {
   *   return () => {} // 언마운트 시점만 감시
   * }, []) : 모든 시점에 감시
   * 여러 개를 사용해도 상관없음
   */
  useEffect(() => {
    console.log("component mount");
  }, []);

  useEffect(() => {
    console.log("count state update");
  }, [count]);

  const handleBoxToggle = () => {
    setIsBoxVisibility((isVisibility) => !isVisibility);
  };

  return (
    <>
      <h1>App Component</h1>
      <div>
        <p>count: {count}</p>
        <button type="button" onClick={handleClick}>
          increase
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={handleBoxToggle}>
          box toggle
        </button>
        {isBoxVisibility && <Box />}
      </div>
    </>
  );
}

function Box() {
  const [isBoxDisplay, setIsBoxDisplay] = useState(true);

  useEffect(() => {
    console.log("box component mount");
  }, []);

  useEffect(() => {
    return () => {
      // unmount check
      console.log("box component unmount");
    };
  }, []);

  const handleBoxDisplay = () => {
    setIsBoxDisplay((isDisplay) => !isDisplay);
  };

  return (
    <>
      <button type="button" onClick={handleBoxDisplay}>
        box display on/off
      </button>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          color: "white",
          display: isBoxDisplay ? "block" : "none",
        }}
      >
        Box Component
      </div>
    </>
  );
}
