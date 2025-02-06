import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Palette, Mail, Save, Camera } from 'lucide-react';

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  appearance: {
    compactMode: boolean;
    animationsEnabled: boolean;
  };
}

export function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      updates: false,
    },
    appearance: {
      compactMode: false,
      animationsEnabled: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleInputChange = (field: keyof UserSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

  const handleAppearanceChange = (field: keyof typeof settings.appearance) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: !prev.appearance[field],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavedMessage('Settings saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Settings</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-1 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                value={settings.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                value={settings.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Notifications */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
              </div>
            </div>
            <div className="space-y-4 ml-9">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof settings.notifications)}
                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {key === 'push' ? 'Push Notifications' : key === 'email' ? 'Email Notifications' : 'Product Updates'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Language</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language</p>
              </div>
            </div>
            <div className="ml-9">
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          {/* Appearance */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Palette className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize your interface</p>
              </div>
            </div>
            <div className="space-y-4 ml-9">
              {Object.entries(settings.appearance).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleAppearanceChange(key as keyof typeof settings.appearance)}
                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {key === 'compactMode' ? 'Compact Mode' : 'Enable Animations'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button and Message */}
      <div className="flex justify-between items-center">
        <div>
          {savedMessage && (
            <p className="text-sm text-green-600 dark:text-green-400">{savedMessage}</p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-6 py-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}