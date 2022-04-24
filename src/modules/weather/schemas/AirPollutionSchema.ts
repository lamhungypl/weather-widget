export interface AirPollutionData {
  coord: number[];
  list: {
    dt: string;
    main: {
      aqi: number;
    };
    components: {
      co: string;
      no: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
      nh3: string;
    };
  }[];
}
