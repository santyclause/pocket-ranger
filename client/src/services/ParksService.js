import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Park } from "@/models/Park.js"
import { AppState } from "@/AppState.js"

class ParksService {
  async searchParks(parkQuery) {
    const response = await npsAPI.get(`parks/?query=${parkQuery}`)
    AppState.parkQuery = parkQuery
    const newParks = response.data.map(park => new Park(park))
    AppState.parks = newParks
  }
  async getParkByCode(parkCode) {
    const response = await npsAPI.get(`/parks/?parkcode=${parkCode}`)
    logger.log('Got park - park service', response.data.data)
    AppState.activePark = new Park(response.data.data[0])
  }

  async getAllParks() {
    const response = await npsAPI.get(`/parks/?limit=472&parkcode=${AppState.parkList}`)
    logger.log('Got all parks - parks service', response.data)
    const newParks = response.data.data.map(parkData => new Park(parkData))
    AppState.parks = newParks
  }
}

export const parksService = new ParksService()

// .filter(park => park.designation == '')