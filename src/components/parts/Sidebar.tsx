import React, { FC } from "react"
import { NavLink } from "react-router-dom"
import { BagDash, ArrowDownShort } from "react-bootstrap-icons"

export const Sidebar: FC = () => {
  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="scrollbar-sidebar ps">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu metismenu">
            <li className="mm-active">
              <a href="#">
                <BagDash className="menu-icon" />
                Dashboard
                <ArrowDownShort className="menu-icon menu-icon-right" />
              </a>
              <ul className="mm-collapse mm-show">
                <li>
                  <NavLink
                    to="/Calendar"
                    className={({ isActive }) => {
                      return isActive ? "mm-active" : ""
                    }}
                  >
                    <i className="metismenu-icon"></i>
                    Calendar
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Settings"
                    className={({ isActive }) => {
                      return isActive ? "mm-active" : ""
                    }}
                  >
                    <i className="metismenu-icon"></i>
                    Settings
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
