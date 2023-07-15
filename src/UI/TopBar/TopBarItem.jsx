import React from "react";
import style from "./TopBar.module.scss";

const TopBarItem = ({to, label}) => {
    return(
        <a className={style.TopBarItem} href={to}>{label}</a>
    );
};

export {TopBarItem};