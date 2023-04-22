export type Location = LocationInterface;

export interface LocationInterface {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
