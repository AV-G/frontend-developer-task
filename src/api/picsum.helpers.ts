import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH } from "@/constants/api.constants"

export const imageUrlBuilder = function (id: number, height: number = DEFAULT_IMAGE_HEIGHT, width: number = DEFAULT_IMAGE_WIDTH) {
  return `${import.meta.env.VITE_PICSUM_API_URL}/id/${id}/${width}/${height !== undefined ? height : width}`
}