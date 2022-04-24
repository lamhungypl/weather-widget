export interface AppEnvironment {
  app: {
    mode: string;
    apiKey: string;
  };

  endPoint: {
    apiBaseUrl: string;
  };
}

const envMode = import.meta.env.MODE;

const apiBaseUrl = import.meta.env.VITE_BASE_URL || '';
const apiKey = import.meta.env.VITE_API_KEY || '';

export const environment: AppEnvironment = {
  app: {
    mode: envMode,
    apiKey,
  },

  endPoint: {
    apiBaseUrl,
  },
};
