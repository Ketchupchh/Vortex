'use client'

import { useRef, useState } from "react";
import { MainHeader } from "../header/main-header";
import { NextImage } from "../ui/next-image";
import { getImagesData } from "../lib/validation";
import { InputField } from "../input/input-field";
import { Button } from "../ui/button";
import { addDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { affliatesCollection } from "../lib/firebase/collections";
import { uploadImages } from "../lib/firebase/utils";
import { sleep } from "../lib/utils";
import { toast } from "react-hot-toast";
import { useAuth } from "../lib/context/auth-context";
import type { WithFieldValue } from "firebase/firestore";
import type { FilesWithId, ImagesPreview } from "../lib/types/file";
import type { ChangeEvent } from 'react'
import type { Affliate } from "../lib/types/affliate";

type CreateAffliateModalProps = {
    closeModal: () => void;
}

export function CreateAffliateModal({
    closeModal
} : CreateAffliateModalProps) : JSX.Element
{
    const { user } = useAuth();

    const [imagePreviewData, setImagePreviewData] = useState<ImagesPreview>([]);
    const [selectedImage, setSelectedImage] = useState<FilesWithId>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setloading] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleClick = () => inputFileRef.current?.click();

    const editImage =
        ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
            const imagesData = getImagesData(files);

            if (!imagesData) {
                return;
            }

            const { imagesPreviewData, selectedImagesData } = imagesData;

            setImagePreviewData(imagesPreviewData);
            setSelectedImage(selectedImagesData);
        };

    const removeImage = (): void => {
        setImagePreviewData([]);
    
        URL.revokeObjectURL(imagePreviewData[0].src);
    };

    const handleChange =
    ({
      target: { value }
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setInputValue(value);

    const onClick = async () : Promise<void> => {

        if(!selectedImage) return;

        setloading(true);

        const affliateData: WithFieldValue<Omit<Affliate, 'id'>> = {
            ownerId: user?.id as string,
            name: inputValue,
            logo: await uploadImages(user?.id as string, selectedImage),
            affliates: [],
            updatedAt: serverTimestamp()
        };

        await sleep(500);

        const [affliateRef] = await Promise.all([
            addDoc(affliatesCollection, affliateData)
        ]);

        const { id: affliateId } = await getDoc(affliateRef);

        await updateDoc(affliateRef, {
            id: affliateId
        });

        setloading(false);

        toast.success(
            () => (
              <span className='flex gap-2'>
                Affliate "{inputValue}"" successfully created.
              </span>
            ),
            { duration: 6000 }
        );

        closeModal();
    }

    return (
        <>
            <MainHeader
                className="absolute flex items-center"
                title="Create new Affliate"
                tip="Close"
                iconName="XMark"
                useActionButton
                action={closeModal}
            >
                <div className="ml-auto">
                    <Button
                        className="bg-white py-2 px-4 text-sm text-black font-bold"
                        disabled={loading}
                        loading={loading}
                        onClick={onClick}
                    >
                        Save
                    </Button>
                </div>
            </MainHeader>
            <div className="flex flex-col w-full h-ful gap-4 p-5">

                <input
                    className='hidden'
                    type='file'
                    accept='image/*'
                    ref={inputFileRef}
                    onChange={editImage}
                />

                <button
                    className="menu-container blur-picture relative w-40 h-40 border-4 border-black rounded-lg"
                    onClick={handleClick}
                >
                    <NextImage
                        imgClassName="rounded-lg bg-neutral-500"
                        src={imagePreviewData[0]?.src}
                        alt={imagePreviewData[0]?.alt}
                        layout="fill"
                        useSkeleton
                    />

                </button>

                <InputField
                    inputId="name"
                    inputValue={inputValue}
                    label="Name"
                    handleChange={handleChange}
                />
            </div>
        </>  
    );
}