/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .registered-at-column {
		width: 172px;
	}

	& .login-column {
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;

TableRow.propTypes = {
	children: PropTypes.node
}