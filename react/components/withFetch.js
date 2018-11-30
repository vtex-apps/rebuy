import React, { Component } from 'react'
import { func, string } from 'prop-types'

const withFetch = WrappedComponent =>
  class FetchContext extends Component {
    static displayName = `FetchContext(${WrappedComponent.displayName || WrappedComponent.name})`
    static propTypes = {
      url: string,
      children: func,
    }
    state = { loading: true, data: null, error: null }

    async componentDidMount() {
      await this.updateUrl(this.props.url)
    }

    async componentDidUpdate(prevProps) {
      const { url } = this.props
      if (prevProps.url !== url) {
        await this.updateUrl(url)
      }
    }

    async updateUrl(url) {
      if (!url) {
        return this.setState({
          data: [],
          error: null,
          loading: false,
        })
      }
      const response = await fetch(url)
      if (!response.ok) {
        return this.setState({ data: [], error: response.status, loading: false})
      }
      this.setState({ data: await response.json(), error: null, loading: false })
    }

    render() {
      return <WrappedComponent {...this.props} fetchContext={{ ...this.state }} />
    }
  }

export default withFetch
