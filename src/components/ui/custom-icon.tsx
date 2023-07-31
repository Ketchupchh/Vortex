import cn from 'clsx';
import {
    ArrowPathRoundedSquareIcon,
    BellIcon,
    CalendarDaysIcon,
    ChartPieIcon,
    ChatBubbleOvalLeftIcon,
    ChevronDownIcon,
    EnvelopeIcon,
    HashtagIcon,
    HomeIcon,
    LinkIcon,
    MapPinIcon,
    PhotoIcon,
    XMarkIcon
} from '@heroicons/react/24/solid';

export type IconName = keyof typeof Icons;

type IconProps = {
  className?: string;
  solid?: boolean;
};

type CustomIconProps = IconProps & {
  iconName: IconName;
};

const Icons = {
    VortexLogo,
    Home,
    SearchIcon,
    ExploreIcon,
    ReelsIcon,
    MessagesIcon,
    MessageIcon,
    HeartIcon,
    SolidHeartIcon,
    CreateIcon,
    SendToIcon,
    SaveIcon,
    ImageAndVideoIcon,
    LeftArrowIcon,
    EmojiIcon,
    LocationIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    EllipsisIcon,
    MagnifyingGlass,
    UserPlusIcon,
    GridIcon,
    UserTagIcon,
    Settings,
    PlusIcon,
    Options,
    Activity,
    CrescentMoon,
    ReportIcon,
    SolidSaveIcon,
    LoadingIcon,
    GalleryStack,
    Hashtag,
    Bell,
    TriangleIcon,
    Photo,
    MapPin,
    PinIcon,
    PinOffIcon,
    ArrowPathRoundedSquare,
    ChartPie,
    ChatBubbleOvalLeft,
    XMark,
    Link,
    CalendarDays,
    BanIcon
};

export function CustomIcon({
    iconName,
    className,
    solid
}: CustomIconProps): JSX.Element {
    const Icon = Icons[iconName];

    return <Icon className={className ?? "h-6 w-6 dark:text-white text-black"} solid={solid} />;
}

function VortexLogo({ className } : IconProps) : JSX.Element
{
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="136.000000pt" height="54.000000pt" viewBox="0 0 136.000000 54.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,54.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M433 418 c-49 -62 -124 -159 -167 -215 -42 -57 -79 -103 -83 -103 -12 0 9 86 43 173 19 51 31 94 26 99 -13 13 -25 -6 -67 -111 -44 -105 -52 -176 -22 -195 26 -17 40 -4 166 150 210 257 232 286 228 298 -10 31 -40 9 -124 -96z" />
                <path d="M739 365 l-21 -35 -78 0 c-71 0 -103 -10 -86 -27 3 -3 37 -5 76 -4 38 1 70 0 70 -2 0 -2 -11 -30 -24 -63 -30 -73 -62 -89 -51 -25 8 49 -8 55 -45 16 -30 -32 -34 -27 -15 19 14 32 14 37 1 42 -23 9 -34 -3 -47 -46 -11 -36 -16 -40 -44 -40 -18 0 -38 7 -45 15 -18 21 -45 3 -71 -46 -24 -47 -19 -84 12 -94 29 -9 65 18 79 60 18 56 40 46 33 -15 -8 -72 16 -67 59 12 39 70 55 82 60 41 2 -22 8 -28 26 -27 17 0 22 -5 22 -26 0 -54 48 -62 97 -17 22 20 24 20 42 2 25 -22 58 -15 117 26 67 46 72 35 19 -44 -19 -28 -35 -57 -35 -64 0 -25 20 -12 51 35 18 26 34 49 36 51 2 3 9 -1 15 -7 25 -25 98 -7 98 24 0 12 -5 14 -17 9 -83 -35 -85 -9 -8 84 36 43 65 84 65 90 0 28 -30 5 -80 -59 l-55 -70 -3 35 c-5 54 -42 41 -42 -14 0 -20 -114 -85 -135 -77 -21 8 -19 26 3 26 22 0 92 57 92 76 0 7 -11 16 -25 20 -33 8 -68 -15 -100 -66 -30 -48 -71 -78 -86 -63 -7 7 -2 37 18 94 l28 84 48 3 c55 4 64 22 11 22 -32 0 -36 3 -30 20 3 11 9 29 12 40 11 35 -25 23 -47 -15z m-309 -208 c0 -20 -30 -57 -46 -57 -19 0 -18 13 7 44 22 28 39 34 39 13z" />
            </g>
        </svg>
    )
}

