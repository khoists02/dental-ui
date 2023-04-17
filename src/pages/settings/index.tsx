import React, { FC } from "react"
import { Routes, Route } from "react-router-dom"

const SettingsPage = React.lazy(() => import("./Settings"))

export const SettingsRoutes = [
  {
    path: "/",
    element: <SettingsPage />,
    can: [],
    index: true,
  },
]

const SettingsRoute: FC = () => {
  return (
    <>
      <Routes>
        {SettingsRoutes.map((route) => {
          return (
            <Route key={route.path} path={route.path} index={route.index} element={route.element} />
          )
        })}
      </Routes>
    </>
  )
}

export const SettingRouter = {
  element: <SettingsRoute />,
  path: "/Settings/*",
}
