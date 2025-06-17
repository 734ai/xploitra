import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vulnerability Scanner</h2>
          <p className="text-gray-600 mt-1">AI-powered security assessment platform</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="text-white text-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
