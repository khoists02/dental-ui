import React, { FC } from "react"
import { Link } from "react-router-dom"

export const Sidebar: FC = () => {
  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="scrollbar-sidebar ps">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu metismenu">
            <li className="mm-active">
              <a href="#">
                <i className="metismenu-icon pe-7s-rocket"></i>
                Dashboard
                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
              </a>
              <ul className="mm-collapse mm-show">
                <li>
                  <Link to="/Calendar">
                    <i className="metismenu-icon"></i>
                    Calendar
                  </Link>
                </li>

                <li>
                  <Link to="/Settings">
                    <i className="metismenu-icon"></i>
                    Settings
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
