"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "../lib/zustand"; // Assuming Zustand is used for state management

export default function UserProfileModal() {
  const user = useAppStore((state) => state.user);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            {user ? (
              <>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </>
            ) : (
              <p>No user information available.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