function Home({ className, solid } : IconProps) : JSX.Element
{
    return (
        <>
            {solid ? (
                <HomeIcon className={className} />
            ) : (
                <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            )}
        </>
    );
}

function SearchIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Search" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
    );
}

function ExploreIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Explore" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>
    );
}

function ReelsIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Reels" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    );
}

function MessagesIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Messenger" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    );
}

function MessageIcon({ className, solid } : IconProps) : JSX.Element
{
    return (
        <>
            {solid ? (
                <EnvelopeIcon className={className} />
            ) : (
                <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            )}
        </>
    );
}

function HeartIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Notifications" className={className} color="rgb(245, 245, 245)" fill="rgb(255, 255, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" fill="currentColor"></path></svg>
    );
}

function SolidHeartIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Unlike" className={className} color="rgb(245, 245, 245)" fill="rgb(255, 255, 245)" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" fill='currentColor'></path></svg>
    );
}

function CreateIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="New post" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
    );
}

function SendToIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Share Post" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
    );
}

function SaveIcon({ className, solid } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Save" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill={solid ? "currentColor" : "none"} points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
    );
}

function SolidSaveIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Remove" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" fill='currentColor'></path></svg>
    );
}

function ImageAndVideoIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Icon to represent media such as images or videos" className="dark:text-white text-black" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
    );
}

function LeftArrowIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Back" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
    );
}

function EmojiIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Emoji" className={className} color="rgb(168, 168, 168)" fill="rgb(168, 168, 168)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
    );
}

function LocationIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Add location" className={className} color="rgb(168, 168, 168)" fill="rgb(168, 168, 168)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Add location</title><path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path></svg>
    );
}

function ArrowDownIcon({ className } : IconProps) : JSX.Element
{
    return (
        <ChevronDownIcon className={className} />
    );
}

function ArrowUpIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Up chevron icon" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Up chevron icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
    );
}

function EllipsisIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg className={className} aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
    );
}

function MagnifyingGlass({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Search" className={className} color="rgb(142, 142, 142)" fill="rgb(142, 142, 142)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
    );
}

function UserPlusIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Down chevron icon" className={className} color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Down chevron icon</title><path d="M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></path><path d="M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="5.001" x2="5.001" y1="7.998" y2="14.003"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="8.004" x2="2.003" y1="11" y2="11"></line></svg>
    );
}

function GridIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Posts" className={className} color="" fill="rgb(0, 149, 246)" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
    );
}

function UserTagIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Tagged" className={className} color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>
    );
}

function Settings({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Settings" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
    );
}

function PlusIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Plus icon" className={className} color="rgb(199, 199, 199)" fill="rgb(199, 199, 199)" height="44" role="img" viewBox="0 0 24 24" width="44"><title>Plus icon</title><path fill="currentColor" d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
    );
}

function Options({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Options" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
    );
}

function Activity({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Your activity" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Your activity</title><path d="M12 1.505a10.5 10.5 0 1 1-7.424 17.924" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><polyline fill="none" points="8.893 15.108 12 12 12.012 12.012 12.012 5.793" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline><circle cx="7.24" cy="2.651" r="1.125" fill='currentColor'></circle><circle cx="3.515" cy="5.83" r="1.125" fill='currentColor'></circle><circle cx="1.636" cy="10.353" r="1.125" fill='currentColor'></circle><circle cx="2.01" cy="15.235" r="1.125" fill='currentColor'></circle></svg>
    );
}

