import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const Recommend = lazy(() => import('@/pages/discover/c-pages/recommed'))
const Ranking = lazy(() => import('@/pages/discover/c-pages/ranking'))
const Songs = lazy(() => import('@/pages/discover/c-pages/songs'))
const Djradio = lazy(() => import('@/pages/discover/c-pages/djradio'))
const Artist = lazy(() => import('@/pages/discover/c-pages/artist'))
const Album = lazy(() => import('@/pages/discover/c-pages/album'))

const Download = lazy(() => import('@/pages/download'))
const Focus = lazy(() => import('@/pages/focus'))
const Mime = lazy(() => import('@/pages/mime'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: 'recommend',
        element: <Recommend />
      },
      {
        path: 'ranking',
        element: <Ranking />
      },
      {
        path: 'songs',
        element: <Songs />
      },
      {
        path: 'djradio',
        element: <Djradio />
      },
      {
        path: 'artist',
        element: <Artist />
      },
      {
        path: 'album',
        element: <Album />
      }
    ]
  },
  {
    path: '/mime',
    element: <Mime />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
]

export default routes
