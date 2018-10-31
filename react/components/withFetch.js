import React, { Component } from 'react'
import { func, string } from 'prop-types'

const withFetch = WrappedComponent =>
  class FetchContext extends Component {
    static displayName = `FetchContext(${WrappedComponent.displayName || WrappedComponent.name})`
    static propTypes = {
      url: string.isRequired,
      children: func.isRequired,
    }
    state = { loading: true, data: null }

    async componentDidMount() {
      const { url } = this.props
      const response = await fetch(url).then(response => response.json())
      this.setState({ data: response, loading: false })
    }

    render() {
      return <WrappedComponent {...this.props} fetchContext={{ ...this.state }} />
    }
  }

export default withFetch
