import React, { useState } from "react";
import './Keyboard.css'

const Nums = () => {
    const keyboard = [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["0", "C", "E"]
    ]
    
    return (
    keyboard.map((row, i) => (
        <table>
            <tr key={i}>
            {row.map((value, j) => (
                <td key={value}>{value}</td>
            ))}
            </tr>
        </table>
    ))
    )
}

function Keyboard() {
    return (
        <div className="keyboard">
            <textarea></textarea>
            <Nums />
        </div>
    )
}

export default Keyboard;
