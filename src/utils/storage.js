import { INITIAL_ROOMS } from '../interfaces/roomModel'

const ROOMS_KEY = 'cluttersense-rooms'

export const readRooms = () => {
  try {
    const storedRooms = window.localStorage.getItem(ROOMS_KEY)
    const parsedRooms = storedRooms ? JSON.parse(storedRooms) : null
    if (!Array.isArray(parsedRooms) || parsedRooms.length === 0 || parsedRooms.some((room) => !room.cameraName || !room.actionList)) {
      window.localStorage.setItem(ROOMS_KEY, JSON.stringify(INITIAL_ROOMS))
      return INITIAL_ROOMS
    }
    return parsedRooms
  } catch {
    window.localStorage.setItem(ROOMS_KEY, JSON.stringify(INITIAL_ROOMS))
    return INITIAL_ROOMS
  }
}

export const writeRooms = (rooms) => {
  window.localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms))
}

export const clearRooms = () => {
  window.localStorage.removeItem(ROOMS_KEY)
}
