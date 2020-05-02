// @ts-ignore TS7016: Could not find a declaration file for module 'mdns-js'
import mdns from 'mdns-js'
import MulticastDnsResponse from '~/types/MulticastDnsResponse'
import MulticastDnsData from '~/lib/MulticastDnsData'

export const getMulticastDnsDataAll = (): Promise<MulticastDnsData[]> => {
  const dataArray: MulticastDnsData[] = []
  const browser = mdns.createBrowser(mdns.tcp('googlecast'))

  return new Promise((resolve, reject) => {
    browser.on('ready', () => {
      browser.discover()
    })

    browser.on('update', (data: MulticastDnsResponse) => {
      dataArray.push(new MulticastDnsData(data))
    })

    browser.on('error', (error: Error) => {
      reject(error)
    })

    setTimeout(() => {
      browser.stop()
      resolve(dataArray)
    }, 1000)
  })
}

export const queryMulticastDnsDataByDeviceNames = async (
  deviceNames: string[]
): Promise<MulticastDnsData[]> => {
  const dataArray: MulticastDnsData[] = await getMulticastDnsDataAll()
  return dataArray.filter(data => deviceNames.indexOf(data.deviceName) >= 0)
}

export const getMulticastDnsDataByDeviceName = async (
  deviceName: string
): Promise<MulticastDnsData | undefined> => {
  const dataArray: MulticastDnsData[] = await getMulticastDnsDataAll()
  return dataArray.find(data => data.deviceName === deviceName)
}
