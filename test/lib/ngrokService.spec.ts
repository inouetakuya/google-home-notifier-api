import * as ngrok from 'ngrok'
import ngrokService from '~/lib/ngrokService'

const dummyPort = 3000
const dummyToken = 'xxxxxxxx'
const dummyRegion = 'jp'
const dummyNgrokUrl = 'https://xxxxxxxx.ngrok.io'

jest.mock('ngrok', () => {
  return {
    // connect: jest.fn().mockResolvedValue(dummyNgrokUrl) だと
    // ReferenceError: Cannot access 'dummyNgrokUrl' before initialization
    connect: jest.fn().mockResolvedValue('https://xxxxxxxx.ngrok.io')
  }
})

describe('ngrokService', () => {
  describe('connect()', () => {
    describe('when authtoken is set', () => {
      let ngrokUrl: string

      beforeEach(async () => {
        ngrokUrl = await ngrokService.connect({
          port: dummyPort,
          authtoken: dummyToken
        })
      })

      test('connects with authtoken', async () => {
        expect(ngrokUrl).toBe(dummyNgrokUrl)
        expect(ngrok.connect).toBeCalledWith({
          port: dummyPort,
          authtoken: dummyToken
        })
      })
    })

    describe('when region is set', () => {
      let ngrokUrl: string

      beforeEach(async () => {
        ngrokUrl = await ngrokService.connect({
          port: dummyPort,
          authtoken: dummyToken,
          region: dummyRegion
        })
      })

      test('connects with region', async () => {
        expect(ngrokUrl).toBe(dummyNgrokUrl)
        expect(ngrok.connect).toBeCalledWith({
          port: dummyPort,
          authtoken: dummyToken,
          region: dummyRegion
        })
      })
    })
  })
})
