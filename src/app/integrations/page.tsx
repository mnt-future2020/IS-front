"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  SignInButton, 
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import IntegrationView from "@/components/IntegrationView";
import { SyncUser } from "@/components/SyncUser";
import { api } from "../../../convex/_generated/api";
import { Menu, X, Bot, MessageCircle, Puzzle, Cog } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function IntegrationsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const convexUser = useQuery(api.users.getMe);

  return (
    <div className="app-container">
      {/* Left Sidebar - Navigation */}
      <aside className={cn("left-sidebar", !isSidebarOpen && "hidden")} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div className="sidebar-brand">
            <div className="sidebar-logo">
                <Bot size={18} />
            </div>
            <span className="brand-name">iSuite Assistant</span>
        </div>

        <nav className="nav-section">
            <button 
                className="nav-item"
                onClick={() => router.push("/")}
            >
                <MessageCircle size={18} />
                <span>AI Chat</span>
            </button>
            <button 
                className="nav-item active"
                onClick={() => router.push("/integrations")}
            >
                <Puzzle size={18} />
                <span>Integrations</span>
            </button>
            <button 
                className="nav-item"
                onClick={() => router.push("/settings")}
            >
                <Cog size={18} />
                <span>Settings</span>
            </button>
        </nav>

        <div className="user-profile-section" style={{ marginTop: 'auto' }}>
            <Authenticated>
                <SyncUser />
                <div className="user-card">
                    <UserButton afterSignOutUrl="/" showName />
                </div>
            </Authenticated>
            <Unauthenticated>
                <div className="auth-buttons-container" style={{ padding: '0 12px' }}>
                    <SignInButton mode="modal">
                        <button className="nav-item w-full justify-center" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none' }}>
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </Unauthenticated>
            <AuthLoading>
                <div className="user-card animate-pulse">
                    <div className="user-avatar-sm bg-gray-200"></div>
                    <div className="user-info-sm h-4 w-24 bg-gray-200 rounded"></div>
                </div>
            </AuthLoading>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ background: 'var(--bg-main)' }}>
        {!isSidebarOpen && (
             <button 
               onClick={() => setIsSidebarOpen(true)}
               style={{ position: 'absolute', left: 16, top: 16, zIndex: 50, padding: 8, background: 'white', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
             >
               <Menu size={20} />
             </button>
        )}

        <Authenticated>
          <IntegrationView />
        </Authenticated>
        
        <Unauthenticated>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Please Sign In</h1>
              <SignInButton mode="modal">
                <button className="nav-item" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none' }}>
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </Unauthenticated>
      </main>
    </div>
  );
}
