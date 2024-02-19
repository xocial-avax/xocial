'use client'
import { useState, useEffect } from 'react'
import { Loader2 } from "lucide-react"
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const { data: session } = (useSession() || {}) as any;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/all/f');
        const data = await response.json();
        console.log("Creators: ", data)
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-4">
      <div className="flex flex-1 flex-wrap p-4">
        {
          loadingUsers && (
            <div className="
              flex flex-1 justify-center items-center
            ">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          )
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {users?.map(user => (
            <div className="space-y-3" key={user.address} onClick={() => router.push(`/${user.address}`)}>
              <div className="overflow-hidden rounded-md">
                <img 
                  alt="Thinking Components" 
                  loading="lazy" 
                  decoding="async" 
                  data-nimg="1" 
                  className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" 
                  src={`https://gateway.lighthouse.storage/ipfs/${user.profilePicture}`} 
                />
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{user.username}</h3>
                <p className="text-xs text-muted-foreground">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
