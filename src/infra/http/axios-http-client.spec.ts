import { HttpClientRequest } from '../../data/protocols/http/http-client'
import axios from 'axios'

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

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const requestData = MockHttpRequest()
    const sut = mockAxios()

    await sut.request(requestData)

    expect(sut.request).toHaveBeenCalledWith({
      url: requestData.url,
      body: requestData.body,
      headers: requestData.headers,
      method: requestData.method
    })
  })
})
