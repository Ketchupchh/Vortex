import { CustomIcon, IconName } from "../ui/custom-icon";
import { UserFollowing } from "./user-following";
import { UserName } from "./user-name";
import type { User } from "../lib/types/user";
import { formatDate } from "../lib/date";
import { ToolTip } from "../ui/tooltip";
import { UserFollowStats } from "./user-follow-stats";

type UserDetailsProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'website'
  | 'username'
  | 'location'
  | 'verified'
  | 'createdAt'
  | 'following'
  | 'followers'
  | 'isBusinessAccount'
  | 'affliates'
>;

type DetailIcon = [string | null, IconName];

export function UserDetails({
    id,
    bio,
    name,
    website,
    username,
    location,
    verified,
    createdAt,
    following,
    followers,
    isBusinessAccount,
    affliates
} : UserDetailsProps) : JSX.Element
{

    const detailIcons: Readonly<DetailIcon[]> = [
        [location, 'MapPin'],
        [website, 'Link'],
        [`Joined ${formatDate(createdAt, 'joined')}`, 'CalendarDays']
    ];

    return (
        <>
            <div>
                <UserName
                    className="-mb-1 text-xl"
                    name={name}
                    iconClassName="w-6 h-6"
                    verified={verified}
                    isBusinessAccount={isBusinessAccount}
                    affliates={affliates}
                />
                <div className="flex items-center gap-1 text-dark-secondary">
                    <p>@{username}</p>
                    <UserFollowing userTargetId={id}/>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {bio && <p className='whitespace-pre-line break-words'>{bio}</p>}
                {detailIcons.map(([detail, icon], index) =>
                    detail && (
                        <div
                            key={index}
                            className="flex items-center gap-1"
                        >
                            <i>
                                <CustomIcon className="w-5 h-5" iconName={icon} />
                            </i>
                            {index === 1 ? (
                                <a
                                    className="text-main-accent"
                                    href={`https://${detail}`}
                                    target="_blank"
                                    rel='noreferrer'
                                >
                                    {detail}
                                </a>
                            ) : index === 2 ? (
                                <button className='custom-underline group relative'>
                                    {detail}
                                    <ToolTip
                                        className='translate-y-1'
                                        tip={formatDate(createdAt, 'full')}
                                    />
                                </button>
                            ) : (
                                <p>{detail}</p>
                            )}
                        </div>
                    ))}
            </div>
            <UserFollowStats following={following} followers={followers} />
        </>
    );
}