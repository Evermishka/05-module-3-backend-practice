/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { addCommentAsync } from '../../../../actions';
import { selectUserRole } from '../../../../selectors';
import { ROLE, PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const isGuest = userRole === ROLE.GUEST;

	const onNewCommentAdd = (postId, content) => {
				dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className="new-comment">
				{!isGuest && (
					<>
						<textarea
							name="comment"
							value={newComment}
							placeholder="Комментарий..."
							onChange={({ target }) => setNewComment(target.value)}
						></textarea>
						<div
							className="add-new-comment"
							onClick={() => onNewCommentAdd(postId, newComment)}
						>
							<Icon id="fa-paper-plane-o" size="18px" margin="0 0 0 10px" />
						</div>
					</>
				)}
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	width: 580px;

	& .new-comment {
		display: flex;
		margin: 20px 0 0 0;
		width: 100%;
	}

	& textarea {
		padding: 5px 10px;
		width: 550px;
		height: 120px;
		resize: none;
		font-size: 18px;
	}

	& .add-new-comment {
		padding-top: 5px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};