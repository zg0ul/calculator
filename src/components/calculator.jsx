import { useState } from 'react';
import './Calculator.css';

export default function Calculator() {
    // to show the current number in the calculator display
    const [display, setDisplay] = useState('0');
    // to show the current equation in the calculator display
    const [equation, setEquation] = useState('');
    // to check if the (=) button has been clicked
    const [hasCalculated, setHasCalculated] = useState(false);
    
    // Format number for display
    const formatDisplay = (num) => {
        // Convert to number and back to string to remove trailing zeros
        const cleanNum = Number(num).toString();
        
        // If number is too large or small, use exponential notation
        if (Math.abs(Number(cleanNum)) >= 1e16 || Math.abs(Number(cleanNum)) <= 1e-7) {
        return Number(cleanNum).toExponential(5);
        }
        
        // For regular numbers, limit decimal places
        if (cleanNum.includes('.')) {
        const [integer, decimal] = cleanNum.split('.');
        return `${integer}.${decimal.slice(0, 8)}`;
        }
        
        // Add thousand separators for large numbers (add , every 3 digits) 
        return Number(cleanNum).toLocaleString('en-US', {
        maximumFractionDigits: 8
        });
    };


    const handleNumber = (number) => {
        if (hasCalculated) {
            // Don't allow leading zeros except for decimal numbers
            if (number === '0' && display === '0') return;
            
            setDisplay(number);
            setEquation(number);
            setHasCalculated(false);
        } else {
            // Prevent adding more digits if display is too long
            if (display.replace(/[,.-]/g, '').length >= 16) return;
            
            // Handle leading zeros
            if (display === '0' && number === '0') return;
            const newDisplay = display === '0' && number !== '.' ? number : display + number;
            
            setDisplay(newDisplay);
            setEquation(equation + number);
        }
    };  

    const handleOperator = (operator) => {
        setHasCalculated(false);
        setDisplay('0');
        // Convert × to * for evaluation while keeping × for display
        const evalOperator = operator === '×' ? '*' : operator;
        setEquation(equation + ' ' + evalOperator + ' ');
    };  


    const handleEqual = () => {
        try {
            console.log(`Equation: ${equation}`);
            const result = eval(equation).toString();
            const formattedResult = formatDisplay(result);
            setDisplay(formattedResult);
            setEquation(equation);
            setHasCalculated(true);
        } catch (error) {
            console.log(error);
            setDisplay('Error');
            setEquation('');
        }
    };


    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setHasCalculated(false);
    };

    const handleBackspace = () => {
        if (display.length > 1) {
        setDisplay(display.slice(0, -1));
        setEquation(equation.slice(0, -1));
        } else {
        setDisplay('0');
        setEquation('');
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">
                    <div className="previous-operand">{equation}</div>
                    <div className="current-operand">{display}</div>
                </div>
                
                <div className="keypad">
                    <button onClick={handleClear} className="key function">C</button>
                    <button onClick={handleBackspace} className="key function">←</button>
                    <button onClick={() => handleOperator('%')} className="key function">%</button>
                    <button onClick={() => handleOperator('/')} className="key operator">÷</button>
                    
                    <button onClick={() => handleNumber('7')} className="key">7</button>
                    <button onClick={() => handleNumber('8')} className="key">8</button>
                    <button onClick={() => handleNumber('9')} className="key">9</button>
                    <button onClick={() => handleOperator('×')} className="key operator">×</button>
                    
                    <button onClick={() => handleNumber('4')} className="key">4</button>
                    <button onClick={() => handleNumber('5')} className="key">5</button>
                    <button onClick={() => handleNumber('6')} className="key">6</button>
                    <button onClick={() => handleOperator('-')} className="key operator">-</button>
                    
                    <button onClick={() => handleNumber('1')} className="key">1</button>
                    <button onClick={() => handleNumber('2')} className="key">2</button>
                    <button onClick={() => handleNumber('3')} className="key">3</button>
                    <button onClick={() => handleOperator('+')} className="key operator">+</button>
                    
                    <button onClick={() => handleNumber('0')} className="key zero">0</button>
                    <button onClick={() => handleNumber('.')} className="key">.</button>
                    <button onClick={handleEqual} className="key equals">=</button>
                </div>
            </div>
        </div>
    );
}