import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import Typing from './Typing';
import Controller from './Controller';
import Countword from './Countword';

import { useNavigate } from 'react-router-dom';
// <<<<<<< huy

// export default function Body() {
//     const [seconds, setTime] = useState(0);
//     const [words, setWords] = useState(60);
//     const [started, setStarted] = useState(false);
//     const [selectedMode, setSelectedMode] = useState('');
//     const [ended,setEnded] = useState(false);
//     const [mode,setMode] =useState('')
// =======


export default function Body() {
    const [seconds, setTime] = useState(15);
    const [words, setWords] = useState(25);

    const normal = 25;

    const [ended,setEnded] = useState(false);
    const [started, setStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState('15s');
    const [currWord, setCurrWord] = useState(1)
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if ((started && seconds >= 0 && selectedMode.endsWith("s"))) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(interval)
                        setStarted(false)        
                        setEnded(true)              
                        return 0
                    }         
                    return prevTime - 1;
                })

            }, 1000)
        }
        else if ((started && selectedMode.endsWith("w"))) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime +1)
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [started, seconds])


    const handleKeyDown = (event) => {
        let keyCode = event.keyCode
        if (!started && keyCode >= 65 && keyCode <= 90) {
            setStarted(true)
        }
        if (keyCode === 32){
            setCurrWord(prev => prev + 1)
        }
        // window.removeEventListener('keydown', handleKeyDown)
    }
    // window.addEventListener('keydown', handleKeyDown)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currWord]);

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    useEffect(() => {
        if (selectedMode === '15s') {
            setTime(15);
            setWords(normal);
        } else if (selectedMode === '30s') {
            setTime(30);
            setWords(normal);
        } else if (selectedMode === '45s') {
            setTime(45);
            setWords(normal);
        } else if (selectedMode === '25w') {
            setTime(1);
            setWords(25);
        }
        else if (selectedMode === '50w') {
            setTime(1);
            setWords(50);
        } else if (selectedMode === '100w') {
            setTime(1);
            setWords(100);
        }
    }, [selectedMode]);

    return (
        <>
            <Countdown time={seconds} />
            <button className="button--start" onClick={countdown}> Start </button>
            <Typing />
        </>
    )
}
 