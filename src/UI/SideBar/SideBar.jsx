//import {useState} from "react";
import { SideBarItem } from "./SideBarItem";
import style from "./SideBar.module.scss";


const SideBar = ({ items }) => {
//    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className={style.SideBar}>
      {/*  <button className={style.btn} onClick={() => setIsOpen(!isOpen)}>SideBar</button>
        {isOpen &&*/}
          <nav className={style.nav}>
            <SideBarItem key={"1"} to={""} label={'hello'}/>
            {items.map(item => (
              <SideBarItem key={item.id} to={item.to} label={item.label} />
            ))}
          </nav>
       {/*  }   */}
      </div>
    );
  };
export {SideBar};