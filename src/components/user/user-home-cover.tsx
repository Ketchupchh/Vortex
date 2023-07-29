'use client'

import { useModal } from "../lib/hooks/useModal";
import { ImageModal } from "../modal/image-modal";
import { Modal } from "../modal/modal";
import { Button } from "../ui/button";
import { NextImage } from "../ui/next-image";
import type { ImageData } from "../lib/types/file";

type UserHomeCoverProps = {
    coverData?: ImageData | null;
};

export function UserHomeCover({ coverData } : UserHomeCoverProps) : JSX.Element
{
    const { open, openModal, closeModal } = useModal();

    return (
        <div className="w-full h-36 xs:h-48">
            <Modal open={open} closeModal={closeModal}>
                <ImageModal imageData={coverData as ImageData} previewCount={1} />
            </Modal>
            {coverData ? (
                <Button
                    className="relative h-full w-full transition hover:brightness-75"
                    onClick={openModal}
                    disabled={!coverData}
                >
                    <NextImage
                        key={coverData.src}
                        src={coverData.src}
                        alt={coverData.alt}
                        useSkeleton
                        layout="fill"
                    />
                </Button>
            ) : (
                <div className='h-full bg-neutral-800' />
            )}
        </div>
    );
}