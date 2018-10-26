import React, { Component, Fragment } from 'react'
import { func, string } from 'prop-types'

class WithFetch extends Component {
  static propTypes = {
    url: string.isRequired,
    children: func.isRequired,
  }
  state = { loading: true, data: null }

  async componentDidMount() {
    const { url } = this.props
    const response = await fetch(url).then(r => r.json())
    this.setState({ data: response, loading: false })
  }

  render() {
    const { children } = this.props

    return <Fragment>{children(this.state)}</Fragment>
  }
}

export default WithFetch
