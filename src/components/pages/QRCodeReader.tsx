import { FC, useEffect, useRef } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import { Result } from '@zxing/library'

const QRCodeReader: FC<{ onReadQRCode: (text: Result) => void }> = ({ onReadQRCode }) => {
  const controlRef = useRef<IScannerControls | null>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }
    const codeRender = new BrowserQRCodeReader()
    codeRender.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          return
        }
        if (result) {
          onReadQRCode(result)
        }
        controlRef.current = controls
      }
    )
    return () => {
      if (!controlRef.current) {
        return
      }
      controlRef.current.stop()
      controlRef.current = null
    }
  }, [onReadQRCode])

  return (
    <video
      style={{ maxWidth: "95vmin", maxHeight: "95vmin", height: "95vmin", width: "95vmin" }}
      ref={ videoRef }
    />
  )
}

export default QRCodeReader
