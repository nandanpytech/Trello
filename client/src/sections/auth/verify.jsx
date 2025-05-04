'use client';

import LeftPanel from '@/components/reusable/auth/LeftPanel';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { verifyOtp } from '@/service/request/authRequest';
import { useRouter } from 'next/navigation';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const email = useSearchParams().get('email') ?? 'No email provided';

  const handlSubmit = async () => {
    try {
      const response = await verifyOtp({ payload: { email, otp } });

      if (response.status === 200) {
        const { token, email } = response.data.data;
        localStorage.setItem('userInfo', JSON.stringify({ token, email }));
        router.push('/dashboard');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const formData = {
    title: 'Welcome To Trello',
    desc: 'Manage your work flow',
  };
  return (
    <>
      <div className='w-screen h-screen bg-[var(--background)] flex  justify-center items-center'>
        <LeftPanel formData={formData} />
        <div className='flex-grow h-full flex flex-col gap-4 items-center justify-center'>
          <Image src='/assets/svg/email.svg' width={100} height={100} alt='Verify Email' />
          <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-2xl font-bold text-[var(--text-primary)]'>Please check your email!</h1>
            <p className='text-md font-normal text-[var(--text-secondary)] text-center'>
              We've emailed a 6-digit confirmation code. <br /> Please enter the code in the box below to verify your email.
            </p>
          </div>
          <div className='w-[40%]'>
            <Input type='email' disabled value={email} placeholder='Email address' />
          </div>

          <div className='otp mt-4'>
            <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button onClick={handlSubmit} type='primary' size='xl' className='w-[40%] mt-4'>
            Verify
          </Button>
          <p className='text-md text-[var(--text-secondary)]'>
            Don't have a code?
            <Link href='#' className='text-[var(--text-green-primary)] no-underline font-bold cursor-pointer ml-1'>
              Resend
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
