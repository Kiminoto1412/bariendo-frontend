import { generateDeviceId } from "./GenerateDeviceId";

export function saveDataToLocalStorage(key: string, data: any) {
  const serializedData = JSON.stringify(data);
  localStorage.setItem(key, serializedData);
  // console.log(`Data saved with key: ${key}`);
}

// Retrieve data from local storage
export function getDataFromLocalStorage(key: string) {
  const serializedData = localStorage?.getItem(key);
  // console.log("serializedData",serializedData)
  if (serializedData === null) {
    // console.log(`No data found for key: ${key}`);
    return null;
  }
  return JSON?.parse(serializedData);
}

export function getDeviceIdFromLocalStorage() {
  const deviceId = getDataFromLocalStorage("deviceId");
  if (deviceId) {
    return deviceId;
  } else {
    const newDeviceId = generateDeviceId();
    saveDataToLocalStorage("deviceId", newDeviceId);
    return newDeviceId;
  }
}

export function removeDataInLocalStorage(key: string) {
  localStorage.removeItem(key);
}
