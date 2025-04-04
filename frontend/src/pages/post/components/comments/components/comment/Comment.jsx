/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentRemove = (commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync( postId, commentId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" size="18px" margin="0 10px 0 0" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<div className="comment-remove" onClick={() => onNewCommentRemove(id)}>
					<Icon id="fa-trash-o" size="18px" margin="0 0 0 10px" />
				</div>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: flex-start;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author,
	.published-at {
		display: flex;
		align-items: center;
	}

	& .comment-remove {
		padding-top: 5px;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};