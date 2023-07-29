import { MainHeader } from '../header/main-header';
import type { ReactNode } from 'react';
import type { StatsType } from '../post/view/view-post-stats';

type PostStatsModalProps = {
  children: ReactNode;
  statsType: StatsType | null;
  handleClose: () => void;
};

export function PostStatsModal({
  children,
  statsType,
  handleClose
}: PostStatsModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        tip='Close'
        iconName='XMark'
        className='absolute flex w-full items-center gap-6 rounded-tl-2xl'
        title={`${statsType === 'likes' ? 'Liked' : 'Reposted'} by`}
        action={handleClose}
      />
      {children}
    </>
  );
}
