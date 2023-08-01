import { CustomIcon } from "@/components/ui/custom-icon";

export default function Loading() : JSX.Element
{
    return (
        <div
            className="fixed z-20 top-0 bottom-0 left-0 right-0 bg-black
                        flex items-center justify-center"
        >
            <CustomIcon className="w-40 h-40" iconName='VortexLogo' />
        </div>
    );
}