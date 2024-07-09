/**
 * This file was generated from PomodoroWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";

export type ColorThemeEnum = "light" | "dark";

export interface PomodoroWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    work: number;
    breakT: number;
    longBreak: number;
    pomodoros: number;
    autoStart: boolean;
    colorTheme: ColorThemeEnum;
    buttonColor: string;
    textColor: string;
}

export interface PomodoroWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    work: number | null;
    breakT: number | null;
    longBreak: number | null;
    pomodoros: number | null;
    autoStart: boolean;
    colorTheme: ColorThemeEnum;
    buttonColor: string;
    textColor: string;
}
