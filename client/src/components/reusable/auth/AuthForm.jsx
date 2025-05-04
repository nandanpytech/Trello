'use client';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../ui/button';
import LeftPanel from './LeftPanel';
import TextField from '../TextField';

function AuthForm({ schema, formData }) {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className='w-screen h-screen bg-[var(--background)] flex  justify-center items-center'>
      <LeftPanel formData={formData} />
      <div className='flex-grow h-full flex flex-col gap-4 items-center justify-center'>
        <div className='flex flex-col gap-2 mb-4'>
          <h1 className='text-xl font-bold '>Get started absolutely free</h1>
          <p className='text-[var(--text-secondary)]'>
            {formData.accountQuestion}
            <Link
              href={`/auth/${formData.mode === 'login' ? 'register' : 'login'}`}
              className='text-[var(--text-green-primary)] no-underline font-bold cursor-pointer ml-2'
            >
              Get started
            </Link>
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(formData.callback)} action='' className='flex flex-col gap-8 min-w-[24rem]'>
            <div className={`flex gap-8 flex-col sm:flex-row ${formData.mode === 'login' ? 'hidden' : 'flex'}`}>
              <div>
                <TextField name='firstName' type='text' placeholder='First Name' />
              </div>
              <div>
                <TextField name='lastName' type='text' placeholder='Last Name' />
              </div>
            </div>
            <div>
              <TextField name='email' type='email' placeholder='Email address' />
            </div>
            <div>
              <TextField name='password' type='password' placeholder='Password' />
            </div>
            <Button size='xl'>{formData.buttonText}</Button>
          </form>
        </FormProvider>
        <p className={`text-[var(--text-secondary)] text-sm ${formData.mode === 'login' ? 'hidden' : 'block'}`}>
          By signing up, I agree to <span className='underline'>Terms of service</span> and Privacy policy.
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
