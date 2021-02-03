import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const InputBase = styled.input`
  background-color: ${({ theme }) => theme.colors.contrastText};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 5px;
  width: 100%;
`

export default function Input(props)
{
    return(
        <div>
            <InputBase {...props}>
                {props.children}
            </InputBase>
        </div>
    )
}

Input.defaultProps = {
    value: ''
}

Input.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}