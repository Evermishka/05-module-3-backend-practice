/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& input {
		padding: 10px 32px 10px 10px;
	}

	& i {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};