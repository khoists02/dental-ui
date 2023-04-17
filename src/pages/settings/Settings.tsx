import React, { FC, useState } from "react"
import { AppSettings } from "../../types/setting"
import { IRootState } from "../../config/reducers"
import { useSelector } from "react-redux"

const Settings: FC = () => {
  const { settings } = useSelector((state: IRootState) => state.settingsReducer)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [setting, setSetting] = useState<AppSettings | null>(settings)
  return (
    <>
      <div className="flex">
        <span>Start Time: </span>
        <span>{setting?.workingTimeStart as string}</span>
      </div>

      <div className="flex">
        <span>End Time: </span>
        <span>{setting?.workingTimeEnd as string}</span>
      </div>
    </>
  )
}

export default Settings
