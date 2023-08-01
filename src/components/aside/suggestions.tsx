import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  doc,
  limit,
  query,
  where,
  orderBy,
  documentId
} from 'firebase/firestore';
import { useAuth } from '../lib/context/auth-context';
import { useCollection } from '../lib/hooks/useCollection';
import { useDocument } from '../lib/hooks/useDocument';
import { usersCollection } from '../lib/firebase/collections';
import { UserCard } from '../user/user-card';
import { Loading } from '../ui/loading';
import { Error } from '../ui/error';
import { MotionProps } from 'framer-motion'

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export function Suggestions(): JSX.Element {
  const { randomSeed } = useAuth();

  const { data: adminData, loading: adminLoading } = useDocument(
    doc(usersCollection, '2d40stkkbkgnWfA7339upj7h0Qj2'),
    { allowNull: true }
  );

  const { data: suggestionsData, loading: suggestionsLoading } = useCollection(
    query(
      usersCollection,
      where(documentId(), '>=', randomSeed),
      orderBy(documentId()),
      limit(2)
    ),
    { allowNull: true }
  );

  return (
    <section className='hover-animation rounded-2xl bg-neutral-900'>
      {adminLoading || suggestionsLoading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : suggestionsData ? (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {adminData && <UserCard {...adminData} />}
          {suggestionsData?.map((userData) => (
            <UserCard {...userData} key={userData.id} />
          ))}
          <Link
            className='custom-button accent-tab hover-card block w-full rounded-2xl
                        rounded-t-none text-center text-main-accent'
            href='/connect'
          >
            Show more
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
