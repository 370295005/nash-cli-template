import { PAGESCROLL } from '../constant'
export default function (preState = {}, action) {
  const { type, data } = action
  switch (type) {
    case PAGESCROLL:
      return { ...preState, [data.path]: data.scrollTop }
    default:
      return preState
  }
}
