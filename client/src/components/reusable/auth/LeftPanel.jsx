'use client';
import Image from 'next/image';

const LeftPanel = ({ formData }) => {
  return (
    <>
      <div className='w-[35%] h-full   flex-col gap-4 justify-center items-center px-4 py-8 bg-[var(--background-secondary)] hidden sm:flex'>
        <h1 className='text-3xl font-bold'>{formData.title}</h1>
        <p className=' text-xl font-normal text-[var(--text-secondary)] mb-16'>{formData.desc}</p>
        <Image src='/assets/images/illustration-dashboard.webp' alt='#' layout='responsive' width={100} height={100} />
      </div>
    </>
  );
};

export default LeftPanel;
