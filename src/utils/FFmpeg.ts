import FFmpeg from '@ffmpeg/ffmpeg'
import { ref } from 'vue'

const { createFFmpeg, fetchFile } = FFmpeg
export const logs = ref<string>('init')
const logger = ({ message }: { message: string }) => {
  const now = new Date()
  const time = now.toTimeString().split(' ')[0]
  const miliseconds = String(now.getMilliseconds()).padStart(3, '0')

  logs.value += `\n[${time}:${miliseconds}] ${message}`
}

const ffmpeg = createFFmpeg({ log: false, logger })

export const progress = ref<number>(0)

ffmpeg.setProgress(({ ratio }) => {
  /*
   * ratio is a float number between 0 to 1.
   */
  progress.value = ratio
})

const useFFmpeg = (): any => {
  const isReady = ref<boolean>(false)
  const isConverting = ref<boolean>(false)
  const gif = ref<null | string>(null)
  const isSupported = ref<boolean>(true)

  if(!ffmpeg.isLoaded()) {
    console.log('loading FFmpeg')
    ;(async () => {
      try {
        await ffmpeg.load()
        isReady.value = true
      } catch (e) {
        isSupported.value = false
        logs.value += `\n\nFFmpeg error: ${e}`
        console.log(`FFmpeg error: ${e}`)
      }
    })()
  }

  // FFmpeg.wasm docs: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
  const convert = async (video: File) => {
    isConverting.value = true
    const outputFilename = `${Date.now()}.gif`
    ffmpeg.FS('writeFile', video.name, await fetchFile(video))
    await ffmpeg.run('-i', video.name, outputFilename)

    const data = ffmpeg.FS('readFile', outputFilename)

    gif.value = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
    isConverting.value = false
  }

  const clearGIF = () => {
    gif.value = null
  }

  return {
    convert,
    clearGIF,
    gif,
    isConverting,
    isReady,
    isSupported,
  }
}

export default useFFmpeg
