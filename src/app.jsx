
import React from 'react'
import { router } from './common'
import ListPage from './list'
import SitePage from './site'
import RulePage from './rule'

const App = ()=>{
  const route = router.useRoute()
  if (route.page === 'index'){ return <ListPage page={1} /> }
  if (route.page === 'list'){ return <ListPage page={route.param[0]} /> }
  if (route.page === 'site'){ return <SitePage id={route.param[0]} /> }
  if (route.page === 'rule'){ return <RulePage id={route.param[0]} /> }
  return null
}

export default ()=><React.StrictMode>
  <router.Router><App /></router.Router>
</React.StrictMode>
