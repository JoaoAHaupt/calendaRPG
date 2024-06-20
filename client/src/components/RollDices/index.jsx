import React, { useState } from 'react';
import './styles.css';
import D20 from '../../assets/images/d20.png';
import D100 from '../../assets/images/d100.png';
import D12 from '../../assets/images/d12.png';
import D6 from '../../assets/images/d6.png';
import D4 from '../../assets/images/d4.png';
import D8 from '../../assets/images/d8.png';
import D10 from '../../assets/images/d10.png';

const RollDices = () => {
    const [selectedDice, setSelectedDice] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rollValue, setRollValue] = useState(0); 
    const [dicesQuantity, setDicesQuantity] = useState(1); 
    const [bonus, setBonus] = useState(0);
    const [allRolled, setAllRolled] = useState([])
    const [rollDiceNow, setRollDiceNow] = useState("_");
    const [rolled, setRolled] = useState([]);

    const handleClick = (dice, value) => {
        setBonus(0);
        setSelectedDice(dice);
        setRollValue(value);
    };

    const rollDice = () => {
        if (rollValue > 0 && !isSpinning) {
            setIsSpinning(true);
            let arr = [];
            for (let i = 0; i < dicesQuantity; i++) {
                let result = Math.floor(Math.random() * rollValue) + 1;
                arr.push(result);
            }
            setAllRolled(arr)
            let total = arr.reduce((acc, val) => acc + val, 0);
            setRollDiceNow(total+bonus);
            setRolled([total, ...rolled.slice(0, 4)]); 
            setTimeout(() => setIsSpinning(false), 1000);
        }
    };

    return (
        <div id='dices_container'>
            <>
                <button onClick={() => handleClick(D4, 4)}>
                    <img src={D4} alt="D4" />
                </button>
                <button onClick={() => handleClick(D6, 6)}>
                    <img src={D6} alt="D6" />
                </button>
                <button onClick={() => handleClick(D8, 8)}>
                    <img src={D8} alt="D8" />
                </button>
                <button onClick={() => handleClick(D10, 10)}>
                    <img src={D10} alt="D10" />
                </button>
                <button onClick={() => handleClick(D12, 12)}>
                    <img src={D12} alt="D12" />
                </button>
                <button onClick={() => handleClick(D20, 20)}>
                    <img src={D20} alt="D20" />
                </button>
                <button onClick={() => handleClick(D100, 100)}>
                    <img src={D100} alt="D100" />
                </button>
            </>
            {selectedDice && (
                <div id='selected_dice'>
                    <div id='roll_input'>
                        <input  type="number" value={dicesQuantity} onChange={(ev) => setDicesQuantity(parseInt(ev.target.value) || 1)} />
                        <h1>D{rollValue}</h1>
                        <input  type="number" value={bonus} onChange={(ev) => setBonus(parseInt(ev.target.value) || 0)} />
                    </div>
                    
                    <button className={isSpinning ? 'spinning' : ''} onClick={rollDice}>
                        <img src={selectedDice} alt="Selected Dice" />
                    </button>
                    <h1>{rollDiceNow}</h1>
                    <h2>All Rolls: {allRolled.join(" + ")} Bonus: {bonus}</h2>
                    <div id='historic_container'>
                        {rolled.slice(1, 4).map((roll, index) => (
                            <div key={index} id={`historic_dices-${index + 1}`}>
                                <h2>{roll}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RollDices;
