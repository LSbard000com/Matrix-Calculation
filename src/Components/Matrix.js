import React, { useState, useEffect } from 'react'
import "./Matrix.css"
import Option from './Option'
import Calculation from './Calculation'


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
  
  // ＝＝＝＝行列A＝＝＝＝
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

  useEffect(() => {
    createMatrixA(mxrowA, mxcolA)
  }, [mxrowA, mxcolA]);

  const handleInputChangeA = (row, col, value) => {
    const newMatrixValues =  [...matrixAArray]
    newMatrixValues[row][col] = value
    setmatrixAArray(newMatrixValues)
  }
  const checkA = () => {
    console.log(matrixAArray)
  }

  // ＝＝＝＝行列B＝＝＝＝
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

  useEffect(() => {
    createMatrixB(mxrowB, mxcolB)
  }, [mxrowB, mxcolB]);

  const handleInputChangeB = (row, col, value) => {
    const newMatrixValues = [...matrixBArray]
    newMatrixValues[row][col] = value
    setmatrixBArray(newMatrixValues)
  }
  const checkB = () => {
    console.log(matrixBArray)
  }


  // 取得した行数、列数で行列の入力エリアを作成
  // 行列Aコンポーネント
  const InputMxA = () => {
    return matrixAArray.map((row, i) => (
      <div key={i} style={{ marginBottom: '10px' }}>
        {row.map((value, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            value={matrixAArray[i][j] !== undefined ? matrixAArray[i][j] : ""}
            onChange={(e) => handleInputChangeA(i, j, Number(e.target.value))}
            style={{ margin: '5px' }}
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
            />
          ))}
        </div>
      ));
    };


  return (
    <div>
      <Option onInputChange={recieveChangeVal} />
      <p>設定画面から行数と列数を入力してください。</p>
      <p>行列の要素の値を整数値で入力してください。</p>
      <div className="input-area">
        <div className="matrix">
          <h2 onClick={checkA}>行列A</h2>
          <div className="area"><InputMxA /></div>
        </div>
        <div className="matrix">
          <h2 onClick={checkB}>行列B</h2>
          <div className="area"><InputMxB /></div>
        </div>
      </div>
      <Calculation mxAdata={matrixAArray} mxBdata={matrixBArray} />
    </div>
  )
}

export default Matrix