export interface ImageDetails {
  id: number,
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
}

export interface Image {
  data: Blob
}

export type ImageExtension = ".jpg" | ".webp";

export type ImageQueryParameters = {
  height?: number;
  width?: number;
  grayscale?: boolean;
  blur?: boolean;
  random?: number;
  extension?: ImageExtension;
  page?: number;
  limit?: number;
}