/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from '@material-ui/core'
import styled from 'styled-components'

const MenuItemStyled = styled.button`
    background-color: ${(props) => (props.selected ? 'rgba(59, 74, 122, 0.05)' : 'transparent')};
    border-top: 0px;
    border-right: 0px;
    border-bottom: 0px;
    border-left: ${(props) => (props.selected ? '5px solid rgba(59, 74, 122, 1)' : '0px')};
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: ${(props) => (props.selected ? 'default' : 'pointer')};
    color: ${(props) => (props.selected ? 'black' : 'rgba(0, 0, 0, 0.4)')};
    transition: 0.3s;

    &:hover {
        background-color: rgba(59, 74, 122, 0.05);
        border-left: 5px solid rgba(59, 74, 122, 1);
        color: black;
    }
`

const MenuItem = ({ selected, goto, children }) => (
    <Link href={goto}><MenuItemStyled selected={selected}>{children}</MenuItemStyled></Link>
)

export default MenuItem
