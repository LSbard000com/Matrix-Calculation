import React, { useState } from "react";
import './Keyboard.css'


function Keyboard({isInput, setIsInput,active, ChangeA, ChangeB}) {
    let [value, setValue] = useState("");

    // テンキーの入力設定
    const Input1 = () => {
        setValue(value += "1")
    }
    const Input2 = () => {
        setValue(value += "2")
    }
    const Input3 = () => {
        setValue(value += "3")
    }
    const Input4 = () => {
        setValue(value += "4")
    }
    const Input5 = () => {
        setValue(value += "5")
    }
    const Input6 = () => {
        setValue(value += "6")
    }
    const Input7 = () => {
        setValue(value += "7")
    }
    const Input8 = () => {
        setValue(value += "8")
    }
    const Input9 = () => {
        setValue(value += "9")
    }
    const Input0 = () => {
        setValue(value += "0")
    }

    // クリアボタンで値をリセット
    const Clear = () => {
        setValue("")
    }

    // エンターキーでテンキー閉じ、入力値を反映
    const handleEnter = () => {
        if(active[2] == 0){
            ChangeA(active[0],active[1],value)
        } else {
            ChangeB(active[0],active[1],value)
        }
        setIsInput(false)
        setValue("")
    }

    // 正負の切り替えボタン
    const signChange = () => {
        let newvalue = value * -1
        setValue(newvalue)
    }

    return (
        <div className={isInput ? 'active' : ''}>
        <div className='keyboard'>
            <input type="text" value={value} />
            <table>
                <tr><td colSpan={3} onClick={signChange}>正負を切り替える</td></tr>
                <tr><td onClick={Input7}>7</td><td onClick={Input8}>8</td><td onClick={Input9}>9</td></tr>
                <tr><td onClick={Input4}>4</td><td onClick={Input5}>5</td><td onClick={Input6}>6</td></tr>
                <tr><td onClick={Input1}>1</td><td onClick={Input2}>2</td><td onClick={Input3}>3</td></tr>
                <tr><td onClick={Input0}>0</td><td id="clear" onClick={Clear}>C</td><td id="enter" onClick={handleEnter}>E</td></tr>
            </table>
        </div>
        </div>
        
    )
}

export default Keyboard;
