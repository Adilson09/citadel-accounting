"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ChartOfAccountType } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function ChartOfAccounts() {
  const [accounts, setAccounts] = useState<ChartOfAccountType[]>([]);
  const [editingAccount, setEditingAccount] =
    useState<ChartOfAccountType | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch("/api/accounts");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      setError("Failed to fetch accounts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    setEditingAccount(null);
    setIsPopoverOpen(true);
  };

  const handleEditAccount = (account: ChartOfAccountType) => {
    setEditingAccount(account);
    setIsPopoverOpen(true);
  };

  const handleSaveAccount = async (account: ChartOfAccountType) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      if (editingAccount) {
        await fetch(`/api/accounts/${account.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(account),
        });
      } else {
        await fetch("/api/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(account),
        });
      }
      await fetchAccounts();
      setIsPopoverOpen(false);
    } catch (error) {
      setError("Failed to save account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      await fetch(`/api/accounts/${id}`, { method: "DELETE" });
      await fetchAccounts();
    } catch (error) {
      setError("Failed to delete account");
    } finally {
      setIsLoading(false);
      setDeleteConfirmation(null);
    }
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.mainAccountCode.includes(searchTerm) ||
      account.subAccountCode.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full p-4 md:p-6 lg:p-8">
      <header className="bg-background border-b px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Chart of Accounts</h1>
        <Button onClick={handleCreateAccount}>Create Account</Button>
      </header>

      <div className="mt-4">
        <Input
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3"
        />
      </div>

      <div className="flex-1 mt-4 overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Main Account Code</TableHead>
                <TableHead>Sub Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Account Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.mainAccountCode}</TableCell>
                  <TableCell>{account.subAccountCode}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell>${account.balance.toFixed(2)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditAccount(account)}
                    >
                      {/* Edit icon */}
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirmation(account.id)}
                    >
                      {/* Delete icon */}
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {isPopoverOpen && (
        <Popover>
          <PopoverTrigger asChild>
            <Button>Create Account</Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-md p-4">
            {/* Form fields remain the same */}
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => handleSaveAccount(editingAccount!)}
                disabled={isLoading}
              >
                {editingAccount ? "Update Account" : "Create Account"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <AlertDialog open={deleteConfirmation !== null}>
        <AlertDialogContent>
          <p>Are you sure you want to delete this account?</p>
          <div className="flex justify-end mt-4">
            <AlertDialogAction
              onClick={() => handleDeleteAccount(deleteConfirmation!)}
              className="mr-2"
            >
              Confirm Delete
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => setDeleteConfirmation(null)}>
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
