/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/SpecialPanel';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				postId={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<div onClick={() => navigate(`/post/${id}/edit`)}>
						<Icon id="fa-pencil-square-o" size="21px" margin="0 0 0 0" />
					</div>
				}
			/>

			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
