import React from "react";
import style from "./SideBar.module.scss";

const SideBarItem = ({to, label}) => {
    return(
        <a className={style.SideBarItem} href={to}>{label}</a>
    );
};
export {SideBarItem};