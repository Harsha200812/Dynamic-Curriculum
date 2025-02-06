import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface UserSettings {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  appearance: {
    compact_mode: boolean;
    animations_enabled: boolean;
  };
  created_at: string;
  updated_at: string;
}

interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  loading: false,
  error: null,
  fetchSettings: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      set({ settings: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updateSettings: async (newSettings) => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_settings')
        .update(newSettings)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      set({ settings: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));