import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Lightning, Calendar } from '@phosphor-icons/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

const SpendingAlertsSettings = ({ open, onOpenChange }) => {
  const { spendingAlert, setSpendingAlert, theme } = useApp();
  const [settings, setSettings] = useState(spendingAlert);

  useEffect(() => {
    setSettings(spendingAlert);
  }, [spendingAlert, open]);

  const handleSave = () => {
    setSpendingAlert(settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`glass-panel ${
          theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
        } sm:max-w-[500px]`}
        data-testid="spending-alerts-settings-modal"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-tight flex items-center gap-2">
            <Bell size={24} />
            Spending Alerts Settings
          </DialogTitle>
          <DialogDescription>
            Get notified when your spending exceeds your budget
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive spending limit notifications
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enabled: checked })
              }
              data-testid="alert-enable-switch"
            />
          </div>

          {settings.enabled && (
            <>
              {/* Threshold Amount */}
              <div className="space-y-3">
                <Label htmlFor="threshold" className="flex items-center gap-2">
                  <Lightning size={18} />
                  Spending Limit
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                    $
                  </span>
                  <Input
                    id="threshold"
                    type="number"
                    min="0"
                    step="100"
                    value={settings.threshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        threshold: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`pl-8 rounded-xl text-lg font-medium ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10'
                        : 'bg-slate-900/5 border-slate-900/10'
                    }`}
                    placeholder="1000"
                    data-testid="threshold-input"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll be alerted when spending exceeds this amount
                </p>
              </div>

              {/* Period */}
              <div className="space-y-3">
                <Label htmlFor="period" className="flex items-center gap-2">
                  <Calendar size={18} />
                  Time Period
                </Label>
                <Select
                  value={settings.period}
                  onValueChange={(value) =>
                    setSettings({ ...settings, period: value })
                  }
                >
                  <SelectTrigger
                    id="period"
                    className={`rounded-xl ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10'
                        : 'bg-slate-900/5 border-slate-900/10'
                    }`}
                    data-testid="period-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className={`glass-panel ${
                      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
                    }`}
                  >
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Track spending for{' '}
                  {settings.period === 'daily'
                    ? 'each day'
                    : settings.period === 'weekly'
                    ? 'each week'
                    : 'each month'}
                </p>
              </div>

              {/* Preview */}
              <div
                className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-600/10'
                }`}
              >
                <p className="text-sm">
                  <strong>Alert Preview:</strong> You'll receive a notification when
                  you spend more than{' '}
                  <span className="font-bold text-blue-400">
                    ${settings.threshold.toLocaleString()}
                  </span>{' '}
                  {settings.period === 'daily'
                    ? 'per day'
                    : settings.period === 'weekly'
                    ? 'per week'
                    : 'per month'}
                  .
                </p>
              </div>

              {/* Quick Presets */}
              <div className="space-y-3">
                <Label>Quick Presets</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setSettings({ ...settings, threshold: 500, period: 'daily' })
                    }
                    className={`rounded-xl ${
                      theme === 'dark'
                        ? 'border-white/10 hover:bg-white/5'
                        : 'border-slate-900/10 hover:bg-slate-900/5'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-bold">$500</p>
                      <p className="text-xs">Daily</p>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setSettings({ ...settings, threshold: 2000, period: 'weekly' })
                    }
                    className={`rounded-xl ${
                      theme === 'dark'
                        ? 'border-white/10 hover:bg-white/5'
                        : 'border-slate-900/10 hover:bg-slate-900/5'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-bold">$2K</p>
                      <p className="text-xs">Weekly</p>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setSettings({ ...settings, threshold: 5000, period: 'monthly' })
                    }
                    className={`rounded-xl ${
                      theme === 'dark'
                        ? 'border-white/10 hover:bg-white/5'
                        : 'border-slate-900/10 hover:bg-slate-900/5'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-bold">$5K</p>
                      <p className="text-xs">Monthly</p>
                    </div>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={`flex-1 rounded-full ${
              theme === 'dark'
                ? 'border-white/10 hover:bg-white/5'
                : 'border-slate-900/10 hover:bg-slate-900/5'
            }`}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className={`flex-1 rounded-full ${
              theme === 'dark'
                ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300'
                : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-700'
            }`}
            data-testid="save-alert-settings"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpendingAlertsSettings;
