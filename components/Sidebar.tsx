"use client"
import Image from "next/image"
import React from "react"
import logo from "@/public/logo.png"
import { Button } from "./ui/button"
import { signOutUser } from "@/lib/user.actions"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Props {
  fullName: string
  avatar: string
  email: string
}

export const Sidebar = ({ fullName, email }: Props) => {
  const router = useRouter()
  const handleSignOut = () => {
    signOutUser()
  }

  const handleClickLogo = () => {
    router.push("/")
  }

  return (
    <div className="h-screen border-r w-64">
      <div className=" flex flex-col justify-between h-full">
        <div className="p-2 border-b">
          <Image
            onClick={handleClickLogo}
            src={logo}
            width={40}
            height={40}
            alt="logo_banner"
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col h-full gap-2 p-4">
          <Link className="p-1 border rounded hover:bg-gray-100 cursor-pointer" href={"/clients"}>Clients</Link>
          <Link className="p-1 border rounded hover:bg-gray-100 cursor-pointer" href={"/calender"}>Calender</Link>
        </div>

        <div className="p-5 border-t">
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{fullName}</p>
            <p className="flex text-center text-xs mb-2 text-gray-400">
              {email}
            </p>
            <Button
              className="border hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
