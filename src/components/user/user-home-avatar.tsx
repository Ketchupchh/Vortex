'use client'

import cn from 'clsx'
import { useModal } from "../lib/hooks/useModal";
import { ImageModal } from "../modal/image-modal";
import { Modal } from "../modal/modal";
import { Button } from "../ui/button";
import { NextImage } from "../ui/next-image";
import type { ImageData } from "../lib/types/file";

type UserHomeAvatarProps = {
    avatarData?: ImageData | null;
    isBusinessAccount?: boolean;
}

export function UserHomeAvatar({ avatarData, isBusinessAccount } : UserHomeAvatarProps) : JSX.Element
{
    const { open, openModal, closeModal } = useModal();

    return (
        <div className="absolute">
            <Modal open={open} closeModal={closeModal}>
                <ImageModal imageData={avatarData as ImageData} previewCount={1} />
            </Modal>
            {avatarData ? (
                <Button
                    className={cn(
                        `w-24 xs:w-32 bg-black overflow-hidden ring-4 ring-black
                        hover:brightness-75 -mt-16 xs:-mt-20 relative`,
                        isBusinessAccount
                            ? ' h-24 xs:h-32 rounded-lg'
                            : 'rounded-full aspect-square'
                    )}
                    onClick={openModal}
                    disabled={!avatarData}
                >
                    <NextImage
                        className={cn(
                            "relative w-full h-full",
                            isBusinessAccount && 'rounded-lg'
                        )}
                        blurClassName={cn(
                            'animate-pulse bg-light-secondary dark:bg-dark-secondary',
                            isBusinessAccount ? 'rounded-lg' : 'rounded-full'
                        )}
                        key={avatarData.src}
                        src={avatarData.src}
                        alt={avatarData.alt}
                        useSkeleton
                        layout="fill"
                    />
                </Button>
            ) : (
                <div className="relative w-24 h-24 xs:w-32 xs:h-32 -mt-20 ring-4 ring-black rounded-full overflow-hidden">
                    <div className="absolute w-full h-full rounded-full bg-neutral-900" />
                </div>
            )}
        </div>
    );
}