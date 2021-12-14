import { useEffect, useRef } from 'react'
import type { FC } from 'react'
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
      style={{ maxWidth: "100%", maxHeight: "100%", height: "100%", width: "100%"}}
      ref={ videoRef }
    />
  )
}

export default QRCodeReader
