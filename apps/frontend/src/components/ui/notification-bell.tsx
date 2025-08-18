'use client';

import { useState } from 'react';
import { Bell, X, Check, CheckCheck, Trash2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

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

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();
  const router = useRouter();

  const handleNotificationClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(notificationId);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <CheckCheck size={16} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${getNotificationColor(
                    notification.type
                  )} ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id,
                      notification.isRead
                    )
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-medium ${
                              !notification.isRead
                                ? 'text-gray-900'
                                : 'text-gray-700'
                            }`}
                          >
                            {notification.title}
                          </h4>
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
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Mark as read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete notification"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/dashboard/notifications');
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
