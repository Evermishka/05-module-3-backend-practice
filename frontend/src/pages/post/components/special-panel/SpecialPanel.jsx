/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { selectUserRole } from '../../../../selectors';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';
import { ROLE } from '../../../../constants';

const SpecialPanelContainer = ({ className, postId, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon id="fa-calendar-o" size="18px" margin="0 8px 0 0" />
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					<div onClick={() => onPostRemove(postId)}>
						{publishedAt && (
							<Icon id="fa-trash-o" size="21px" margin="0 0 0 10px" />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};
	font-size: 18px;

	& .published-at {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}
`;

SpecialPanel.propTypes = {
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};