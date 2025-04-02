/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line no-unused-vars
const IconContainer = ({ className, id, ...props }) => (
	<div className={className}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
};