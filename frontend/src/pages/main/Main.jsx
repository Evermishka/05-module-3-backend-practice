/* eslint-disable react/prop-types */
import { useMemo, useEffect, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { debounce } from './utils';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				setPosts(posts);
				setLastPage(lastPage);
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length ? (
					<div className="posts-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, comments }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`

	display: flex;
	flex-direction: column;

	& .posts-and-search {
		display: flex;
		flex-direction: column;
		margin-bottom: 40px;
	}

	& .posts-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-posts-found {
		display: flex;
		justify-content: center;
		margin: 20px 0;
		font-size: 18px;
	}
`;
