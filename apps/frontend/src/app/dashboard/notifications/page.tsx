'use client';

import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_created':
    case 'order_accepted':
    case 'order_shipped':
    case 'order_completed':
      return '📦';
    case 'order_rejected':
      return '❌';
    case 'product_approved':
      return '✅';
    case 'product_rejected':
      return '❌';
    case 'deposit_successful':
    case 'withdrawal_successful':
    case 'transfer_received':
      return '💰';
    case 'deposit_failed':
    case 'withdrawal_failed':
      return '⚠️';
    case 'swap_offer_received':
    case 'swap_offer_accepted':
    case 'bid_accepted':
      return '🔄';
    case 'swap_offer_rejected':
    case 'bid_rejected':
      return '❌';
    case 'bid_completed':
      return '✅';
    default:
      return '🔔';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'order_accepted':
    case 'product_approved':
    case 'deposit_successful':
    case 'withdrawal_successful':
    case 'transfer_received':
    case 'swap_offer_accepted':
    case 'bid_accepted':
    case 'bid_completed':
      return 'border-l-green-500';
    case 'order_rejected':
    case 'product_rejected':
    case 'deposit_failed':
    case 'withdrawal_failed':
    case 'swap_offer_rejected':
    case 'bid_rejected':
      return 'border-l-red-500';
    case 'order_created':
    case 'order_shipped':
    case 'swap_offer_received':
      return 'border-l-blue-500';
    default:
      return 'border-l-gray-300';
  }
};

export default function NotificationsPage() {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === 'all' || (filter === 'unread' && !notification.isRead);
    const matchesSearch =
      notification.title.toLowerCase().includes(search.toLowerCase()) ||
      notification.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNotificationClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(notificationId);
    }
  };

  return (
    <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell
            className="text-[#037F44]"
            size={24}
          />
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border max-w-md"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-[#037F44] text-white'
                : 'bg-white text-[#037F44] border border-[#037F44] hover:bg-[#e6f9f0]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === 'unread'
                ? 'bg-[#037F44] text-white'
                : 'bg-white text-[#037F44] border border-[#037F44] hover:bg-[#e6f9f0]'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {search
              ? 'No notifications match your search'
              : 'No notifications yet'}
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow border-l-4 ${getNotificationColor(
                notification.type
              )} p-4 hover:shadow-md transition-shadow cursor-pointer ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() =>
                handleNotificationClick(notification.id, notification.isRead)
              }
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-medium ${
                          !notification.isRead
                            ? 'text-gray-900'
                            : 'text-gray-700'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          !notification.isRead
                            ? 'text-gray-800'
                            : 'text-gray-600'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
