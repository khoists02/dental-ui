import React, { FC } from "react"

export const Header: FC = () => {
  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo"></div>
      <div className="app-header__mobile-menu"></div>
      <div className="app-header__menu"></div>
      <div className="app-header__content">
        <div className="app-header-left">
          <div className="search-wrapper active">
            <div className="input-holder">
              <input type="text" className="search-input" placeholder="Type to search" />
              {/* <button className="search-icon">
                <span></span>
              </button> */}
            </div>
            <button className="close"></button>
          </div>
        </div>
        <div className="app-header-right">
          <div className="header-dots"></div>
          <div className="header-btn-lg pr-0"></div>
          <div className="header-btn-lg"></div>
        </div>
      </div>
    </div>
  )
}
