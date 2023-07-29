import cn from 'clsx';
import { preventBubbling } from '../lib/utils';
import { ToolTip } from '../ui/tooltip';
import { NumberStats } from './number-stats';
import { CustomIcon, type IconName } from '../ui/custom-icon';

type PostOption = {
  tip: string;
  move?: number;
  stats?: number;
  iconName: IconName;
  disabled?: boolean;
  className: string;
  viewPost?: boolean;
  iconClassName: string;
  onClick?: (...args: unknown[]) => unknown;
};

export function PostOption({
  tip,
  move,
  stats,
  disabled,
  iconName,
  className,
  viewPost,
  iconClassName,
  onClick
}: PostOption): JSX.Element {
  return (
    <button
      className={cn(
        `group flex items-center gap-1.5 p-0 transition-none
         disabled:cursor-not-allowed inner:transition inner:duration-200`,
        disabled && 'cursor-not-allowed',
        className
      )}
      onClick={preventBubbling(onClick)}
    >
      <i
        className={cn(
          'relative rounded-full p-2 not-italic group-focus-visible:ring-2',
          iconClassName
        )}
      >
        <CustomIcon
          className={viewPost ? 'h-6 w-6' : 'h-5 w-5'}
          iconName={iconName}
        />
        <ToolTip tip={tip} />
      </i>
      {!viewPost && (
        <NumberStats move={move as number} stats={stats as number} />
      )}
    </button>
  );
}
