import { Link } from '@material-ui/core'
import styled from 'styled-components'

const Container = styled.div`
    cursor: ${(props) => (props.selected ? 'default' : 'pointer')};
    padding: 10px;
    padding-bottom: ${(props) => (props.selected ? '7px' : '10px')};
    margin-left: 10px;
    border-bottom: ${(props) => (props.selected ? '3px solid rgba(33, 90, 54, 1)' : '0px')};
    box-sizing: border-box;
    text-decoration: none;
    color: black;

    &:hover {
        border-bottom: 3px solid rgba(33, 90, 54, 1);
        padding-bottom: 7px;
        text-decoration: none;
    }
`

const MenuButton = ({ selected, goto, children }) => <Link style={{ textDecoration: 'none' }} href={goto}><Container selected={selected}>{children}</Container></Link>

export default MenuButton
