import { Route, Routes } from "react-router-dom"
import { CalendarRouter } from "./pages/calendars"
import { SettingRouter } from "./pages/settings"

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={CalendarRouter.element} path={CalendarRouter.path}></Route>
      <Route element={SettingRouter.element} path={SettingRouter.path}></Route>
    </Routes>
  )
}

export { AppRoutes }
