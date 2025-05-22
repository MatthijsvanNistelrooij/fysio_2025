"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/user.actions"
import { getClientsByUserId } from "@/lib/client.actions"

export interface Pet {
  $id: string
  name: string
  age?: string
  type: string
  description: string
  appointments: []
  breed?: string
  notes?: string
  ownerId: string
}

export interface Client {
  $id: string
  userId: string
  name: string
  email: string
  phone: string
  address: string
  pets: Pet[]
}

interface User {
  $id: string
  // add other properties you expect on the user object
  email?: string
  name?: string
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([])

  console.log("clients", clients)

  const [user, setUser] = useState<User | null>(null)

  console.log("user ####", user)

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!user) return // wait until user is loaded

    const fetchClients = async () => {
      const data = await getClientsByUserId(user.$id)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedClients: Client[] = data.map((doc: any) => ({
        $id: doc.$id,
        userId: doc.userId,
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        address: doc.address,
        pets: doc.pets,
      }))

      setClients(formattedClients)
    }

    fetchClients()
  }, [user])

  const handleTableRowClick = (id: string) => {
    redirect(`/clients/${id}`)
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="main-container p-6 bg-white max-w-5xl w-full">
        <h1 className="text-xl font-bold mb-4">Clients</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black font-bold">Name</TableHead>
              <TableHead className="text-black font-bold">Email</TableHead>
              <TableHead className="text-black font-bold">Phone</TableHead>
              <TableHead className="text-black font-bold">Pets</TableHead>
              <TableHead className="text-black font-bold">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.$id}
                onClick={() => handleTableRowClick(client.$id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.pets.length}</TableCell>
                <TableCell className="cursor-pointer">
                  {client.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Clients
