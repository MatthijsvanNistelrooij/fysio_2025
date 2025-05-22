"use client"
import Image from "next/image"
import React from "react"
import logo from "@/public/logo.png"
import { Button } from "./ui/button"
import { signOutUser } from "@/lib/user.actions"

interface Props {
  fullName: string
  avatar: string
  email: string
}

export const Sidebar = ({ fullName, email }: Props) => {
  const handleSignOut = () => {
    signOutUser()
  }

  return (
    <div className="h-screen border-r w-64 flex flex-col justify-between">
      <div className="p-2 border-b">
        <Image src={logo} width={40} height={40} alt="logo_banner" />
      </div>

      <div className="p-5">
        <p className="font-semibold  m-1 ml-4">{fullName}</p>
        <p className="flex text-center justify-center text-xs text-gray-400">
          {email}
        </p>
        <Button
          className="border hover:bg-gray-500 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
