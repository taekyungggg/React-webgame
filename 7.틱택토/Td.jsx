import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  /*
  리렌더링 최적화
    React는 기본적으로 상태나 props가 변경되면 해당 컴포넌트와 그 자식 컴포넌트를 리렌더링합니다. 
    따라서, Td 컴포넌트에서 cellData가 변경되면 해당 셀을 포함하는 Tr 컴포넌트가 리렌더링됩니다.

    특정 셀의 리렌더링
    특정 셀의 cellData가 변경되면, 해당 셀을 포함하는 행(tr)이 리렌더링됩니다. 
    이는 React가 효율적으로 변경된 부분만 업데이트하기 때문입니다.
  */

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
