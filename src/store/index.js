import React, { useState, useEffect } from 'react'
import fetch from '~/utils/fetch'

export const UserContext = React.createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState({})
  const resetUser = userNow => setUser(prevUsers => ({ ...prevUsers, ...userNow }))

  const getUserInfo = async () => {
    const res = await fetch({ url: '/user/getMeInfo', params: { withOrg: true } })
    if (res.success && res.data) {
      setUser(res.data)
    }
  }

  useEffect(() => {
    // getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <UserContext.Provider value={{ user, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
