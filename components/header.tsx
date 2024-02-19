import { ChevronRight, Droplets, LogOut } from "lucide-react";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/dropdown';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton, useConnectKit } from '@particle-network/connect-react-ui';
import { useAccount } from '@particle-network/connect-react-ui';
import { ethers } from 'ethers';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const connectKit = useConnectKit();
  const userInfo = connectKit.particle.auth.getUserInfo();
  const pathname = usePathname();
  const account = useAccount();

  useEffect(() => {
    console.log('Account:', account);
    const handleAuthFlow = async () => {
      
      if (account && !session) {
        const checksumAddress = ethers.getAddress(account);
        console.log('Account:', checksumAddress);
        const response = await fetch(`/api/user/${checksumAddress}`);

        if (response.ok) {
          signIn('credentials', { address: checksumAddress, redirect: false, callbackUrl: '/' })
        } else {  
          router.push('/signup');
        }
      } else if (!account && session) {
        signOut({ redirect: false })
      }
    };

    handleAuthFlow();
  }, [account, session, router]);

  return (
    <nav className='border-b flex flex-col sm:flex-row items-start sm:items-center sm:pr-10'>
      <div className='py-3 px-8 flex flex-1 items-center'>
        <Link href="/" className='mr-5 flex items-center'>
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>xocial</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
      </div>
      <div className='flex sm:items-center pl-8 pb-3 sm:p-0 gap-2'>
        <ConnectButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
