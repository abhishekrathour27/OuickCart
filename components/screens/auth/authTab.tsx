"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginFrom from "./login/components/LoginFrom";
import SignUpForm from "./sign_up/components/SignUpForm";

type AuthTabsProps = {
  initialTab?: "login" | "signUp";
};


const AuthTab = ({ initialTab = "login" }: AuthTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="flex  flex-col min-h-[70vh] items-center justify-center via-white to-blue-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow- border border-gray-100">
        {/* Tabs */}
        <Tabs
          defaultValue={initialTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Buttons */}
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1 mb-6">
            <TabsTrigger
              value="login"
              className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-gray-900 transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signUp"
              className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-gray-900 transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="login" className="animate-fadeIn">
            <LoginFrom switchToSignUp={()=> setActiveTab('signUp')} />
          </TabsContent>
          <TabsContent value="signUp" className="animate-fadeIn">
            <SignUpForm switchToLogin={()=> setActiveTab('login')} />
          </TabsContent>
        </Tabs>
      </div>
        
    </div>
  );
};

export default AuthTab;
