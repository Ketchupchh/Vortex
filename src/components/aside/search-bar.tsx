import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'clsx';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CustomIcon } from '../ui/custom-icon';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { User } from '../lib/types/user';
import { fetchUsers } from '../lib/firebase/utils';
import Link from 'next/link';
import { UserAvatar } from '../user/user-avatar';
import { UserName } from '../user/user-name';
import { UserUsername } from '../user/user-username';
import { FollowButton } from '../ui/follow-button';
import { useAuth } from '../lib/context/auth-context';

export function SearchBar(): JSX.Element {

  const { user } = useAuth();

  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const { push } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(value);
    async function getUsers()
    {
      if(value === '')
      {
        setUsers([]);
        return;
      }
      const userArr = await fetchUsers(inputValue);

      setUsers(userArr);
    }
    getUsers();
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue) void push(`/search?q=${inputValue}`);
  };

  const clearInputValue = (focus?: boolean) => (): void => {
    if (focus) inputRef.current?.focus();
    else inputRef.current?.blur();

    setInputValue('');
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Escape') clearInputValue()();
  };

  return (
    <form
      className='hover-animation sticky top-0 z-10 -my-2 bg-main-background py-2'
      onSubmit={handleSubmit}
    >
      {users.length !== 0 && (
        <div className='absolute menu-container flex flex-col bg-black translate-y-12 py-5'>
          <Link
            className='hover-animation hover:bg-neutral-900/80 hover:cursor-pointer w-full
                      flex flex-row gap-3 border-b p-5'
            href={`/search?q=${inputValue}`}
          >
            <MagnifyingGlassIcon className='w-5 h-5' />
            {inputValue}
          </Link>
          {users.map((u) => (
            <Link
              key={u.id}
              className='hover-animation hover:bg-neutral-900/80 flex flex-row gap-3 px-5 py-2'
              href={`/user/${u.username}`}
            >
              <UserAvatar username={u.username} src={u.photoURL} alt={u.username} />
              <div className='flex flex-col'>
                <UserName name={u.name} verified={u.verified} affliates={u.affliates} />
                <UserUsername username={u.username} />
              </div>

              <div className='ml-auto' />
              <FollowButton
                userTargetId={u.id}
                userTargetUsername={u.username}
                isBlocked={
                  u.blockedUsers?.includes(user?.id as string) || u.blockedUsers?.includes(u.id)
                }
              />
            </Link>
          ))}
        </div>
      )}
      <label
        className='group flex items-center justify-between gap-4 rounded-full
                   bg-neutral-900 px-4 py-2 transition focus-within:bg-main-background
                   focus-within:ring-2 focus-within:ring-white/20'
      >
        <i>
          <MagnifyingGlassIcon
            className='h-5 w-5 text-light-secondary transition-colors 
                      group-focus-within:text-white/50 dark:text-dark-secondary'
          />
        </i>
        <input
          className='peer flex-1 bg-transparent outline-none 
                     placeholder:text-light-secondary dark:placeholder:text-dark-secondary'
          type='text'
          placeholder='Search Vortex'
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleEscape}
        />
        <Button
          className={cn(
            'accent-tab scale-50 bg-main-accent p-1 opacity-0 transition hover:brightness-90 disabled:opacity-0',
            inputValue &&
              'focus:scale-100 focus:opacity-100 peer-focus:scale-100 peer-focus:opacity-100'
          )}
          onClick={clearInputValue(true)}
          disabled={!inputValue}
        >
          <CustomIcon className='w-3 h-3 stroke-white' iconName='XMark' />
        </Button>
      </label>
    </form>
  );
}
