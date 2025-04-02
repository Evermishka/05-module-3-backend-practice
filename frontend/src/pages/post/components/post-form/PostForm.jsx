/* eslint-disable react/prop-types */
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/SpecialPanel';
import { savePostAsync } from '../../../../actions';
import { sanitizeContent } from './utils';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);

	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onImageUrlChange = ({ target }) => {
		setImageUrlValue(target.value);
	};

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={onImageUrlChange}
				placeholder="Ссылка на изображение..."
			/>
			<Input
				value={titleValue}
				onChange={onTitleChange}
				placeholder="Заголовок..."
			/>
			<SpecialPanel
				postId={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<div onClick={onSave}>
						<Icon id="fa-floppy-o" size="21px" margin="0 7px 0 0" />
					</div>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		font-size: 18px;
		border: 1px solid #000;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
