import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Flowpay",
  description: "Dashboard for Flowpay digital wallet application",
};

import {
  Wallet,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user.id),
    },
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function DashboardPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen w-full h-[100vh] pt-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            <span className=" text-[#6a51a6]">Dashboard </span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-slate-800">
            Manage your finances with ease
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Wallet className="mr-2 h-6 w-6  text-[#6a51a6]" />
              Your Balance
            </h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold  text-[#6a51a6]">
                ₹{(balance.amount / 100).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500">Available</span>
            </div>
            {balance.locked > 0 && (
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <AlertCircle className="mr-1 h-4 w-4 text-yellow-500" />₹
                {(balance.locked / 100).toFixed(2)} Locked
              </div>
            )}
          </div>
          <div className="bg-indigo-50 px-6 py-4">
            <div className="text-sm font-medium  text-[#6a51a6] flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Quick Tip: Regular transactions help build your financial profile.
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <OnRampTransactions transactions={transactions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5 text-green-500" />
                Quick Send
              </h3>
              <p className="text-gray-600 mb-4">
                Transfer money to your contacts instantly.
              </p>
              <div className="pt-1">
                <a
                  href="/p2ptransfer"
                  className="bg-green-500 text-white px-3 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send Money
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowDownLeft className="mr-2 h-5 w-5  text-[#6a51a6]" />
                Add Funds
              </h3>
              <p className="text-gray-600 mb-4">
                Top up your  wallet easily.
              </p>
              <div className="pt-1">
                <a
                  href="/transfer"
                  className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Money
                </a>
               </div>
             </div>
             </div>
          </div>
        </div>
      </div>
  );
}