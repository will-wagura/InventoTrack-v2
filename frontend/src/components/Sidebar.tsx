import { useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../image/inventotrack-high-resolution-logo-transparent-top.png";
import  { useNavigate } from 'react-router-dom';

interface Props {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

function Sidebar({ setActiveComponent }: Props) {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const handleSetActive = (component: string) => {
    setActiveItem(component);
    setActiveComponent(component);
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="InventoTrack Logo" />
      </div>
      <nav>
        <ul>
          <li
            className={activeItem === "home" ? "menuItem active" : "menuItem"}
            onClick={() => {
              handleSetActive("home")
              navigate('home');
            }}
          >
            <FaHome /> <span>Home</span>
          </li>
          <li
            className={
              activeItem === "itemEntry" ? "menuItem active" : "menuItem"
            }
            onClick={() => {
              navigate('item-entry')
              handleSetActive("itemEntry");
            }}
          >
            <FaBoxOpen /> <span>Item Entry</span>
          </li>
          <li
            className={
              activeItem === "stockInfo" ? "menuItem active" : "menuItem"
            }
            onClick={() => {
              navigate('stock-information')
              handleSetActive("stockInfo");
            }}
          >
            <FaInfoCircle /> <span>Stock Information</span>
          </li>
          <li
            className={
              activeItem === "supplyRequests" ? "menuItem active" : "menuItem"
            }
            onClick={() => {
              navigate('supply-requests');
              handleSetActive("supplyRequests");
            }}
          >
            <FaClipboardList /> <span>Supply Requests</span>
          </li>
        </ul>
      </nav>
      <button className="logout-btn" onClick={() => handleSetActive("logout")}>
        <h3>
          <FaSignOutAlt /> Log Out
        </h3>
      </button>
    </aside>
  );
}

export default Sidebar;
