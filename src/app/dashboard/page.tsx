// 'use client';
// import { useSession } from 'next-auth/react';
// import React from 'react'

// const page = () => {
//     const { data: session } = useSession();
//   console.log(session);
//   return (
//     <div>
//       <p>This is dashboard page</p>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   )
// }

// export default page


'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserDashboard() {
  const { data: session } = useSession();
  console.log(session);

  const userImage = session?.user?.image || '/images/user.png'; // Provide a fallback image
  //const userImage = session?.user?.image || ''; // Provide a fallback image

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {session?.user?.name || 'Guest'}!</h2>
        <div className="mt-4 flex items-center justify-center">
          <Image
            src={userImage}
            alt="Profile"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
        </div>
        <p className="mt-2 text-gray-600">{session?.user?.email || 'No email available'}</p>
      </div>
    </div>
  );
}

