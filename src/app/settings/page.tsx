import { MainContainer } from "@/components/layout/main-container";
import { MainLayout } from "@/components/layout/main-layout";
import { Settings } from "@/components/settings.tsx/settings";

export default function SettingsPage() : JSX.Element
{
    return (
        <MainLayout>
            <MainContainer className="relative max-w-[60rem]">
                <div className="w-full p-5 mb-10">
                    <h1 className="text-xl font-bold">Settings</h1>
                </div>
                <Settings />
            </MainContainer>
        </MainLayout>
    );
}