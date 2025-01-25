import {ButtonHTMLAttributes, ReactNode} from "react";
import {Loader} from "./Loader.tsx";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    loader?: boolean;
    variant?: 'neutral' | 'slate';
}

export const AppButton = (
    {
        variant = 'neutral',
        className,
        loader = false,
        children,
        ...otherProps
    }: AppButtonProps
) => {

    const colors = {
        neutral: "bg-neutral-900",
        slate: "bg-slate-900",
    }

    return (
        <button {...otherProps}
                className={[colors[variant], "p-2 rounded text-gray-300/90 text-sm font-normal", className].join(" ")}>
            {loader ? <Loader /> : children}
        </button>
    )
}