import type { ImageQueryParameters } from '@/api/picsum.types'


export const API_TIMEOUT_MS = 5000;

export const DEFAULT_IMAGE_HEIGHT = 300;
export const DEFAULT_IMAGE_WIDTH = 350;
export const DEFAULT_IMAGE_GRAYSCALE = false;
export const DEFAULT_IMAGE_BLUR = false;
export const DEFAULT_IMAGE_EXTENSION = '.jpg';
export const DEFAULT_LIST_PAGE = 1;
export const DEFAULT_LIST_LIMIT = 20;

export const DEFAULT_IMAGE_QUERY_PARAMETERS: ImageQueryParameters = {
  height: DEFAULT_IMAGE_HEIGHT,
  width: DEFAULT_IMAGE_WIDTH,
  grayscale: DEFAULT_IMAGE_GRAYSCALE,
  blur: DEFAULT_IMAGE_BLUR,
  extension: DEFAULT_IMAGE_EXTENSION,
  page: DEFAULT_LIST_PAGE,
  limit: DEFAULT_LIST_LIMIT
}