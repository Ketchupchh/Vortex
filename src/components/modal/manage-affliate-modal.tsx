'use client'

import cn from 'clsx'
import { useEffect, useRef, useState } from "react";
import { MainHeader } from "../header/main-header";
import { NextImage } from "../ui/next-image";
import { getImagesData } from "../lib/validation";
import { InputField } from "../input/input-field";
import { Button } from "../ui/button";
import { doc, query, where, serverTimestamp, setDoc, getDocs, updateDoc, writeBatch, arrayUnion, arrayRemove } from "firebase/firestore";
import { affliatesCollection, userAffliatesCollection, usersCollection } from "../lib/firebase/collections";
import { fetchUsers, uploadImages } from "../lib/firebase/utils";
import { sleep } from "../lib/utils";
import { toast } from "react-hot-toast";
import { useAuth } from "../lib/context/auth-context";
import type { WithFieldValue } from "firebase/firestore";
import type { FilesWithId, ImagesPreview } from "../lib/types/file";
import type { ChangeEvent } from 'react'
import type { Affliate } from "../lib/types/affliate";
import { userConverter, type User } from "../lib/types/user";
import { UserAvatar } from "../user/user-avatar";
import { UserUsername } from "../user/user-username";
import { UserName } from "../user/user-name";
import { db } from "../lib/firebase/app";

type ManageAffliateModalProps = Affliate & {
    closeModal: () => void;
}

