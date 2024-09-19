import React, { useState, useEffect } from 'react'
import "./Option.css"

const Option = ({onInputChange}) => {
    // 行列の行数、列数の入力を監視
    const [rowA, setRowA] = useState(1)
    const [colA, setColA] = useState(1)
    const [rowB, setRowB] = useState(1)
    const [colB, setColB] = useState(1)

    const doChangeRowA = (e) => {
        setRowA(Number(e.target.value))
    }
    const doChangeColA = (e) => {
        setColA(Number(e.target.value))
    }
    const doChangeRowB = (e) => {
        setRowB(Number(e.target.value))
    }
    const doChangeColB = (e) => {
        setColB(Number(e.target.value))
    }


    // トグルボタンでopenクラスを管理
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    // 行列Aと行列Bの計算の可否をチェックし、アラートメッセージを表示、ボタンの選択可否を管理
    const [msg, setMsg] = useState("")
    const [isdisable, setIsdisable] = useState(false)

    useEffect(() => {
        if(colA === rowB){
            setMsg("")
            setIsdisable(false)
        } else {
            setMsg(
                `※行列の計算ができません。
                行列Aの列数と行列Bの行数を同じ値にしてください。`
            )
            setIsdisable(true)
        }
    }, [colA, rowB])

    // 作成ボタンを押すとMatrixコンポーネントに値を送る
    const clickBtn = (ra,ca,rb,cb) => {
        if(colA == rowB){
            ra = rowA
            ca = colA
            rb = rowB
            cb = colB
            onInputChange(ra,ca,rb,cb)
        }
    }

  return (
    <div className={`option ${isOpen ? 'open' : ''}`}>
        <div className="option-area">
            <header>
                <h2>設定</h2>
            </header>
            <main>
                <section>
                    <h3>行列A</h3>
                    <ul>
                        <li>
                            行数：<input type="number" min="1" max="5" onChange={doChangeRowA} />
                        </li>
                        <li>
                            列数：<input type="number" min="1" max="5" onChange={doChangeColA}/>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>行列B</h3>
                    <ul>
                        <li>
                            行数：<input type="number" min="1" max="5" onChange={doChangeRowB}/>
                        </li>
                        <li>
                            列数：<input type="number" min="1" max="5" onChange={doChangeColB}/>
                        </li>
                    </ul>
                </section>
            </main>
            <div style={{ whiteSpace: 'pre-line' }} className="caution">{msg}</div>
            <div className={`${isdisable ? 'disable' : ''}`} onClick={clickBtn}>
                <div className="btn">行列を生成する</div>
            </div>
        </div>
        <div className="toggle-btn" onClick={handleToggle}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
  )
}

export default Option