function CrescentMoon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Theme icon" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 16 16" width="24"><title>Theme icon</title><path d="M8.05 16C3.61 16 0 12.39 0 7.95 0 3.99 2.83.65 6.72 0c.49-.03.87.22.99.6.11.38-.05.78-.41 1-1.7.93-2.75 2.69-2.75 4.61 0 2.89 2.35 5.25 5.25 5.25a5.25 5.25 0 0 0 4.61-2.74c.19-.37.61-.54 1.01-.4.42.14.66.56.58 1.01A8.044 8.044 0 0 1 8.05 16zM5.8 1.32c-2.78.93-4.73 3.56-4.73 6.63 0 3.85 3.13 6.99 6.99 6.99 3.04 0 5.66-1.93 6.61-4.72a6.301 6.301 0 0 1-4.87 2.31c-3.48 0-6.31-2.83-6.31-6.31-.01-1.93.86-3.71 2.31-4.9zm9.54 7.89s0 .01 0 0c0 .01 0 0 0 0z" fill="currentColor"></path></svg>
    );
}

function ReportIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Report a problem" className={className} color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Report a problem</title><path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path></svg>
    );
}

function LoadingIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Loading..." className={className} role="img" viewBox="0 0 100 100" fill='currentColor'><rect className="x1i210e2" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect className="x1i210e2" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg>
    );
}

function GalleryStack({ className } : IconProps) : JSX.Element
{
    return (
        <svg aria-label="Open media gallery" className={className} color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z" fill-rule="evenodd"></path></svg>
    );
}

function Hashtag({ className } : IconProps) : JSX.Element
{
    return (
        <HashtagIcon className={className} />
    )
}

function Bell({ className, solid } : IconProps) : JSX.Element
{
    return (
        <>
            {solid ? (

                <BellIcon className={className} />
            ) : (
                <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            )}
        </>
    )
}

function TriangleIcon({ className } : IconProps) : JSX.Element {
    return (
      <svg className={className} viewBox='0 0 24 24' aria-hidden='true'>
        <g>
          <path d='M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z' />
        </g>
      </svg>
    );
}

function Photo({ className } : IconProps) : JSX.Element
{
    return (
        <PhotoIcon className={className} />
    )
}

function MapPin({ className } : IconProps) : JSX.Element
{
    return (
        <MapPinIcon className={className} />
    )
}

function PinIcon({ className }: IconProps): JSX.Element {
    return (
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4' />
        <line x1='9' y1='15' x2='4.5' y2='19.5' />
        <line x1='14.5' y1='4' x2='20' y2='9.5' />
      </svg>
    );
}

function PinOffIcon({ className }: IconProps): JSX.Element {
    return (
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <line x1='3' y1='3' x2='21' y2='21' />
        <path d='M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251' />
        <line x1='9' y1='15' x2='4.5' y2='19.5' />
        <line x1='14.5' y1='4' x2='20' y2='9.5' />
      </svg>
    );
}

function ArrowPathRoundedSquare({ className } : IconProps) : JSX.Element
{
    return (
        <ArrowPathRoundedSquareIcon className={className} />
    )
}

function ChartPie({ className } : IconProps) : JSX.Element
{
    return (
        <ChartPieIcon className={className} />
    )
}

function ChatBubbleOvalLeft({ className } : IconProps) : JSX.Element
{
    return (
        <ChatBubbleOvalLeftIcon className={className} />
    )
}

function XMark({ className } : IconProps) : JSX.Element
{
    return (
        <XMarkIcon className={className} />
    );
}

function Link({ className } : IconProps) : JSX.Element
{
    return (
        <LinkIcon className={className} />
    )
}

function CalendarDays({ className } : IconProps) : JSX.Element
{
    return (
        <CalendarDaysIcon className={className} />
    )
}

function BanIcon({ className } : IconProps) : JSX.Element
{
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
    )
}

/*
function Icon({ className } : IconProps) : JSX.Element
{
    return (

    )
}
*/