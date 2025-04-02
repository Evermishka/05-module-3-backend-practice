/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DescriptionContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const Description = styled(DescriptionContainer)`
	font-style: italic;
`;

Description.propTypes = {
	children: PropTypes.node.isRequired,
};