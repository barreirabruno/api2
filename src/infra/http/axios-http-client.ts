import axios, { AxiosResponse } from 'axios'
import { HttpClient, HttpClientRequest, HttpClientResponse } from '../../data/protocols/http/http-client'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpClientRequest): Promise<HttpClientResponse> {
    let axiosReponse: AxiosResponse
    try {
      axiosReponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosReponse = error.response
    }
    return {
      statusCode: axiosReponse.status,
      body: axiosReponse.data
    }
  }
}
