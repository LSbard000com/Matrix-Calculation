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
      const matrixA = [];
  
      for (let i = 0; i < mxrowA; i++) {
        const row = [];
        for (let j = 0; j < mxcolA; j++) {
          row.push(
            <input 
              key={`${i}-${j}`} 
              type="number"
              value={matrixAArray[i] && matrixAArray[i][j] !== undefined ? matrixAArray[i][j] : ""}
              onChange={(e) => {handleInputChangeA(i,j,Number(e.target.value))}}
              style={{ margin: '5px' }} 
               />
          );
        }
        matrixA.push(<div key={i} style={{ marginBottom: '10px' }}>{row}</div>);
      }
      return matrixA;
    };

    // 行列Bコンポーネント
    const InputMxB = () => {
      const matrixB = [];
  
      for (let i = 0; i < mxrowB; i++) {
        const row = [];
        for (let j = 0; j < mxcolB; j++) {
          row.push(
            <input 
              key={`${i}-${j}`} 
              type="number"
              value={matrixBArray[i] && matrixBArray[i][j] !== undefined ? matrixBArray[i][j] : ""}
              onChange={(e) => {handleInputChangeB(i,j,Number(e.target.value))}}
              style={{ margin: '5px' }} 
               />
          );
        }
        matrixB.push(<div key={i} style={{ marginBottom: '10px' }}>{row}</div>);
      }
      return matrixB;
    };


  return (
    <div>
      <Option onInputChange={recieveChangeVal} />
      <header>行列の要素の値を整数値で入力してください。</header>
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