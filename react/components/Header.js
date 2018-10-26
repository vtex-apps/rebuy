import React from 'react'
import { func } from 'prop-types'
import { Button } from 'vtex.styleguide'

const Header = ({ onClickBuy }) => (
  <header className="flex justify-between items-baseline">
    <span>YOUR LAST ORDER</span>
    <Button variation="tertiary" size="small" onClick={onClickBuy}>
      REORDER
    </Button>
  </header>
)

Header.propTypes = { onClickBuy: func.isRequired }

export default Header
