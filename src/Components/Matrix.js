import React, { useState, useEffect } from 'react'
import "./Matrix.css"
import Option from './Option'
import Calculation from './Calculation'
import Keyboard from './Keyboard'


const Matrix = () => {

  // オプションの行数、列数の値を取得
  const [mxrowA, setMxrowA] = useState(1)
  const [mxcolA, setMxcolA] = useState(1)
  const [mxrowB, setMxrowB] = useState(1)
  const [mxcolB, setMxcolB] = useState(1)

  const recieveRowA = (value) => {
    setMxrowA(value)
  }
  const recieveColA = (value) => {
    setMxcolA(value)
  }
  const recieveRowB = (value) => {
    setMxrowB(value)
  }
  const recieveColB = (value) => {
    setMxcolB(value)
  }

  const recieveChangeVal = (ra,ca,rb,cb) => {
    recieveRowA(ra)
    recieveColA(ca)
    recieveRowB(rb)
    recieveColB(cb)
  }

  // 行列の値を2次元配列にセットし、Calculationコンポーネントに渡す
  const [matrixAArray, setmatrixAArray] = useState([])
  const [matrixBArray, setmatrixBArray] = useState([])
  
  // 行列Aの2次元配列を生成する関数
  const createMatrixA = (rows, cols) => {
    const arr = []
    for(let i = 0 ; i < rows ; i++){
      const row = []
      for(let j = 0 ; j < cols ; j++){ 
        row.push(0)
      }
      arr.push(row)
    }
    setmatrixAArray(arr)
  }

  const createMatrixB = (rows, cols) => {
    const initMatrix = []
    for(let i = 0 ; i < rows ; i++){
      const row = []
      for(let j = 0 ; j < cols ; j++){ 
        row.push(0)
      }
      initMatrix.push(row)
    }
    setmatrixBArray(initMatrix)
    return initMatrix;
  }

  // 行列Aの列数、行数が更新されたら「行列Aの2次元配列を生成する関数」を実行
  useEffect(() => {
    if (matrixAArray.length !== mxrowA || (matrixAArray[0] && matrixAArray[0].length !== mxcolA)) {
      createMatrixA(mxrowA, mxcolA);
    }
  }, [mxrowA, mxcolA, matrixAArray]);
  
  useEffect(() => {
    if (matrixBArray.length !== mxrowB || (matrixBArray[0] && matrixBArray[0].length !== mxcolB)) {
      createMatrixB(mxrowB, mxcolB);
    }
  }, [mxrowB, mxcolB, matrixBArray]);
  


  // 入力された値をセット
  const handleInputChangeA = (row, col, value) => {
    const newMatrixValues =  [...matrixAArray]
    newMatrixValues[row][col] = value
    setmatrixAArray(newMatrixValues)
  }

  const handleInputChangeB = (row, col, value) => {
    const newMatrixValues = [...matrixBArray]
    newMatrixValues[row][col] = value
    setmatrixBArray(newMatrixValues)
  }


  // 取得した行数、列数で行列の入力エリアを作成
  // 行列Aコンポーネント
  const InputMxA = () => {
    return matrixAArray.map((row, i) => (
      <div key={i}style={{ marginBottom: '10px' }}>
        {row.map((value, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            value={matrixAArray[i][j] !== undefined ? matrixAArray[i][j] : ""}
            onChange={(e) => handleInputChangeA(i, j, Number(e.target.value))}
            style={{ margin: '5px' }}
            onClick={() => handleNumInput(i,j,0)}
          />
        ))}
      </div>
    ));
  };
  

    // 行列Bコンポーネント
    const InputMxB = () => {
      return matrixBArray.map((row, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          {row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={matrixBArray[i][j] !== undefined ? matrixBArray[i][j] : ""}
              onChange={(e) => handleInputChangeB(i, j, Number(e.target.value))}
              style={{ margin: '5px' }}
              onClick={() => handleNumInput(i,j,1)}
            />
          ))}
        </div>
      ));
    };

  // テンキーの出現操作とクリックしたinputタグの位置情報を格納
  const [isInput, setIsInput] = useState(false);
  const [active, setActive] = useState([])
  const handleNumInput = (row,col,judge) => {
      setIsInput(true);
      setActive([row,col,judge])
  };

  return (
    <div>
      <Option onInputChange={recieveChangeVal} />
      <p>設定画面から行数と列数を入力してください。</p>
      <p>要素の値は整数値で入力してください。</p>
      <div className="input-area">
        <div className="matrix">
          <h2>行列A</h2>
          <div className="area"><InputMxA /></div>
        </div>
        <div id="x">×</div>
        <div className="matrix">
          <h2>行列B</h2>
          <div className="area"><InputMxB /></div>
        </div>
        <Keyboard isInput={isInput} setIsInput={setIsInput} active={active} ChangeA={handleInputChangeA} ChangeB={handleInputChangeB} />
      </div>
      <Calculation mxAdata={matrixAArray} mxBdata={matrixBArray} />
    </div>
  )
}

export default Matrix