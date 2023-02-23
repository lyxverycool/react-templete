import loadable from '@loadable/component'

const loadContainer = name => loadable(() => import(/* webpackChunkName: "[request]" */`../container/${name}/index`))


export default [
  {
    path: '/',
    exact: true,
    component: loadContainer('ApproveList')
  },
  {
    path: '/create',
    exact: true,
    component: loadContainer('Home')
  }
]
