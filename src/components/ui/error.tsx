import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";


type ErrorProps = {
  message?: string;
};

export function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div
      className='flex flex-col items-center justify-center 
                 gap-2 py-5 px-3 text-light-secondary dark:text-dark-secondary'
    >
      <i>
        <ExclamationTriangleIcon className="w-10 h-10" />
      </i>
      <p>{message ?? 'Something went wrong. Try Loading.'}</p>
    </div>
  );
}
