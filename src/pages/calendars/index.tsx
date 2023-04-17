import React, { FC } from "react"
import { Routes, Route } from "react-router-dom"

const CalendarPage = React.lazy(() => import("./CalendarContainer"))

export const CalendarRoutes = [
  {
    path: "/",
    element: <CalendarPage />,
    can: [],
    index: true,
  },
]

const CalendarRoute: FC = () => {
  return (
    <>
      <Routes>
        {CalendarRoutes.map((route) => {
          return (
            <Route key={route.path} path={route.path} index={route.index} element={route.element} />
          )
        })}
      </Routes>
    </>
  )
}

export const CalendarRouter = {
  element: <CalendarRoute />,
  path: "/Calendar/*",
}
