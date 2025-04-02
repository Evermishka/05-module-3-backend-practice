import { Logo, Description, ControlPanel } from './components';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
        <Description>
            Веб-технологии<br />
            Написание кода<br />
            Разбор ошибок
        </Description>
        <ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
	position: fixed;
	top: 0;
    z-index: 1;
	padding: 20px 40px;
    width: 1000px;
	height: 120px;
    background-color: #fff;
	box-shadow: 0px -2px 15px #000;
`;