export function ManageAffliateModal(affliate: ManageAffliateModalProps) : JSX.Element
{
    const {
       closeModal 
    }  = affliate

    const { user } = useAuth();

    const { name, logo, affliates} = affliate;

    const [imagePreviewData, setImagePreviewData] = useState<ImagesPreview>([]);
    const [selectedImage, setSelectedImage] = useState<FilesWithId>([]);
    const [inputValue, setInputValue] = useState(name);
    const [searchUserValue, setSearchUserValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [loading, setloading] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleClick = () => inputFileRef.current?.click();

    useEffect(() => {

        async function searchUsers()
        {
            if(searchUserValue === '')
            {
                setSearchedUsers([]);
                return;
            }
            setSearchedUsers(await fetchUsers(searchUserValue));
        }
        searchUsers();

    }, [searchUserValue]);

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

    const handleSearchUserChange =
    ({
      target: { value }
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setSearchUserValue(value);

    const onClick = async () : Promise<void> => {

        if(!selectedImage) return;

        setloading(true);

        const [newPhotoURL] = await Promise.all(
            [selectedImage].map((image) => uploadImages(user?.id as string, image))
        );

        const affliateData: WithFieldValue<Omit<Affliate, 'id' | 'updatedAt'>> = {
            ownerId: user?.id as string,
            name: inputValue,
            logo: newPhotoURL ?? logo,
            affliates: affliate.affliates,
        };

        await sleep(500);

        const affliateRef = doc(affliatesCollection, affliate.id);

        await updateDoc(affliateRef, {
            ...affliateData,
            updatedAt: serverTimestamp()
        });

        // gather the user ids from affliate.affliates
        // and store them in a variable to then use below
        // in the query. then we can loop through and
        // update the users affliates array by using
        // user.affliates.findIndex((affiliate) => affiliate.id === updatedAffiliateData.id);
        // code line from ChatGPT

        const ids: string[] = affliate.affliates.map((id)=> id);

        async function updateUsers()
        {
            if(!affliate.logo) return;
            const updatedData = {
                id: affliate.id,
                name: inputValue,
                logo: affliate.logo[0].src
            }
            if(newPhotoURL) updatedData.logo = newPhotoURL[0].src;

            const users: User[] = [];
            for(let i = 0; i < ids.length; ++i)
            {
                const userQuery = query(
                    usersCollection,
                    where('id', '==', ids[i])
                ).withConverter(userConverter);
                
                const snap = await getDocs(userQuery);

                snap.forEach((doc) => {
                    const userRef = doc.ref;
                    users.push(doc.data());

                    const arr = doc.data().affliates;

                    const index = doc.data().affliates.findIndex((aff) => aff.id === affliate.id);

                    if(index !== -1)
                    {
                        arr[index] = updatedData;
                    }

                    updateDoc(userRef, {
                        affliates: arr
                    });
                });
            }
        }
        updateUsers();

        setloading(false);

        toast.success(
            () => (
              <span className='flex gap-2'>
                Affliate "{inputValue}"" successfully updated.
              </span>
            ),
            { duration: 6000 }
        );

        closeModal();
    }

    const onUserClick = async (
        type: 'remove' | 'affliate',
        userId: string
    ) : Promise<void> => {
        const batch = writeBatch(db);

        const userAffliateRef = doc(userAffliatesCollection(userId), affliate.id);
        const affliateRef = doc(affliatesCollection, affliate.id);
        const userRef = doc(usersCollection, userId);

        if(type === 'affliate')
        {
            affliate.affliates.push(userId);
            const newAffliates = Array.from(new Set(affliate.affliates));

            const userAffData: WithFieldValue<Affliate> = {
                id: affliate.id,
                ownerId: affliate.ownerId,
                name: affliate.name,
                logo: affliate.logo,
                affliates: newAffliates,
                updatedAt: serverTimestamp()
            };

            if(userAffliateRef)
            {
                batch.update(affliateRef, {
                    affliates: newAffliates
                });
                setDoc(userAffliateRef, {
                    ...userAffData
                });
            }
            else
            {
                batch.update(affliateRef, {
                    affliates: newAffliates
                });
                batch.update(userAffliateRef, {
                    ...userAffData
                })
            }

            if(affliate.logo)
            {
                batch.update(userRef, {
                    affliates: arrayUnion({
                        id: affliate.id,
                        name: affliate.name,
                        logo: affliate.logo[0].src
                    })
                });
            }
            else {
                batch.update(userRef, {
                    affliates: arrayUnion({
                        id: affliate.id,
                        name: affliate.name,
                        logo: '/#'
                    })
                });
            }

        } else {
            const newAffliates = affliate.affliates.filter((aff) => aff !== userId);
            batch.update(affliateRef,{
                affliates: newAffliates
            });
            batch.delete(userAffliateRef);
            if(affliate.logo)
            {
                batch.update(userRef, {
                    affliates: arrayRemove({
                        id: affliate.id,
                        name: affliate.name,
                        logo: affliate.logo[0].src
                    })
                });
            }
        }

        await batch.commit();
    }

    return (
        <>
            <MainHeader
                className="absolute flex items-center z-20"
                title="Manage Affliation"
                tip="Close"
                iconName="XMark"
                useActionButton
                action={closeModal}
                disableSticky
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
                    {logo ? (
                        <NextImage
                            imgClassName="rounded-lg bg-neutral-500"
                            src={logo[0].src}
                            alt={logo[0].alt}
                            layout="fill"
                            useSkeleton
                        />
                    ) : (
                        <NextImage
                            imgClassName="rounded-lg bg-neutral-500"
                            src={imagePreviewData[0]?.src}
                            alt={imagePreviewData[0]?.alt}
                            layout="fill"
                            useSkeleton
                        />
                    )}

                </button>

                <InputField
                    inputId="name"
                    inputValue={inputValue}
                    label="Name"
                    handleChange={handleChange}
                />

                <InputField
                    inputValue={searchUserValue}
                    label="User"
                    handleChange={handleSearchUserChange}
                />
                {searchedUsers && (
                    <div className="flex flex-col overflow-y-auto">
                        {searchedUsers.map((u) => (
                            <Button
                                key={u.id}
                                className="hover-card rounded-none flex flex-row items-center
                                            gap-3 p-2 first:rounded-tl-2xl first:rounded-tr-2xl
                                            last:rounded-bl-2xl last:rounded-br-2xl only:rounded-full"
                            >
                                <UserAvatar
                                    src={u.photoURL}
                                    alt={u.username}
                                    isBusinessAccount={u.isBusinessAccount}
                                />

                                <div className="flex flex-col">
                                    <UserName name={u.name} verified={u.verified} affliates={u.affliates} />
                                    <UserUsername username={u.username} disableLink />
                                </div>

                                <Button
                                    className={cn(
                                        "p-2 ml-auto text-sm text-black font-bold",
                                        affliate.affliates.includes(u.id) ? 'bg-main-accent text-white' : 'bg-white text-black'
                                    )}
                                    onClick={() => onUserClick(
                                        affliate.affliates.includes(u.id) ? "remove" : "affliate",
                                        u.id
                                    )}
                                >
                                    <span>{affliate.affliates.includes(u.id) ? "Remove" : "Affliate"}</span>
                                </Button>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </>  
    );
}