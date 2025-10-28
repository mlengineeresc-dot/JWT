import React from 'react'
import { RouterProvider } from 'react-router'
import MainPageLayout from './layout/MainPageLayout'
import { router } from './router/router'


const App = () => {
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  )
}

export default App