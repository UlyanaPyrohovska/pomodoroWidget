import { ReactElement, createElement } from "react";

import { PomodoroWidgetContainerProps } from "../typings/PomodoroWidgetProps";
import { PomodoroTimer } from "./components/Pomodoro";
import "./ui/PomodoroWidget.css";

export function PomodoroWidget(props: PomodoroWidgetContainerProps): ReactElement {
    // const { pomodorowidgetType, pomodorowidgetValue, valueAttribute, onClickAction, style, bootstrapStyle } = props;
    const { work, breakT, longBreak, pomodoros, colorTheme, autoStart, textColor, buttonColor } = props;
    // const onClickHandler = useCallback(() => {
    //     if (onClickAction && onClickAction.canExecute) {
    //         onClickAction.execute();
    //     }
    // }, [onClickAction]);

    // return (
    //     <BadgeSample
    //         type={pomodorowidgetType}
    //         bootstrapStyle={bootstrapStyle}
    //         className={props.class}
    //         clickable={!!onClickAction}
    //         defaultValue={pomodorowidgetValue ? pomodorowidgetValue : ""}
    //         onClickAction={onClickHandler}
    //         style={style}
    //         value={valueAttribute ? valueAttribute.displayValue : ""}
    //     />
    // );

    return (
        <PomodoroTimer
            work={work}
            breakT={breakT}
            longBreak={longBreak}
            pomodoros={pomodoros}
            colorTheme={colorTheme || "light"}
            autoStart={autoStart || false}
            textColor={textColor || "#000"}
            buttonColor={buttonColor || "#c55e5e"}
        />
    );
}
