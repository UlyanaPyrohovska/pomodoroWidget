import { ReactElement, createElement } from "react";

// import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

// import { BadgeSample, BadgeSampleProps } from "./components/BadgeSample";
import { PomodoroProps, PomodoroTimer } from "./components/Pomodoro";

function parentInline(node?: HTMLElement | null): void {
    // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
    if (node && node.parentElement && node.parentElement.parentElement) {
        node.parentElement.parentElement.style.display = "inline-block";
    }
}

// function transformProps(props: PomodoroWidgetPreviewProps): BadgeSampleProps {
//     return {
//         type: props.pomodorowidgetType,
//         bootstrapStyle: props.bootstrapStyle,
//         className: props.className,
//         clickable: false,
//         style: parseInlineStyle(props.style),
//         defaultValue: props.pomodorowidgetValue ? props.pomodorowidgetValue : "",
//         value: props.valueAttribute
//     };
// }

export function preview(props: PomodoroProps): ReactElement {
    return (
        <div ref={parentInline}>
            <PomodoroTimer {...props}></PomodoroTimer>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/PomodoroWidget.css");
}
