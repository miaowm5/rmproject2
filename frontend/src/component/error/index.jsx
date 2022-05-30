import React from 'react'

export default ({ error, title })=><div>
  <div>{title}</div>
  <pre>{JSON.stringify(error, null, 2)}</pre>
</div>
