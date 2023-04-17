export interface AppSettings { 
  workingTimeStart?: Date | string;
  workingTimeEnd?: Date | string;
}

export const defaultSetting: AppSettings  = {
  workingTimeStart: "07:30",
  workingTimeEnd: "19:30",
}