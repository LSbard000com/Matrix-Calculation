import React, { useState, useEffect } from 'react'
import './Calculation.css'

const Calculation = ({mxAdata, mxBdata}) => {
  // Matrixコンポーネントから行列A,行列Bの行数列数を取得
  const [rowA, setRowA] = useState(1)
  const [colA, setColA] = useState(1)
  const [colB, setColB] = useState(1)

  useEffect(() => {
    setRowA(mxAdata.length)
    setColA(mxAdata[0] !== undefined ? mxAdata[0].length : 1)
    setRowB(mxBdata.length)
    setColB(mxBdata[0] !== undefined ? mxBdata[0].length : 1)
  },[mxAdata, mxBdata])

  // 計算結果の行列を作成
  const [resultMatrix, setResultMatrix] = useState([])

  const createResultMatrix = (rows, cols) => {
    const arr = []
    for(let i = 0 ; i < rows ; i++){
      const row = []
      for(let j = 0 ; j < cols ; j++){
        row.push(0)
      }
      arr.push(row)
    }
    setResultMatrix(arr)
  }

  useEffect(() => {
    createResultMatrix(rowA, colB)
  },[rowA, colB])

  //行列の計算
  const Calc = () => {
    let newResultMatrix = Array.from({ length: rowA }, () => Array(colB).fill(0));
    for(let i = 0 ; i < rowA ; i++){
        for(let j = 0 ; j < colB ; j++){
          for(let k = 0 ; k < colA ; k++){
            newResultMatrix[i][j] += mxAdata[i][k] * mxBdata[k][j]
          }
        }
      }
    setResultMatrix(newResultMatrix)
  }

  // 計算結果を表示する
  const Result = ({calcresult}) => {
    const arr = []
    for(let i = 0 ; i < calcresult.length ; i++){
      const row = []
      for(let j = 0 ; j < calcresult[0].length ; j++ ){
        row.push(
          <td key={`${i}-${j}`} style={{ padding: '0 10px'}} >{calcresult[i][j]}</td>
        )
      }
      arr.push(<tr key={i}>{row}</tr>)
    }

    return <table><tbody>{arr}</tbody></table>
  }

  return (
    <div className="result">
        <div className="calcbtn" onClick={Calc}>計算結果を表示</div>
        <div className="result-area">
          <Result calcresult={resultMatrix}/>
        </div>
    </div>
  )
}

export default Calculation