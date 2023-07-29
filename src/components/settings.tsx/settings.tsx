'use client'

import cn from 'clsx'
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAuth } from '../lib/context/auth-context';
import { Modal } from '../modal/modal';
import { useModal } from '../lib/hooks/useModal';
import { CreateAffliateModal } from '../modal/create-affliate-modal';
import { useCollection } from '../lib/hooks/useCollection';
import { affliatesCollection } from '../lib/firebase/collections';
import { query, where } from 'firebase/firestore';
import { NextImage } from '../ui/next-image';
import { ManageAffliateModal } from '../modal/manage-affliate-modal';

type SettingsTab = {
    name: string;
    adminOnly?: boolean;
}

const tabs: SettingsTab[] = [
    {
        name: 'Your account'
    },
    {
        name: 'Additional resources'
    },
    {
        name: 'Business'
    },
    {
        name: 'Admin',
        adminOnly: true
    }
];

export function Settings() : JSX.Element
{
    const { user } = useAuth();

    const [selectedAffliation, setSelectedAffliation] = useState(0);

    const {
        open: openAdmin,
        openModal: openAdminModal,
        closeModal: closeAdminModal
    } = useModal();

    const {
        open: openBusiness,
        openModal: openBusinessModal,
        closeModal: closeBusinessModal
    } = useModal();

    const [activeTab, setActiveTab] = useState('');

    const { data, loading: affliateLoading } = useCollection(
        query(
            affliatesCollection,
            where('ownerId', '==', user?.id ?? 'null')
        )
    );

    function handleOwnedAffClick(aff: number)
    {
        setSelectedAffliation(aff);
        openBusinessModal();
    }

    return (
        <>
            <Modal
                className='flex justify-center items-center w-full h-full'
                modalClassName='w-[40rem] h-[40rem] bg-black rounded-xl overflow-hidden'
                open={openAdmin}
                closeModal={closeAdminModal}
            >
                <CreateAffliateModal closeModal={closeAdminModal} />
            </Modal>
            <Modal
                className='flex justify-center items-center w-full h-full'
                modalClassName='w-[40rem] h-[40rem] bg-black rounded-xl overflow-hidden'
                open={openBusiness}
                closeModal={closeBusinessModal}
            >
                {data && data[selectedAffliation] && (
                    <ManageAffliateModal {...data[selectedAffliation]} closeModal={closeBusinessModal} />
                )}
            </Modal>

            {user && (
                <section className="absolute flex flex-row w-full h-full overflow-hidden">
                    <div className="w-[70%] h-full mt-24">
                        {tabs.map((tab, index) => (
                            <>
                                {!tab.adminOnly && (
                                    <Button
                                        key={index}
                                        className={cn(
                                            `hover-animation hover:bg-[#16181C] flex flex-row items-center rounded-none text-left w-full h-10
                                            border-main-accent p-5`,
                                            activeTab === tab.name && 'border-r-2 bg-[#16181C]'
                                        )}
                                        onClick={() => setActiveTab(tab.name)}
                                    >
                                        {tab.name}
                                        <ChevronRightIcon className="w-5 h-5 ml-auto" />
                                    </Button>
                                )}
                            </>
                        ))}
                        {user?.isAdmin && (
                            <Button
                                key={tabs.length}
                                className={cn(
                                    `hover-animation hover:bg-[#16181C] flex flex-row items-center rounded-none text-left w-full h-10
                                    border-main-accent p-5`,
                                    activeTab === "Admin" && 'border-r-2 bg-[#16181C]'
                                )}
                                onClick={() => setActiveTab("Admin")}
                            >
                                {tabs[tabs.length - 1].name}
                                <ChevronRightIcon className="w-5 h-5 ml-auto" />
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col w-full h-full border-l border-r border-dark-border pt-10">
                        {activeTab === "Admin" ? (
                            <Button
                                className='hover-card flex items-center p-5 w-full h-10 rounded-none'
                                onClick={openAdminModal}
                            >
                                Create new affliate
                            </Button>
                        ) : activeTab === "Business" ? (
                            <>
                                <h2 className='text-xl font-bold px-5'>Owned Affliations</h2>
                                {data && data.map((affliate, index) => (
                                    <Button
                                        key={affliate.id}
                                        className='hover-card flex flex-row gap-3 items-center rounded-none w-full h-20 p-5'
                                        onClick={() => handleOwnedAffClick(index)}
                                    >
                                        <div className='relative w-16 h-16'>
                                            {affliate.logo && (
                                                <NextImage
                                                    imgClassName='rounded-lg'
                                                    src={affliate.logo[0].src}
                                                    alt={affliate.logo[0].alt}
                                                    layout='fill'
                                                    useSkeleton
                                                />
                                            )}
                                        </div>
                                        <span className='text-lg'>{affliate.name}</span>
                                    </Button>
                                ))}
                            </>
                        ) : (
                            <Button>

                            </Button>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}