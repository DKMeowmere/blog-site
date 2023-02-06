export type AlertTypes = "ERROR" | "WARNING" | "SUCCESS" | "INFO"

export type Alert = {
  body: string
  type: AlertTypes
}

export type Alerts = Alert[]