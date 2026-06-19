import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUserId: number;
  onSelect: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
                onClick={event => {
                  event.preventDefault();
                  onSelect(user.id);
                  setIsOpen(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
