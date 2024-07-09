import { ReactElement, createElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Duration } from 'luxon';
// import useSound from 'use-sound';
// import dingDong from '../../public/ding-dong.mp3';
import { Pause, Restart, Start, Tomato } from "./Icons";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { LightenDarkenColor } from 'lighten-darken-color';
import { Audio } from 'ts-audio';

export type Modes = "work" | "breakT" | "longBreak";

export interface PomodoroProps {
    work: number;
    breakT: number;
    longBreak: number;
    pomodoros: number;
    colorTheme: "dark" | "light";
    autoStart: boolean;
    textColor: string;
    buttonColor: string;
    // value?: string;
    // clickable?: boolean;
    // onClickAction?: () => void;
    // getRef?: (node: HTMLElement) => void;
}

export function PomodoroTimer(props: PomodoroProps): ReactElement {
    const audio = Audio({
        file: "https://raw.githubusercontent.com/UlyanaPyrohovska/pomodoro/master/src/ding-dong.mp3",
        volume: 1
    });
    const { work, breakT, longBreak, pomodoros, colorTheme, autoStart, textColor, buttonColor } = props;
    const darkened = LightenDarkenColor(buttonColor, -100)
    const mystyle = {
        backgroundColor: buttonColor,
        color: textColor,
    };

    const selectedStyle = {
        boxShadow: `0 8px 16px 0 ${darkened}, 0 6px 20px 0 ${darkened}`
    }
    const intervalRef = useRef();
    const [mode, setMode] = useState("work");
    const [initialDuration, setInitialDuration] = useState(Duration.fromObject({ minutes: work }));
    const [duration, setDuration] = useState(initialDuration);
    const [isActive, setIsActive] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    // const [play] = useSound(audio);

    useEffect(() => {
        if (isActive && duration.as('seconds') === 0) {
            setNextMode();
        }
    }, [duration, isActive]);

    // Timer logic
    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);
            //@ts-ignore
            intervalRef.current = setInterval(() => {
                setDuration((prevDuration) => {
                    if (prevDuration.as('seconds') > 0) {
                        return prevDuration.minus({ seconds: 1 });
                    } else {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                        setNextMode();
                        return prevDuration; // Return zero duration to avoid negative values
                    }
                });
            }, 1000);
        }
    };

    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setDuration(initialDuration);
        setMode('work'); // Reset to initial mode
        setPomodoroCount(0); // Reset pomodoro count
    };

    const calculatePrecentage = () => {
        return (100 - (duration.as('seconds') / initialDuration.as('seconds')) * 100)
    }

    const setNextMode = () => {
        if (!props.autoStart) {
            clearInterval(intervalRef.current);
        }
        switch (mode) {
            case "work":
                if (pomodoroCount + 1 === pomodoros) {
                    setInitialDuration(Duration.fromObject({ minutes: longBreak }));
                    setDuration(Duration.fromObject({ minutes: longBreak }));
                    setMode('longBreak');
                    if (autoStart) startTimer();
                } else {
                    setInitialDuration(Duration.fromObject({ minutes: breakT }));
                    setDuration(Duration.fromObject({ minutes: breakT }));
                    setMode('breakT');
                    if (autoStart) startTimer();
                }
                setPomodoroCount((prevCount) => prevCount + 1);
                break;
            case "breakT":
                setInitialDuration(Duration.fromObject({ minutes: work }));
                setDuration(Duration.fromObject({ minutes: work }));
                setMode('work');
                if (autoStart) startTimer();
                break;
            case "longBreak":
                setInitialDuration(Duration.fromObject({ minutes: work }));
                setDuration(Duration.fromObject({ minutes: work }));
                setMode('work');
                setPomodoroCount(0); // Reset the pomodoro count after a long break
                break;
            default:
                break;
        }
        audio.play();
    };

    const changeMode = (mode: Modes) => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setInitialDuration(Duration.fromObject({ minutes: props[mode] }));
        setDuration(Duration.fromObject({ minutes: props[mode] }));
        setMode(mode); // Reset to initial mode
        setPomodoroCount(0); // Reset pomodoro count
    };

    return (
        <div className={`timer-wrap ${colorTheme === "dark" ? "blackTheme" : ""}`}>
            <div className="timer-column">
                <div className="timer-buttons">
                    <button className='action-button' onClick={() => changeMode('work')}
                        style={{ ...mystyle, ...(mode === "work" ? selectedStyle : {}) }}>
                        Pomodoro
                    </button>
                    <button className='action-button' onClick={() => changeMode('breakT')}
                        style={{ ...mystyle, ...(mode === "breakT" ? selectedStyle : {}) }}>Short break</button>
                    <button className='action-button' onClick={() => changeMode('longBreak')}
                        style={{ ...mystyle, ...(mode === "longBreak" ? selectedStyle : {}) }}>Long break</button>
                </div>
                <div className="tomato"><Tomato color={colorTheme === "dark" ? "#fff" : "#000"}></Tomato><span>{pomodoroCount}</span></div>
                <div style={{ width: 200, height: 200, margin: "auto" }}>
                    <CircularProgressbarWithChildren value={calculatePrecentage()} styles={{
                        path: { stroke: buttonColor }
                    }}>
                        <div style={{ fontSize: 30, marginTop: -30 }}>
                            <strong>{duration.toFormat('mm:ss')}</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="timer-buttons">
                    <button className="action-button small-icon-button" onClick={resetTimer} style={mystyle}>
                        <Restart color={textColor} />
                    </button>
                    {!isActive ? (<button className="action-button small-icon-button" onClick={startTimer} style={mystyle}>
                        <Start color={textColor} />
                    </button>) : (<button className="action-button small-icon-button" onClick={pauseTimer} style={mystyle}>
                        <Pause color={textColor} />
                    </button>)}
                </div>
            </div>
        </div>
    )
}