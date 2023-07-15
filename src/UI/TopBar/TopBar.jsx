import { Avatar } from "@mui/material";
import { Clock } from "../Clock/Clock";
import style from "./TopBar.module.scss";
import { TopBarItem } from "./TopBarItem";

const items = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/register", label: "Register" },
  { id: 3, to: "/gallery", label: "Gallery"}
];

const TopBar = () => {
  return (
    <div className={style.TopBar}>
      <div className={style.topWrapper}>
        <div className={style.navItems}>
          <div>
            <Clock className={style.clock} />
          </div>

          {items.map((item) => (
            <div key={item.id}>
              <TopBarItem to={item.to} label={item.label} />
            </div>
          ))}
        </div>

        <div className={style.accountItems}>
          <div className={style.userName}> 
            User
          </div>

          <div>
            <Avatar
              src="public/santaMAX.png"
              alt="1"
              sx={{ width: 30, height: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { TopBar };
