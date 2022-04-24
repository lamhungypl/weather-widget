import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ErrorDataModel {
  code: number;
  description: string;
  message: string;
  name: string;
}

export interface ErrorModel<T = ErrorDataModel> {
  data: T | undefined;
  message: string;
  status: number | undefined;
}

const axiosResponseToData = <T>(res: AxiosResponse<T>): T => {
  return res.data;
};
const axiosErrorToData = <T>({
  response,
  message,
}: AxiosError<T>): ErrorModel<T> => {
  return {
    data: response?.data,
    message,
    status: response?.status,
  };
};

const axiosErrorRedirects = ({ response }: AxiosError) => {
  if (response?.status === 302) {
    const location = (response.headers as Record<string, string>)['location'];
    window.location.replace(location);
  }
};

export const createAPIClient = (
  baseURL: string,
  withCredentials = false,
  config?: AxiosRequestConfig,
) => {
  const request = axios.create({
    baseURL,
    withCredentials,
    ...config,
  });

  return {
    async get<Response, Params = Record<string, any>, Error = void>(
      url: string,
      params?: Params,
    ) {
      try {
        const res = await request.get<Response>(url, {
          params,
        });
        return axiosResponseToData(res);
      } catch (error) {
        axiosErrorRedirects(error as AxiosError);

        return Promise.reject(axiosErrorToData<Error>(error as AxiosError));
      }
    },
  };
};
