import styled from 'styled-components'

export const Input = styled.input`
line-height: 25px;
margin: 8px 0px;
font-size: 18px;
border: none;
color: black;
width: 95%;
background: transparent;
border-bottom: 1px solid black;
&:focus, &:active {
  outline: none;
  border-color: #F2F2F2;
  border-bottom: 2px solid #3DD990;
}
`