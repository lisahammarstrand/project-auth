import styled from 'styled-components'

export const Button = styled.button`
display: block;
margin: 30px 0;
height: 54px;
width: 100%;
background: ${(props) => props.background || 'blue'};
border-top-color: transparent;
font-size: 18px;
font-weight: bold;
color: ${(props) => props.color || 'white'};
  &:hover {
    background: ${(props) => props.hover || 'lightblue'};
    cursor: pointer;
  }
`