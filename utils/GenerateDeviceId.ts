import { uuid } from "uuidv4";

export function generateDeviceId(): string {
  const deviceId = uuid();
  return deviceId;
}
