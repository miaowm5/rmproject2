
import { reducer } from '../../../common'

const func = {
  init: (state, param)=>({
    rule: param.rule,
    richText: param.richText,
  }),
}

const { Component, useRedux } = reducer(func)
export { Component, useRedux }
