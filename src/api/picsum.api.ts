import axios, { AxiosError } from "axios";
import type {Image, ImageDetails, ImageQueryParameters} from "./picsum.types.ts"
import { API_TIMEOUT_MS } from "@/constants/api.constants.ts";
import { DEFAULT_IMAGE_WIDTH } from "@/constants/api.constants.ts";


const picsumApi = axios.create({
  baseURL: import.meta.env.VITE_PICSUM_API_URL,
  timeout: API_TIMEOUT_MS
})

picsumApi.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const response = error.response
   
       if (!response) {
         console.error('Network / timeout / CORS error:', error.message)
         return Promise.reject(error)
       }
   
       const data = response.data
       const status = response.status
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error('unauthorised');
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
      default:
          console.error('API error:', status, data)
    }
    return Promise.reject(error);
  }
);

export async function getData<T>(url: string, params: ImageQueryParameters = {}): Promise<T> {
  return picsumApi.get<T>(url, { params }).then(response => response.data);
}

export async function getImageDetailsBySeed(identifier: string | number): Promise<ImageDetails> {
  return getData<ImageDetails>(`/seed/${identifier}/info`);
}

export async function getImageDetailsList(page: number, limit: number): Promise<ImageDetails[]> {
  return getData<ImageDetails[]>(`/v2/list`, {page, limit})
}

export async function getImageDetailsById(identifier: number): Promise<ImageDetails> {
  return getData<ImageDetails>(`/id/${identifier}/info`)
}

export async function getImageById(id: number, width: number = DEFAULT_IMAGE_WIDTH, height?: number, params: ImageQueryParameters = {}): Promise<Blob> {
  return getData<Blob>(`/id/${id}/${width}/${height !== undefined ? height : width}`, params)
}

export async function getImageBySeed(seed: string, params: ImageQueryParameters): Promise<Blob> {
  return getData<Blob>(`/seed/${seed}/`, params)
}

export async function getRandomImage(params: ImageQueryParameters): Promise<Blob> {
  return getData<Blob>(``, params)
}


