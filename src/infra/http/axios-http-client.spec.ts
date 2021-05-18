import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, MockHttpRequest, MockHttpResponse } from './mocks/axios-http-client'

import axios from 'axios'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const axios = mockAxios()
  const sut = new AxiosHttpClient()
  return {
    sut: sut,
    mockedAxios: axios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const requestData = MockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(requestData)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: requestData.url,
      data: requestData.body,
      headers: requestData.headers,
      method: requestData.method
    })
  })
  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(MockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })
  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: MockHttpResponse()
    })

    const promise = sut.request(MockHttpRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
