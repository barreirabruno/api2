import { HttpClient, HttpClientRequest, HttpClientResponse } from '../../data/protocols/http/http-client'
import axios, { AxiosResponse } from 'axios'

jest.mock('axios')

const MockHttpRequest = (): HttpClientRequest => ({
  url: 'http://any_url',
  method: 'post',
  body: {
    propertyA: 'any_element',
    propertyB: 'any_element'
  },
  headers: {
    propertyA: 'any_element',
    propertyB: 'any_element'
  }
})

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue({
    data: {
      propertyA: 'any_data_from_axios_request',
      propertyB: 'any_data_from_axios_request'
    },
    status: 200
  })
  return mockedAxios
}

class AxiosHttpClient implements HttpClient {
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

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const requestData = MockHttpRequest()
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()

    await sut.request(requestData)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: requestData.url,
      data: requestData.body,
      headers: requestData.headers,
      method: requestData.method
    })
  })
  test('Should return correct response', async () => {
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()

    const httpResponse = await sut.request(MockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })
})
