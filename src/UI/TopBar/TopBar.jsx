import { Avatar } from "@mui/material";
import { Clock } from "../Clock/Clock";
import style from "./TopBar.module.scss"
import { TopBarItem } from "./TopBarItem";

const items = [
    { id: 1, to: '/', label: 'Home' },
    { id: 2, to: '/register', label: 'Register' },
  ];

const TopBar = () => {
    return (
        <div className={style.TopBar}>
            <ul>
                <li>
                    <Clock className={style.clock} />
                </li>
                
                {items.map(item => (<li key={item.id}>
                    <TopBarItem to={item.to} label={item.label} />
                </li>
                ))}

                <li className={style.li_right}>
                    <Avatar src="public/santaMAX.png" alt="1" sx={{width: 30, height:30}} />
                </li>

                <li className={style.li_right}>
                    <p className={style.acc}>Account</p>
                </li>
            </ul>
        </div>
    );
};

export { TopBar };