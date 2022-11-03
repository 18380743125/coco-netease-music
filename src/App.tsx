import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './pages/player/app-player-bar'

function App() {
  return (
    <div className="app">
      <AppHeader />
      <div className="main">
        <Suspense fallback="">{useRoutes(routes)}</Suspense>
      </div>
      <AppFooter />

      {/* 播放工具栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
