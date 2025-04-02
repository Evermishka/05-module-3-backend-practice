/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/TableRow';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>

				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<div
						onClick={
							isSaveButtonDisabled
								? null
								: () => onRoleSave(id, selectedRoleId)
						}
					>
						<Icon
							id="fa-floppy-o"
							margin="0 0 0 10px"
							disabled={isSaveButtonDisabled}
						/>
					</div>
				</div>
			</TableRow>
			<div onClick={onUserRemove}>
				<Icon id="fa-trash-o" margin="0 0 0 10px" />
			</div>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		padding: 0 5px;
		font-size: 16px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
