'use client'

import Link from "next/link"

export const Navbar = () =>{
    return(
        <header class="border-b-2 border-[#4b5563] text-white p-4 w-full">
        <div class="container mx-auto flex items-center justify-between">
            <h1 class="text-2xl font-bold cursor-pointer w-auto"><Link href="/">Astro Sign</Link></h1>
            <Link href="/about">About Me</Link>
        </div>
    </header>

    )
}