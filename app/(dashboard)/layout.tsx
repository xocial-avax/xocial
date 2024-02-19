'use client'

import { ReactNode, useState } from 'react';
import { Newspaper, PersonStanding, Shapes } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import NewPostForm from '@/components/NewPostForm';
import { useRouter, usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <main className='px-6 py-14 sm:px-10 max-w-7xl mx-auto'>
      <div className='md:flex min-h-[300px] mt-3'>
        <div className="border border rounded-tl rounded-bl md:w-[230px] pt-3 px-2 pb-8 flex-col flex">
          <p className='font-medium ml-4 mb-2 mt-1'>Social Views</p>
          <Button
            onClick={() => router.push('/')}
            variant={pathname === '/' ? 'secondary' : 'ghost'}
            className="justify-start mb-1">
            <Newspaper size={16} />
            <p className="text-sm ml-2">Feed</p>
          </Button>
          <Button
            onClick={() => router.push('/creators')}
            variant={pathname === '/creators' ? 'secondary' : 'ghost'}
            className="justify-start mb-1">
            <PersonStanding size={16} />
            <p className="text-sm ml-2">Creators</p>
          </Button>
          <Button
            onClick={() => router.push('/my-profile')}
            variant={pathname === '/my-profile' ? 'secondary' : 'ghost'}
            className="justify-start mb-1">
            <Shapes size={16} />
            <p className="text-sm ml-2">My Profile</p>
          </Button>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' className="justify-start mb-1 bg-gray-100 text-black hover:bg-gray-200 hover:text-black">
                <Newspaper size={16} />
                <p className="text-sm ml-2">Post</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Post</AlertDialogTitle>
                <AlertDialogDescription>
                  <NewPostForm onClose={closeDialog}/>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
