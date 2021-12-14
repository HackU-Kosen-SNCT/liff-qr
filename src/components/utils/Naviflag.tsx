import { createContext, useState } from 'react'
import type { VFC } from 'react'
import type { navi } from '../../types/Naviflag'

export const Naviflag = createContext({} as {
  scanflag: boolean
  setScanFlag: React.Dispatch<React.SetStateAction<boolean>>
})

export const NaviProvider: VFC<navi> = ({ children }) => {
  const [scanflag, setScanFlag] = useState(true)
  return (
    <Naviflag.Provider value={{scanflag, setScanFlag}}>
      {children}
    </Naviflag.Provider>
  )
}
