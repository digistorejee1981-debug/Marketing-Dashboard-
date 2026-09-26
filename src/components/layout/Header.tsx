import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Calendar,
  Layers,
  Settings as SettingsIcon,
  LogOut,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { TimeRange, NotificationItem } from '../../types/marketing';
import { USER_PROFILE } from '../../data/mockData';

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenHelp,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '3m', label: '3 Months' },
    { id: '1y', label: '1 Year' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-purple-100/60 shadow-xs">
      {/* Left: Greeting & Subtitle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-1 text-slate-600 hover:text-purple-600 rounded-xl hover:bg-purple-50 lg:hidden focus:outline-hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Good Morning, Admin</span>
            <span className="inline-block animate-wave text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Track your marketing performance and grow your business.
          </p>
        </div>
      </div>

      {/* Right: Search, Date Filter, Notifications, Help, Profile */}
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 ml-auto">
        {/* Search Bar / Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-500 bg-slate-50 hover:bg-purple-50/60 border border-slate-200/80 rounded-xl transition-all w-36 sm:w-52 shadow-xs group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          <span className="truncate">Search campaigns, ads...</span>
          <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded-md shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Date Range Selector Segmented Tabs */}
        <div className="hidden xl:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-inner">
          {timeRanges.map((range) => {
            const isSelected = timeRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => onTimeRangeChange(range.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Small screen date range dropdown */}
        <div className="xl:hidden relative">
          <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
              aria-label="Select date range filter"
              className="bg-transparent text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              {timeRanges.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative p-2.5 text-slate-600 hover:text-purple-700 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200/80 transition-colors shadow-xs"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 rounded-full border-2 border-white shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 p-2 bg-white rounded-2xl border border-purple-100 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Notifications</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-full">
                    {unreadCount} New
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onClearAllNotifications}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 py-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => onMarkNotificationRead(notif.id)}
                    className={`flex items-start gap-3 p-3 transition-colors rounded-xl cursor-pointer ${
                      notif.read ? 'opacity-70 hover:bg-slate-50' : 'bg-purple-50/40 hover:bg-purple-50/80'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'warning' && (
                        <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                      )}
                      {notif.type === 'success' && (
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {notif.type === 'info' && (
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                          <Info className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 leading-snug">
                        {notif.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {notif.description}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {notif.time}
                      </span>
                    </div>

                    {!notif.read && (
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-pink-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 px-3 pb-1 border-t border-slate-100 flex items-center justify-between text-xs text-purple-600">
                <span className="text-slate-400 text-[11px]">Synced with Meta & Google API</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="font-medium hover:underline text-[11px]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Center Button */}
        <button
          onClick={onOpenHelp}
          aria-label="Open help and documentation"
          className="p-2.5 text-slate-600 hover:text-purple-700 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200/80 transition-colors shadow-xs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Profile Avatar & Popover */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Open user profile menu"
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 transition-all shadow-xs group"
          >
            <div className="relative">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-purple-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {USER_PROFILE.name}
              </span>
              <span className="text-[10px] font-medium text-purple-600">
                {USER_PROFILE.tier}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 p-2 bg-white rounded-2xl border border-purple-100 shadow-2xl z-50 animate-in fade-in duration-150">
              <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl mb-2">
                <p className="text-xs font-bold text-slate-900">{USER_PROFILE.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{USER_PROFILE.email}</p>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                    {USER_PROFILE.activeStore}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Account Preferences
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Store Switcher (UrbanVibe)
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                  Workspace Settings
                </button>
              </div>

              <div className="pt-2 mt-1 border-t border-slate-100">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
