import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function Hero() {
  return (
    <section className="bg-white px-4 pt-8 pb-12 lg:pt-20">
        <div className='flex items-baseline justify-center'>
            <h2 className='text-black border px-3 p-2 rounded-full text-center border-black'>See What's New | <span className='text-[#1150ab]'>AI Diagram</span></h2>
        </div>
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Visualize systems.
                <strong className="text-[#1150ab]"> Collaborate </strong>
                seamlessly
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                A modern platform that helps teams create, edit, and collaborate on technical diagrams and documentation with clarity and control.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                <a
                className="inline-block rounded border border-[#1150ab] bg-[#1150ab] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-900"
                href="#"
                >
                <LoginLink postLoginRedirectURL="/dashboard">Explore</LoginLink>
                </a>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
