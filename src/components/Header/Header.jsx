import React, { useMemo, useState } from "react";
import styles from "./header.module.scss";
import logo from "../../assets/Logo.png";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const headerMenu = [
  {
    id: 1,
    title: "Home",
  },
  {
    id: 1,
    title: "About",
  },
  {
    id: 1,
    title: "Pages",
  },
  {
    id: 1,
    title: "Shop",
  },
  {
    id: 1,
    title: "Projects",
  },
  {
    id: 1,
    title: "News",
  },
];

const Header = () => {
  const basket = useSelector((state) => state?.shop?.basket);
  const [search, setSearch] = useState("");
  const allItems = useMemo(
    () => basket.reduce((acc, { count }) => acc + count, 0),
    [basket]
  );
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.header_wrap}>
          <div className={styles.header_logo} onClick={() => navigate("/")}>
            <img src={logo} alt="" />
            <p className={styles.header_logo_text}> Organick</p>
          </div>
          <ul className={styles.header_menu}>
            {headerMenu.map((el) => (
              <li key={el.id}>{el.title}</li>
            ))}
          </ul>
          <div className={styles.user}>
            <div className={styles.header_search}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ... SVG path data ... */}
                </svg>
              </div>
            </div>
            <div
              className={styles.header_basket}
              onClick={() => navigate("/basket")}
            >
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ... SVG path data ... */}
                </svg>
              </div>
              Cart(<span>{allItems}</span>)
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
