import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;

  :disabled {
    background-color: ${({ theme }) => theme.colors.quaternary};
    color: ${({ theme }) => theme.colors.contrastText};
    cursor: not-allowed;
  }
`

export default function Button(props)
{
    return(
        <div>
            <ButtonBase {...props}>
                {props.children}
            </ButtonBase>
        </div>
    )
}

Button.defaultProps = {
    type: 'submit'
}

Button.propTypes = {
    type: PropTypes.string,    
}