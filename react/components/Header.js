import React from 'react'
import { bool, func } from 'prop-types'
import { Button } from 'vtex.styleguide'

const Header = ({ onClickBuy, buyLoading }) => (
  <header className="vtex-rebuy__header flex justify-between items-baseline">
    <span className="vtex-rebuy__header-title">YOUR LAST ORDER</span>
    <span className="vtex-rebuy__header-button">
      <Button variation="tertiary" size="small" onClick={onClickBuy} isLoading={buyLoading}>
        REORDER
      </Button>
    </span>
  </header>
)

Header.propTypes = { onClickBuy: func.isRequired, buyLoading: bool }

export default Header
