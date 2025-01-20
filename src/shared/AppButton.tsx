import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export const AppButton = (
    props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
    return (
        <button {...props} className={["p-2 rounded bg-neutral-900 text-gray-300/90 text-sm font-normal", props.className].join(" ")}/>
    )
}