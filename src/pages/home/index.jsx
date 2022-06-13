import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pageScroll } from '@/redux/actions/scroll'
import './index.styl'
class Home extends Component {
  render() {
    return <div className="home-page">Home</div>
  }
}

const mapStateToProps = (state) => {
  return { scrollTop: state.scrollMap.home || 0 }
}
const mapDispatchToProps = {
  pageScroll
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
